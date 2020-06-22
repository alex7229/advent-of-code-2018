import { Field, Cell, Position } from "./parseGround";

type GetCellByPosition = (position: Position, field: Field) => Cell | null;
const getCellByPosition: GetCellByPosition = (position, field) => {
  if (position.row < 0 || position.column < 0) return null;

  const row: Cell[] | undefined = field[position.row];
  if (!row) return null;

  const cell: Cell | undefined =
    row[position.column - field[0][0].position.column];
  if (!cell) return null;
  return cell;
};

export default getCellByPosition;
