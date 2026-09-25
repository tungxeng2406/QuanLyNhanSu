/** Run both linters, preserve tool failures and publish local JSON/Markdown evidence. */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { ESLint } = require('eslint');
const { parseJava, parseJavaScript, renderReport } = require('./coding-report.cjs');
const output = path.resolve('target/coding-rules');

/**
 * Return a tool error without converting it into coding-rule findings.
 * @param {Error} error - Tool failure.
 * @returns {object} Incomplete language result.
 */
function toolError(error) {
  return { status: 'error', files: [], findings: [], error: error.message };
}

/**
 * Run Checkstyle and verify that every tracked/unignored Java source was scanned.
 * @param {Array<string>} inventory - Repository-owned file paths.
 * @returns {object} Complete Java result or an explicit tool error.
 */
function checkJava(inventory) {
  try {
    const xmlPath = path.join(output, 'checkstyle.xml');
    fs.rmSync(xmlPath, { force: true });
    const result = spawnSync('mvn', [
      '-B', 'checkstyle:check', '-Dcheckstyle.failOnViolation=false'
    ], { encoding: 'utf8', shell: process.platform === 'win32', timeout: 600000 });
    fs.writeFileSync(path.join(output, 'checkstyle.log'),
      `${result.stdout || ''}\n${result.stderr || ''}`);
    if (result.error || result.status !== 0) {
      throw new Error('Checkstyle execution failed; see checkstyle.log');
    }
    const parsed = parseJava(fs.readFileSync(xmlPath, 'utf8'));
    const missing = inventory.filter(file => file.endsWith('.java') &&
      !parsed.files.includes(file));
    if (missing.length) {
      throw new Error(`Java files outside Checkstyle scan: ${missing.join(', ')}`);
    }
    return parsed;
  } catch (error) {
    return toolError(error);
  }
}

/**
 * Run ESLint on every applicable project JavaScript file, including test tooling.
 * @param {Array<string>} inventory - Repository-owned file paths.
 * @returns {Promise<object>} Complete JavaScript result or an explicit tool error.
 */
async function checkJavaScript(inventory) {
  try {
    const eslint = new ESLint();
    const files = inventory.filter(file => /\.(?:js|cjs|mjs)$/.test(file));
    const results = await eslint.lintFiles(files);
    fs.writeFileSync(path.join(output, 'eslint.json'), JSON.stringify(results, null, 2));
    return parseJavaScript(results);
  } catch (error) {
    return toolError(error);
  }
}

/**
 * Audit without modifying source; write reports even when one linter fails.
 * @returns {Promise<void>} Resolves after reports and the quality-gate exit code are set.
 * @throws {Error} When Git inventory or report output cannot be accessed.
 */
async function main() {
  fs.mkdirSync(output, { recursive: true });
  const listed = spawnSync('git', ['ls-files', '-z', '--cached', '--others',
    '--exclude-standard'], { encoding: 'utf8' });
  if (listed.status !== 0) {
    throw new Error('Cannot enumerate repository files');
  }
  const excluded = /^(node_modules|target|playwright-report|test-results)\/|^tests\/unit_result\/|^docs\/(test-evidence|code-review)\//;
  const inventory = [...new Set(listed.stdout.split('\0'))].filter(file =>
    file && !excluded.test(file) && fs.existsSync(file));
  const java = checkJava(inventory);
  const javascript = await checkJavaScript(inventory);
  const head = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' });
  const branch = spawnSync('git', ['branch', '--show-current'], { encoding: 'utf8' });
  const report = {
    schemaVersion: 1, sha: process.env.GITHUB_SHA || head.stdout.trim(),
    branch: process.env.GITHUB_REF_NAME || branch.stdout.trim(),
    createdAt: new Date().toISOString(), languages: { java, javascript }
  };
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  const markdown = renderReport(report);
  fs.writeFileSync(path.join(output, 'report.md'), markdown);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = Object.entries(report.languages).map(([name, result]) =>
      `- ${name}: ${result.status}; ${result.findings.length} findings`).join('\n');
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `## Coding rules\n${summary}\n\nFull evidence: coding-rules artifact.\n`);
  }
  console.log(JSON.stringify(Object.fromEntries(Object.entries(report.languages)
    .map(([name, result]) => [name, {
      status: result.status, files: result.files.length, findings: result.findings.length
    }])), null, 2));
  process.exitCode = [java, javascript].some(result => result.status === 'error') ? 2 :
    [java, javascript].some(result => result.status === 'violations') ? 1 : 0;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 2;
});
