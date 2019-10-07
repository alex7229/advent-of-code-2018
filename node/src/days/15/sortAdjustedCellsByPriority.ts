import { sortBy } from "lodash";
import { Position } from "./findAdjustedCells";

type SortAdjustedCellsByPriority = (
  adjustedCells: ReadonlyArray<Position>
) => ReadonlyArray<Position>;

const sortAdjustedCellsByPriority: SortAdjustedCellsByPriority = adjustedCells => {
  if (adjustedCells.length === 0) {
    throw new Error("both destination and adjusted cells should be present");
  }
  return sortBy(adjustedCells, ["row", "column"]);
};

export default sortAdjustedCellsByPriority;
