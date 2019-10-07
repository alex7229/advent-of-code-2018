import { cloneDeep, sortBy } from "lodash";
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
  const adjustedCellsCopy = cloneDeep(adjustedCells) as Position[];
  const closestDestinationCell = sortBy(
    destinationCells,
    destinationCell =>
      Math.abs(destinationCell.row - adjustedCells[0].row) +
      Math.abs(destinationCell.column - adjustedCells[0].column)
  )[0];
  return adjustedCellsCopy.sort((firstCell, secondCell) => {
    const firstCellDistance =
      Math.abs(firstCell.row - closestDestinationCell.row) +
      Math.abs(firstCell.column - closestDestinationCell.column);
    const secondCellDistance =
      Math.abs(secondCell.row - closestDestinationCell.row) +
      Math.abs(secondCell.column - closestDestinationCell.column);
    if (firstCellDistance < secondCellDistance) {
      return -1;
    }
    if (firstCellDistance > secondCellDistance) {
      return 1;
    }
    // distances are the same, so order is -> top, left, right, bottom
    if (firstCell.row < secondCell.row) {
      // first cell is the top one, it should be first
      return -1;
    }
    if (firstCell.row > secondCell.row) {
      // first cell is the bottom one, it should be latter
      return 1;
    }
    // same row cells are next
    if (firstCell.column < secondCell.column) {
      // first cell is to the left
      return -1;
    }
    if (firstCell.column > secondCell.column) {
      // first cell is to the right
      return 1;
    }
    // cells are exactly the same
    // it should not happen, but just in case
    return 0;
  });
};

export default sortAdjustedCellsByPriority;
