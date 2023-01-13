import { VALUE_CONSTANT_MAPPING } from "@/constants";

export function constantFormat(constantValue: any, constantType: number, symbol = "--") {
  let result = symbol;
  for (const element of VALUE_CONSTANT_MAPPING) {
    if (element.type === constantType) {
      const temp = element.data;
      for (const element of temp) {
        if (element.value === constantValue) {
          result = element.label;
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
