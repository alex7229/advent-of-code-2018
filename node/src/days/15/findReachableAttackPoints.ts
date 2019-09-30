import { cloneDeep } from "lodash";
import { Battlefield, Unit } from "./parseBattlefield";
import findAdjustedCells, { Position } from "./findAdjustedCells";
import findAllAttackPoints from "./findAllAttackPoints";

type VisitedMap = boolean[][];
export type FindReachableAttackPoints = (
  battlefield: Battlefield,
  units: ReadonlyArray<Unit>,
  currentUnit: Unit,
  visitedMap?: VisitedMap,
  currentCell?: Position
) => ReadonlyArray<Position>;

const findReachableAttackPoints: FindReachableAttackPoints = (
  battlefield,
  units,
  currentUnit,
  visitedMap,
  currentCell
) => {
  if (!visitedMap || !currentCell) {
    const initialVisitedMap = cloneDeep(battlefield).map(row =>
      row.map(() => false)
    );
    initialVisitedMap[currentUnit.position.row][
      currentUnit.position.column
    ] = true;
    findReachableAttackPoints(
      battlefield,
      units,
      currentUnit,
      initialVisitedMap,
      currentUnit.position
    );
    // this is first invocation of the function
    // at this point visited map is fully marked (what is reachable and what is not)
    // now we need to find all the possible attack points and check if they are reachable
    return findAllAttackPoints(battlefield, units, currentUnit.type).filter(
      attackCell => initialVisitedMap[attackCell.row][attackCell.column]
    );
  }
  findAdjustedCells(battlefield, currentCell, units).forEach(adjustedCell => {
    if (visitedMap[adjustedCell.row][adjustedCell.column]) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    visitedMap[adjustedCell.row][adjustedCell.column] = true;
    findReachableAttackPoints(
      battlefield,
      units,
      currentUnit,
      visitedMap,
      adjustedCell
    );
  });
  return [];
};

export default findReachableAttackPoints;
