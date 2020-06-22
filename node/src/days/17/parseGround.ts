export interface Position {
  row: number;
  column: number;
}
export interface Cell {
  position: Position;
  type: "sand" | "clay" | "water" | "wet sand" | "spring";
}
export type Field = Cell[][];

type ParseGround = (input: string) => Field;
const parseGround: ParseGround = input => {
  const topLeftCorner: Position = { column: 499, row: 0 };
  const bottomRightCorner: Position = { column: 501, row: 1 };

  const regExp = /(x|y)=(\d*), (x|y)=(\d*)..(\d*)/g;
  const deposits: Position[][] = [...input.matchAll(regExp)].map(match => {
    const singleValue = parseInt(match[2], 10);
    const rangeFirstValue = parseInt(match[4], 10);
    const rangeSecondValue = parseInt(match[5], 10);

    if (match[1] === "x") {
      return Array(rangeSecondValue - rangeFirstValue + 1)
        .fill(0)
        .map((value, index) => ({
          column: singleValue,
          row: rangeFirstValue + index
        }));
    }
    return Array(rangeSecondValue - rangeFirstValue + 1)
      .fill(0)
      .map((_, index) => ({
        row: singleValue,
        column: rangeFirstValue + index
      }));
  });

  deposits.forEach(deposit => {
    const depositLeftCell = deposit[0];
    const depositRightCell = deposit[deposit.length - 1];
    if (depositLeftCell.column <= topLeftCorner.column) {
      topLeftCorner.column = depositLeftCell.column - 1;
    }
    if (depositRightCell.column >= bottomRightCorner.column) {
      bottomRightCorner.column = depositRightCell.column + 1;
    }
    if (depositRightCell.row > bottomRightCorner.row) {
      bottomRightCorner.row = depositRightCell.row;
    }
  });
  const field: Field = [];
  for (let row = 0; row <= bottomRightCorner.row; row += 1) {
    field[row] = [];
    for (
      let { column } = topLeftCorner;
      column <= bottomRightCorner.column;
      column += 1
    ) {
      let type: Cell["type"] = "sand";
      if (column === 500 && row === 0) {
        type = "spring";
      }
      if (
        deposits.some(depositPositions =>
          depositPositions.find(
            depositPosition =>
              depositPosition.column === column && depositPosition.row === row
          )
        )
      ) {
        type = "clay";
      }
      field[row].push({
        position: {
          row,
          column
        },
        type
      });
    }
  }

  return field;
};

export default parseGround;
