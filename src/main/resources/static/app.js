const state = { page: 0, size: 10, sort: 'employeeCode,asc', editingId: null, saving: false };
const api = '/api/employees';
const $ = (id) => document.getElementById(id);
const textSearchIds = ['searchEmployeeCode', 'searchFullName', 'searchPhone', 'searchEmail'];
const allSearchIds = [...textSearchIds, 'searchGender', 'searchDateOfBirth'];
let searchTimer;
let loadSequence = 0;

$('formPanel').hidden = true;

function showAlert(message, ok = false) {
  const element = $('alert');
  element.hidden = false;
  element.textContent = message;
  element.style.background = ok ? '#d9efe4' : '#f8d9d2';
  element.style.color = ok ? '#267a5a' : '#8d3e31';
}

function filters() {
  return {
    employeeCode: $('searchEmployeeCode').value.trim(),
    fullName: $('searchFullName').value.trim(),
    gender: $('searchGender').value,
    dateOfBirth: $('searchDateOfBirth').value,
    phone: $('searchPhone').value.trim(),
    email: $('searchEmail').value.trim()
  };
}

function query(extra = {}) {
  const parameters = new URLSearchParams({ ...filters(), page: state.page, size: state.size, sort: state.sort, ...extra });
  for (const [key, value] of [...parameters]) {
    if (!value) parameters.delete(key);
  }
  return parameters;
}

function writeUrlState() {
  const url = new URL(window.location.href);
  url.search = query().toString();
  window.history.replaceState({}, '', url);
}

function readUrlState() {
  const parameters = new URLSearchParams(window.location.search);
  const parameterNames = { searchEmployeeCode: 'employeeCode', searchFullName: 'fullName', searchGender: 'gender', searchDateOfBirth: 'dateOfBirth', searchPhone: 'phone', searchEmail: 'email' };
  for (const id of allSearchIds) {
    const value = parameters.get(parameterNames[id]);
    if (value !== null) $(id).value = value;
  }
  state.page = Math.max(Number(parameters.get('page') || 0), 0);
  state.size = Math.min(Math.max(Number(parameters.get('size') || 10), 1), 100);
  state.sort = parameters.get('sort') || 'employeeCode,asc';
}

async function load() {
  const sequence = ++loadSequence;
  try {
    writeUrlState();
    const response = await fetch(`${api}?${query()}`);
    const data = await response.json();
    if (sequence !== loadSequence) return;
    if (!response.ok) throw new Error(data.message || 'Request failed');
    renderRows(data.content);
    renderPagination(data);
    updateSortLabels();
  } catch (error) {
    if (sequence === loadSequence) showAlert(error.message);
  }
}

function renderRows(rows) {
  const body = $('employeeRows');
  body.replaceChildren();
  if (!rows.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 7;
    cell.textContent = 'No employees found';
    row.append(cell);
    body.append(row);
    return;
  }
  rows.forEach((employee) => {
    const row = document.createElement('tr');
    [['employeeCode', employee.employeeCode], ['fullName', employee.fullName], ['gender', employee.gender || '-'], ['dateOfBirth', employee.dateOfBirth || '-'], ['phone', employee.phone || '-'], ['email', employee.email || '-']].forEach(([, value]) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    const actions = document.createElement('td');
    actions.className = 'row-actions';
    const view = document.createElement('button');
    view.textContent = 'View';
    view.onclick = () => showDetails(employee.id);
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = () => openForm(employee.id);
    const remove = document.createElement('button');
    remove.textContent = 'Delete';
    remove.onclick = () => removeEmployee(employee.id);
    actions.append(view, edit, remove);
    row.append(actions);
    body.append(row);
  });
}

function renderPagination(data) {
  const element = $('pagination');
  element.replaceChildren();
  const previous = document.createElement('button');
  previous.className = 'button secondary';
  previous.textContent = 'Previous';
  previous.disabled = data.page === 0;
  previous.onclick = () => { state.page -= 1; load(); };
  const label = document.createElement('span');
  label.textContent = `Page ${data.page + 1} / ${Math.max(data.totalPages, 1)}`;
  label.style.padding = '11px 5px';
  const next = document.createElement('button');
  next.className = 'button secondary';
  next.textContent = 'Next';
  next.disabled = data.page + 1 >= data.totalPages;
  next.onclick = () => { state.page += 1; load(); };
  element.append(previous, label, next);
}

function updateSortLabels() {
  const [field, direction] = state.sort.split(',');
  document.querySelectorAll('[data-sort-field]').forEach((button) => {
    button.textContent = `${button.dataset.sortField === field ? (direction === 'asc' ? '▲ ' : '▼ ') : ''}${button.dataset.sortField}`;
  });
}

function debounceSearch() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { state.page = 0; load(); }, 300);
}

