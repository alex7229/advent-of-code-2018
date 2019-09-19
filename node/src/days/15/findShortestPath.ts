import { Battlefield, Unit } from "./parseBattlefield";
import findAdjustedCells, { Position } from "./findAdjustedCells";
import comparePaths, { Path } from "./comparePaths";

type CellsDistance = number[][];
type FindShortestPath = (
  from: Position,
  to: Position,
  battlefield: Battlefield,
  units: Unit[],
  cellsDistance?: CellsDistance,
  currentPath?: Path
) => Path | null;

const findShortestPath: FindShortestPath = (
  from,
  to,
  battlefield,
  units,
  cellsDistance,
  currentPath
) => {
  if (!cellsDistance || !currentPath) {
    const initialPath = [from];
    const initialDistances = battlefield.map(row =>
      row.map(() => Number.POSITIVE_INFINITY)
    );
    initialDistances[from.row][from.column] = 0;
    return findShortestPath(
      from,
      to,
      battlefield,
      units,
      initialDistances,
      initialPath
    );
  }
  const lastCell = currentPath[currentPath.length - 1];
  if (lastCell.row === to.row && lastCell.column === to.column) {
    // reached the destination
    return currentPath;
  }
  const adjustedCells = findAdjustedCells(
    battlefield,
    currentPath[currentPath.length - 1],
    units
  ).filter(adjustedCell => {
    // checks if this cell was already reached more efficiently via different path
    const previousDistance =
      cellsDistance[adjustedCell.row][adjustedCell.column];
    const currentDistance = currentPath.length;
    return currentDistance <= previousDistance;
  });
  if (adjustedCells.length === 0) {
    // reached dead end
    return null;
  }
  adjustedCells.forEach(adjustedCell => {
    // mark the distance for those cells
    // is it mutated; otherwise, it'll slown down the process significantly
    // eslint-disable-next-line no-param-reassign
    cellsDistance[adjustedCell.row][adjustedCell.column] = currentPath.length;
  });
  const possiblePaths = adjustedCells
    .map(cell =>
      findShortestPath(from, to, battlefield, units, cellsDistance, [
        ...currentPath,
        cell
      ])
    )
    // cast is used because typescript for now cannot infer that null paths are filtered out
    .filter(path => path !== null) as Position[][];
  if (possiblePaths.length === 0) {
    return null;
  }
  return comparePaths(possiblePaths);
};

export default findShortestPath;
