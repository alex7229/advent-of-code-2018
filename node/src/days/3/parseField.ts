type Coordinates = {
  row: number;
  column: number;
};
type DigitCell = {
  type: "digit";
  value: number;
  coordinates: Coordinates;
};
type EmptyCell = {
  type: "empty";
  coordinates: Coordinates;
};
type SymbolCell = {
  type: "symbol";
  value: string;
  coordinates: Coordinates;
};

export type Field = (DigitCell | EmptyCell | SymbolCell)[][];
export type ParseField = (input: string) => Field;

export const parseField: ParseField = (input) => {
  const field: Field = input
    .replace(/ /g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((row, rowIndex) =>
      row.split("").map((char, columnIndex):
        | DigitCell
        | EmptyCell
        | SymbolCell => {
        const coordinates: Coordinates = { column: columnIndex, row: rowIndex };
        if (char === ".") {
          return { type: "empty", coordinates };
        }
        const numValue = parseInt(char, 10);
        if (Number.isNaN(numValue)) {
          return { type: "symbol", value: char, coordinates };
        }
        return { type: "digit", value: numValue, coordinates };
      })
    );
  return field;
};
