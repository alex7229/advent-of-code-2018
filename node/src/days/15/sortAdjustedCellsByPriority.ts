import { sortBy } from "lodash";
import { Position } from "./findAdjustedCells";

type SortAdjustedCellsByPriority = (
  adjustedCells: ReadonlyArray<Position>,
  destinationCells: ReadonlyArray<Position>
) => ReadonlyArray<Position>;

const sortAdjustedCellsByPriority: SortAdjustedCellsByPriority = (
  adjustedCells,
  destinationCells
) => {
  if (adjustedCells.length === 0 || destinationCells.length === 0) {
    throw new Error("both destination and adjusted cells should be present");
  }
  const closestDestinationCell = sortBy(
    destinationCells,
    destinationCell =>
      Math.abs(destinationCell.row - adjustedCells[0].row) +
      Math.abs(destinationCell.column - adjustedCells[0].column)
  )[0];
  return sortBy(
    adjustedCells,
    adjustedCell =>
      Math.abs(adjustedCell.row - closestDestinationCell.row) +
      Math.abs(adjustedCell.column - closestDestinationCell.column)
  );
};

export default sortAdjustedCellsByPriority;
