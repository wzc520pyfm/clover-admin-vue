import { VALUE_CONSTANT_MAPPING } from "@/constants";

export function constantFormat(constantValue: any, constantType: number, symbol = "--") {
  let result = symbol;
  for (let i = 0; i < VALUE_CONSTANT_MAPPING.length; i++) {
    if (VALUE_CONSTANT_MAPPING[i].type === constantType) {
      const temp = VALUE_CONSTANT_MAPPING[i].data;
      for (let j = 0; j < temp.length; j++) {
        if (temp[j].value === constantValue) {
          result = temp[j].label;
          break;
        }
      }
      break;
    }
  }
  return result;
}

export function elTableFormatter(constantType: number, symbol?: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (row: any, column: any, cellValue: any, index: any) {
    return constantFormat(cellValue, constantType, symbol);
  };
}
