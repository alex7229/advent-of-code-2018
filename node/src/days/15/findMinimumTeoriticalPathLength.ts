import { Position } from "./findAdjustedCells";

type FindMinimumTeoriticalPathLength = (
  currentPathLength: number,
  currentCell: Position,
  destinationCells: ReadonlyArray<Position>
) => number;

const findMinimumTeoriticalPathLength: FindMinimumTeoriticalPathLength = (
  currentPathLength,
  currentCell,
  destinations
) => {
  let optimisticLength = Number.POSITIVE_INFINITY;
  destinations.forEach(destinationCell => {
    const possibleDistance =
      currentPathLength +
      Math.abs(destinationCell.row - currentCell.row) +
      Math.abs(destinationCell.column - currentCell.column);
    if (possibleDistance < optimisticLength) {
      optimisticLength = possibleDistance;
    }
  });
  return optimisticLength;
};

export default findMinimumTeoriticalPathLength;
