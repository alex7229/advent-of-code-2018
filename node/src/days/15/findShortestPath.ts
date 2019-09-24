import { Battlefield, Unit } from "./parseBattlefield";
import findAdjustedCells, { Position } from "./findAdjustedCells";
import findShortestPathFromGiven, { Path } from "./findShortestPathFromGiven";
import sortAdjustedCellsByPriority from "./sortAdjustedCellsByPriority";
import findMinimumTeoriticalPathLength from "./findMinimumTeoriticalPathLength";

export type FindShortestPath = (
  from: Position,
  destinations: ReadonlyArray<Position>,
  battlefield: Battlefield,
  units: ReadonlyArray<Unit>,
  cellsDistance?: number[][],
  currentPath?: Path,
  lengthLimit?: number
) => Path | null;

const findShortestPath: FindShortestPath = (
  from,
  destinations,
  battlefield,
  units,
  cellsDistance,
  currentPath,
  lengthLimit = Number.POSITIVE_INFINITY
) => {
  if (!cellsDistance || !currentPath) {
    const initialPath = [from];
    const initialDistances = battlefield.map(row =>
      row.map(() => Number.POSITIVE_INFINITY)
    );
    initialDistances[from.row][from.column] = 0;
    return findShortestPath(
      from,
      destinations,
      battlefield,
      units,
      initialDistances,
      initialPath,
      lengthLimit
    );
  }
  const lastCell = currentPath[currentPath.length - 1];
  const isFinished = destinations.find(
    ({ row, column }) => row === lastCell.row && column === lastCell.column
  );
  if (isFinished) {
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
    // is it mutated; otherwise, it'll slow down the process significantly
    // eslint-disable-next-line no-param-reassign
    cellsDistance[adjustedCell.row][adjustedCell.column] = currentPath.length;
  });
  // length limit +1 is used here
  // because current path that consists of two points is actually 1 distance long
  if (currentPath.length > lengthLimit + 1) {
    return null;
  }
  let currentLengthLimit = lengthLimit;
  // const possiblePaths = adjustedCells
  const possiblePaths = sortAdjustedCellsByPriority(adjustedCells, destinations)
    .map(cell => {
      const optimisticPathLength = findMinimumTeoriticalPathLength(
        currentPath.length,
        cell,
        destinations
      );
      if (optimisticPathLength > currentLengthLimit) {
        return null;
      }
      const path = findShortestPath(
        from,
        destinations,
        battlefield,
        units,
        cellsDistance,
        [...currentPath, cell],
        currentLengthLimit
      );
      if (path && path.length - 1 < currentLengthLimit) {
        currentLengthLimit = path.length - 1;
      }
      return path;
    })
    // cast is used because typescript for now cannot infer that null paths are filtered out
    .filter(path => path !== null) as Position[][];
  if (possiblePaths.length === 0) {
    return null;
  }
  return findShortestPathFromGiven(possiblePaths);
};

export default findShortestPath;
