import { Field } from "./parseField";

export type NumberMetaData = {
  value: number;
  row: number;
  column: { from: number; to: number };
};

export type FindValidPartNumbers = <IncludeMetadata extends boolean = false>(
  field: Field,
  includeMetadata?: IncludeMetadata
) => IncludeMetadata extends true ? NumberMetaData[] : number[];

export const findValidPartNumbers: FindValidPartNumbers = (
  field,
  includeMetadata
) => {
  const allNumbers: NumberMetaData[] = [];

  field.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      if (symbol.type !== "digit") return;

      const lastNumber =
        allNumbers.length === 0 ? null : allNumbers[allNumbers.length - 1];
      if (
        !lastNumber ||
        lastNumber.row !== rowIndex ||
        lastNumber.column.to + 1 !== columnIndex
      ) {
        allNumbers.push({
          column: { from: columnIndex, to: columnIndex },
          row: rowIndex,
          value: symbol.value,
        });
        return;
      }
      allNumbers[allNumbers.length - 1] = {
        value: parseInt(`${lastNumber.value}${symbol.value}`, 10),
        row: rowIndex,
        column: { from: lastNumber.column.from, to: columnIndex },
      };
    });
  });

  const validNumbers = allNumbers.filter((num) => {
    let isValid = false;
    for (let rowIndex = num.row - 1; rowIndex <= num.row + 1; rowIndex++) {
      for (
        let columnIndex = num.column.from - 1;
        columnIndex <= num.column.to + 1;
        columnIndex++
      ) {
        const row = field[rowIndex];
        if (!row) continue; // out of bounds
        const cell = row[columnIndex];
        if (!cell) continue; // out of bounds
        if (cell.type === "symbol") {
          isValid = true;
          break;
        }
      }
    }
    return isValid;
  });
  return (includeMetadata
    ? validNumbers
    : validNumbers.map((n) => n.value)) as any;
};
