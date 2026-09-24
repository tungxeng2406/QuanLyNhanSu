(() => {
  const headers = ['No', 'Tên mặt hàng', 'Số lượng', 'Đơn giá', 'Thuế VAT (%)'];
  const byId = id => document.getElementById(id);
  const fileInput = byId('itemsCsvFile');
  const dialog = byId('itemsDialog');
  let items = [];

  // CSV supports quoted commas, escaped quotes and multiline fields.
  function parseCsv(text) {
    text = text.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], field = '', quoted = false, closed = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quoted) {
        if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (ch === '"') { quoted = false; closed = true; }
        else field += ch;
      } else if (ch === ',' || ch === '\n' || ch === '\r') {
        row.push(field); field = ''; closed = false;
        if (ch !== ',') {
          if (row.some(value => value.trim())) rows.push(row);
          row = [];
          if (ch === '\r' && text[i + 1] === '\n') i++;
        }
      } else if (ch === '"' && field === '' && !closed) quoted = true;
      else {
        if (closed || ch === '"') throw new Error('CSV có dấu ngoặc kép không hợp lệ.');
        field += ch;
      }
    }
    if (quoted) throw new Error('CSV thiếu dấu ngoặc kép đóng.');
    row.push(field);
    if (row.some(value => value.trim())) rows.push(row);
    return rows;
  }

  function number(value, label, line, percent = false) {
    const normalized = value.trim().replace(percent ? /%$/ : /$^/, '').trim();
    if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error(`Dòng ${line}: ${label} phải là số không âm, dùng dấu chấm cho phần thập phân.`);
    const result = Number(normalized);
    if (!Number.isFinite(result) || result > Number.MAX_SAFE_INTEGER || (percent && result > 100)) {
      throw new Error(`Dòng ${line}: ${label} nằm ngoài phạm vi cho phép${percent ? ' (0–100%)' : ''}.`);
    }
    return result;
  }

  byId('importItemsButton').addEventListener('click', () => fileInput.click());
  byId('closeItemsButton').addEventListener('click', () => dialog.close());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      if (!/\.csv$/i.test(file.name)) throw new Error('Vui lòng chọn file .csv.');
      if (file.size > 5 * 1024 * 1024) throw new Error('File CSV tối đa 5 MB.');
      const rows = parseCsv(await file.text());
      const actualHeaders = rows.shift() || [];
      const normalize = value => value.trim().normalize('NFC').toLocaleLowerCase('vi');
      const indices = headers.map(header => actualHeaders.findIndex(value => normalize(value) === normalize(header)));
      // Accept existing CSV templates and the short tax-rate heading.
      if (indices[4] === -1) indices[4] = actualHeaders.findIndex(value => ['thuế vat', 'vat (mặt hàng)'].includes(normalize(value)));
      if (indices.includes(-1) || new Set(actualHeaders.map(normalize)).size !== actualHeaders.length) {
        throw new Error(`CSV cần các cột: ${headers.join(', ')}.`);
      }
      if (!rows.length) throw new Error('CSV chưa có dữ liệu mặt hàng.');
      if (rows.length > 10000) throw new Error('CSV tối đa 10.000 mặt hàng.');
      const parsed = rows.map((row, index) => {
        const line = index + 2;
        if (row.length !== actualHeaders.length) throw new Error(`Dòng ${line}: số cột không khớp tiêu đề.`);
        const [no, name, qty, price, rate] = indices.map(i => row[i].trim());
        if (!no || !name) throw new Error(`Dòng ${line}: No và Tên mặt hàng không được để trống.`);
        const quantity = number(qty, 'Số lượng', line);
        const unitPrice = number(price, 'Đơn giá', line);
        const vatRate = number(rate, 'Thuế VAT (%)', line, true);
        const total = quantity * unitPrice;
        const vat = total * vatRate / 100;
        if (!Number.isFinite(total) || total > Number.MAX_SAFE_INTEGER || !Number.isFinite(vat)) throw new Error(`Dòng ${line}: giá trị tính toán quá lớn.`);
        const round = value => Math.round((value + Number.EPSILON) * 100) / 100;
        const beforeVat = round(total);
        const vatAmount = round(vat);
        const afterVat = round(beforeVat + vatAmount);
        if (afterVat > Number.MAX_SAFE_INTEGER) throw new Error(`Dòng ${line}: giá trị tính toán quá lớn.`);
        return [no, name, quantity, unitPrice, vatRate, beforeVat, vatAmount, afterVat];
      });
      items = parsed;
      const fragment = document.createDocumentFragment();
      const format = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 20 });
      for (const item of items) {
        const tr = document.createElement('tr');
        item.forEach((value, index) => {
          const td = document.createElement('td');
          td.textContent = index < 2 ? value : `${format.format(value)}${index === 4 ? '%' : ''}`;
          tr.append(td);
        });
        fragment.append(tr);
      }
      byId('itemsRows').replaceChildren(fragment);
      const totalAfterVat = items.reduce((sum, item) => sum + Math.round(item[7] * 100), 0) / 100;
      byId('itemsTotal').textContent = format.format(totalAfterVat);
      byId('itemsSummary').textContent = `${file.name} · ${items.length} mặt hàng · Trước VAT = Số lượng × Đơn giá; Thuế VAT = Trước VAT × Thuế VAT (%) / 100; Sau VAT = Trước VAT + Thuế VAT. Số tiền làm tròn 2 chữ số thập phân.`;
      byId('alert').hidden = true;
      dialog.showModal();
    } catch (error) {
      showAlert(error.message);
    } finally {
      fileInput.value = '';
    }
  });

  byId('exportItemsButton').addEventListener('click', () => {
    const escape = value => {
      let text = String(value);
      if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
      return '"' + text.replace(/"/g, '""') + '"';
    };
    const csv = [headers.concat(['Trước VAT', 'Thuế VAT', 'Sau VAT']), ...items].map(row => row.map(escape).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mat-hang.csv';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
