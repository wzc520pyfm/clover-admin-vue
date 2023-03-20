import * as XLSX from "xlsx";

export interface ExcelData<T = any> {
  header: string[];
  data: any[];
  results: T[];
  meta: { sheetName: string };
}

function shapeWorkSheel(sheet: XLSX.WorkSheet, range: XLSX.Range) {
  let str = " ",
    char = 65,
    customWorkSheet = {
      t: "s",
      v: str,
      r: `<t> </t><phoneticPr fontId="1" type="noConversion"/>`,
      h: str,
      w: str,
    };
  if (!sheet || !sheet["!ref"]) return [];

  let c = 0,
    r = 1;
  while (c < range.e.c + 1) {
    while (r < range.e.r + 1) {
      if (!sheet[String.fromCharCode(char) + r]) {
        sheet[String.fromCharCode(char) + r] = customWorkSheet;
      }
      r++;
    }
    r = 1;
    str += " ";
    customWorkSheet = {
      t: "s",
      v: str,
      r: `<t> </t><phoneticPr fontId="1" type="noConversion"/>`,
      h: str,
      w: str,
    };
    c++;
    char++;
  }
}

/** 以excel第一行作为头部 */
function getHeaderRow(sheet: XLSX.WorkSheet) {
  if (!sheet || !sheet["!ref"]) return [];
  const headers: string[] = [];
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range: XLSX.Range = XLSX.utils.decode_range(sheet["!ref"]);
  shapeWorkSheel(sheet, range);
  const R = range.s.r;
  // start in the first row
  for (let C = range.s.c; C <= range.e.c; C++) {
    // walk every column in the range
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    // find the cell in the first row
    let hdr = `UNKNOWN${C}`;
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

/** 获取excel数据 */
function getExcelData(workbook: XLSX.WorkBook) {
  const excelData: ExcelData[] = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const header: string[] = getHeaderRow(worksheet);
    const data: any[] = [];
    let results = XLSX.utils.sheet_to_json(worksheet, {
      raw: true,
    }) as object[];

    results = results.map((row: { [key: string]: any }) => {
      const arr = [];
      for (const field in row) {
        arr.push(row[field]);
        if (row[field] instanceof Date) {
          // 在此格式化日期格式
        }
      }
      data.push(arr);
      return row;
    });
    excelData.push({
      header,
      data,
      results, // sheet数组
      meta: { sheetName },
    });
  }

  return excelData;
}

export function useExcel() {
  /**
   * 解析excel文件内容
   * @param rawFile excel file
   */
  const parseData = (rawFile: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target && e.target.result;
          const workbook = XLSX.read(data, { type: "array", cellDates: true });
          const excelData = getExcelData(workbook);

          resolve(excelData);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(rawFile);
    });
  };

  return {
    parseData,
  };
}
