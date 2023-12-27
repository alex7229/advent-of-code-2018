import { FindValidPartNumbers } from "./findValidPartNumbers";
import { Field } from "./parseField";

export type Gear = {
  position: { column: number; row: number };
  ratios: [number, number];
};

export type FindGears = (
  field: Field,
  findValidPartNumbers: FindValidPartNumbers
) => Gear[];

export const findGears: FindGears = (field, findValidPartNumbers) => {
  const allNumbers = findValidPartNumbers(field, true);
  const gears: Gear[] = [];
  field.forEach((row) =>
    row.forEach((cell) => {
      if (cell.type !== "symbol") return;
      if (cell.value !== "*") return;

      const ratios: number[] = [];
      const nearbyCells: { row: number; column: number }[] = [];
      for (
        let row = cell.coordinates.row - 1;
        row <= cell.coordinates.row + 1;
        row++
      ) {
        for (
          let column = cell.coordinates.column - 1;
          column <= cell.coordinates.column + 1;
          column++
        ) {
          nearbyCells.push({ row, column });
        }
      }
      allNumbers.forEach((num) => {
        let isNear = false;
        nearbyCells.forEach((cell) => {
          if (
            cell.row === num.row &&
            cell.column >= num.column.from &&
            cell.column <= num.column.to
          ) {
            isNear = true;
          }
        });
        if (isNear) {
          ratios.push(num.value);
        }
      });
      if (ratios.length === 2) {
        gears.push({
          position: cell.coordinates,
          ratios: [ratios[0], ratios[1]],
        });
      }
    })
  );
  return gears;
};
