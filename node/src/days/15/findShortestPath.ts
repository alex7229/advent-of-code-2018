import { isEqual } from "lodash";
import { Battlefield, Unit } from "./parseBattlefield";
import findAdjustedCells, { Position } from "./findAdjustedCells";
import findShortestPathFromGiven, { Path } from "./findShortestPathFromGiven";
import sortAdjustedCellsByPriority from "./sortAdjustedCellsByPriority";
import findMinimumTeoriticalPathLength from "./findMinimumTeoriticalPathLength";

interface BestPathToTheCell {
  readonly distance: number;
  readonly path: ReadonlyArray<Position>;
}

export type FindShortestPath = (
  from: Position,
  destinations: ReadonlyArray<Position>,
  battlefield: Battlefield,
  units: ReadonlyArray<Unit>,
  cellsDistance?: BestPathToTheCell[][],
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
    const initialDistances: BestPathToTheCell[][] = battlefield.map(row =>
      row.map(() => ({
        path: [],
        distance: Number.POSITIVE_INFINITY
      }))
    );
    initialDistances[from.row][from.column] = {
      path: [],
      distance: 0
    };
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
  if (
    cellsDistance[lastCell.row][lastCell.column].distance <
    currentPath.length - 1
  ) {
    // this cell was reached from the other path more efficiently before
    return null;
  }
  const storedPath = cellsDistance[lastCell.row][lastCell.column].path;
  const storedPathIsShorter = isEqual(
    findShortestPathFromGiven([storedPath, currentPath]),
    storedPath
  );
  if (storedPathIsShorter && storedPath.length !== 0) {
    // stored path to that cell is shorter. Ignore current branch
    // the only exception is when the cell wasn't reached before
    // and the path to that cell is default []
    return null;
  }
  // mark the distance for this cell
  // is it mutated; otherwise, it'll slow down the process significantly
  // eslint-disable-next-line no-param-reassign
  cellsDistance[lastCell.row][lastCell.column] = {
    distance: currentPath.length - 1,
    path: currentPath
  };
  const adjustedCells = findAdjustedCells(
    battlefield,
    currentPath[currentPath.length - 1],
    units
  );
  if (adjustedCells.length === 0) {
    // reached dead end
    return null;
  }
  // length limit +1 is used here
  // because current path that consists of two points is actually 1 distance long
  if (currentPath.length > lengthLimit + 1) {
    return null;
  }
  let currentLengthLimit = lengthLimit;
  // const possiblePaths = adjustedCells
  const possiblePaths = sortAdjustedCellsByPriority(adjustedCells)
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
