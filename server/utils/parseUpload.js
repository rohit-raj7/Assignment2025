import * as XLSX from 'xlsx';
import csv from 'csvtojson';

export const parseBuffer = async (file) => {
  if (file.mimetype === 'text/csv') {
    return await csv().fromString(file.buffer.toString());
  }

  if (
    file.mimetype === 'application/vnd.ms-excel' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  }

  return null;
};
