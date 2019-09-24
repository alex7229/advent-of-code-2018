import { cloneDeep } from "lodash";
import { Position } from "./findAdjustedCells";

export type Path = ReadonlyArray<Position>;
type ComparePaths = (paths: ReadonlyArray<Path>) => Path;

const comparePaths: ComparePaths = providedPaths => {
  if (providedPaths.length === 0) {
    throw new Error("at least one path should be passed");
  }
  if (providedPaths.length === 1) {
    return providedPaths[0];
  }
  const paths = cloneDeep(providedPaths) as Path[];
  paths.sort((firstPath, secondPath) => {
    if (firstPath.length < secondPath.length) {
      return -1;
    }
    if (firstPath.length > secondPath.length) {
      return 1;
    }
    // paths are of the same length, so game order should be used for the first different cell
    for (let i = 0; i < firstPath.length; i += 1) {
      const firstCell = firstPath[i];
      const secondCell = secondPath[i];
      if (firstCell.row > secondCell.row) {
        return 1;
      }
      if (firstCell.row < secondCell.row) {
        return -1;
      }
      if (firstCell.column > secondCell.column) {
        return 1;
      }
      if (firstCell.column < secondCell.column) {
        return -1;
      }
    }
    return 0;
  });
  return paths[0];
};

export default comparePaths;