function value(id) { return $(id).value || null; }
function formPayload() {
  return {
    employeeCode: value('employeeCode'),
    fullName: value('fullName'),
    gender: value('gender'),
    dateOfBirth: value('dateOfBirth'),
    phone: value('phone'),
    email: value('email')
  };
}

async function openForm(id = null) {
  state.editingId = id;
  $('formPanel').hidden = false;
  $('formTitle').textContent = id ? 'Edit Employee' : 'Add Employee';
  $('employeeForm').reset();
  if (!id) return;
  const response = await fetch(`${api}/${id}`);
  const employee = await response.json();
  [['employeeCode', employee.employeeCode], ['fullName', employee.fullName], ['gender', employee.gender], ['dateOfBirth', employee.dateOfBirth], ['phone', employee.phone], ['email', employee.email]].forEach(([key, value]) => $(key).value = value || '');
}

async function save(event) {
  event.preventDefault();
  if (state.saving) return;
  state.saving = true;
  const button = $('saveButton');
  button.disabled = true;
  button.textContent = 'Saving...';
  try {
    const response = await fetch(state.editingId ? `${api}/${state.editingId}` : api, { method: state.editingId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formPayload()) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Save failed');
    closeForm();
    showAlert('Employee saved successfully', true);
    await load();
  } catch (error) {
    showAlert(error.message);
  } finally {
    state.saving = false;
    button.disabled = false;
    button.textContent = 'Save Employee';
  }
}

async function removeEmployee(id) {
  if (!confirm('Delete this employee?')) return;
  const response = await fetch(`${api}/${id}`, { method: 'DELETE' });
  if (!response.ok) { const data = await response.json(); showAlert(data.message); return; }
  showAlert('Employee deleted successfully', true);
  load();
}

async function showDetails(id) {
  const response = await fetch(`${api}/${id}`);
  const employee = await response.json();
  if (!response.ok) { showAlert(employee.message); return; }
  showAlert(`${employee.employeeCode} - ${employee.fullName} | ${employee.email || 'No email'} | ${employee.phone || 'No phone'}`, true);
}

function closeForm() { $('formPanel').hidden = true; }

readUrlState();
$('filterForm').onsubmit = (event) => event.preventDefault();
$('resetButton').onclick = () => { $('filterForm').reset(); state.page = 0; load(); };
textSearchIds.forEach((id) => $(id).addEventListener('input', debounceSearch));
['searchGender', 'searchDateOfBirth'].forEach((id) => $(id).addEventListener('change', () => { state.page = 0; load(); }));
document.querySelectorAll('[data-sort-field]').forEach((button) => button.addEventListener('click', () => { const field = button.dataset.sortField; const [currentField, direction] = state.sort.split(','); state.sort = `${field},${field === currentField && direction === 'asc' ? 'desc' : 'asc'}`; state.page = 0; load(); }));
$('refreshButton').onclick = load;
$('addButton').onclick = () => openForm();
$('closeFormButton').onclick = closeForm;
$('formPanel').onclick = (event) => { if (event.target === $('formPanel')) closeForm(); };
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !$('formPanel').hidden) closeForm(); });
$('employeeForm').onsubmit = (event) => save(event);
$('exportButton').onclick = () => { window.location = `${api}/export/csv?${query({ page: 0, size: 10000 })}`; };
window.addEventListener('popstate', () => { readUrlState(); load(); });
load();
