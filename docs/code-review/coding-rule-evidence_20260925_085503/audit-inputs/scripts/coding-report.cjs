/** Normalize linter results and render auditable reports without editing source. */
const path = require('node:path');
const { XMLParser, XMLValidator } = require('fast-xml-parser');

/**
 * Normalize a tool path to a repository-relative, slash-separated path.
 * @param {string} file - Path reported by a linter.
 * @returns {string} Repository-relative file path.
 */
function relativeFile(file) {
  return path.relative(process.cwd(), path.resolve(file)).split(path.sep).join('/');
}

/**
 * Parse a complete Checkstyle report; malformed or incomplete reports are errors.
 * @param {string} xml - Checkstyle XML document.
 * @returns {object} Java findings and scanned file inventory.
 * @throws {Error} When the report is invalid or contains no scanned files.
 */
function parseJava(xml) {
  if (XMLValidator.validate(xml) !== true) {
    throw new Error('Invalid Checkstyle XML');
  }
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    isArray: (name) => ['file', 'error'].includes(name)
  });
  const files = parser.parse(xml).checkstyle?.file;
  if (!files?.length) {
    throw new Error('Checkstyle report contains no files');
  }
  const findings = files.flatMap(file => (file.error || []).map(error => ({
    file: relativeFile(file.name),
    line: Number(error.line || 1),
    rule: error.source.split('.').at(-1).replace(/Check$/, ''),
    message: error.message
  })));
  return {
    status: findings.length ? 'violations' : 'clean',
    files: files.map(file => relativeFile(file.name)), findings
  };
}

/**
 * Convert ESLint results and reject parser/configuration failures as tool errors.
 * @param {Array<object>} results - ESLint result objects.
 * @returns {object} JavaScript findings and scanned file inventory.
 * @throws {Error} When a parser or configuration error prevents reliable analysis.
 */
function parseJavaScript(results) {
  const fatal = results.flatMap(result => result.messages).find(message => message.fatal);
  if (fatal) {
    throw new Error(`ESLint parsing failed: ${fatal.message}`);
  }
  const findings = results.flatMap(result => result.messages.map(message => ({
    file: relativeFile(result.filePath), line: message.line || 1,
    rule: message.ruleId || 'eslint', message: message.message
  })));
  return {
    status: findings.length ? 'violations' : 'clean',
    files: results.map(result => relativeFile(result.filePath)), findings
  };
}

/**
 * Escape a value for a Markdown table without allowing embedded markup or mentions.
 * @param {unknown} value - Tool-supplied value.
 * @returns {string} Safe single-line cell text.
 */
function cell(value) {
  return String(value).replace(/[&<>|`@\r\n]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '|': '&#124;', '`': '&#96;',
    '@': '&#64;', '\r': ' ', '\n': ' '
  })[character]);
}

/**
 * Render every finding; the complete Markdown file is retained as an artifact.
 * @param {object} report - Combined audit report.
 * @returns {string} Markdown report with explicit manual-review limitations.
 */
function renderReport(report) {
  const lines = [
    '# Coding-rule audit', '', `Commit: ${cell(report.sha)}`,
    `Branch: ${cell(report.branch)}`, `Time: ${report.createdAt}`, '',
    'Scope: configured automated checks only. This is not full convention approval.',
    'Manual review: complex JS functions, private Java contracts/fields, documentation',
    'accuracy, meaningful comments, naming intent and documented exceptions.',
    'Mapping: docs/coding-rules-automation.md. Functional tests run separately.', ''
  ];
  for (const [language, result] of Object.entries(report.languages)) {
    lines.push(`## ${language}: ${result.status}`, '',
      `Scanned files: ${result.files.length}; findings: ${result.findings.length}.`, '');
    if (result.error) {
      lines.push(`Tool error: ${cell(result.error)}`, '');
    }
    lines.push('| File | Line | Rule | Finding |', '|---|---:|---|---|');
    for (const finding of result.findings) {
      lines.push(`| ${cell(finding.file)} | ${finding.line} | ${cell(finding.rule)}` +
        ` | ${cell(finding.message)} |`);
    }
    lines.push('', 'Scanned files:', '', ...result.files.map(file => `- ${cell(file)}`), '');
  }
  return lines.join('\n');
}

module.exports = { parseJava, parseJavaScript, renderReport, cell };
