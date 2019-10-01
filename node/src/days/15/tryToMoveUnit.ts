import { Unit, Battlefield } from "./parseBattlefield";
import findEnemiesForAttack, {
  FindEnemiesForAttack
} from "./findEnemiesForAttack";
import findShortestPath, { FindShortestPath } from "./findShortestPath";
import findReachableAttackPoints, {
  FindReachableAttackPoints
} from "./findReachableAttackPoints";

interface Dependencies {
  readonly findEnemiesForAttack: FindEnemiesForAttack;
  readonly findReachableAttackPoints: FindReachableAttackPoints;
  readonly findShortestPath: FindShortestPath;
}
type TryToMoveUnit = (
  unit: Unit,
  units: ReadonlyArray<Unit>,
  battlefield: Battlefield
) => ReadonlyArray<Unit>;
type TryToMoveUnitFactory = (dependencies: Dependencies) => TryToMoveUnit;

export const tryToMoveUnitFactory: TryToMoveUnitFactory = dependencies => (
  unit,
  units,
  battlefield
) => {
  if (dependencies.findEnemiesForAttack(unit, units).length > 0) {
    return units;
  }
  const reachableAttackPoints = dependencies.findReachableAttackPoints(
    battlefield,
    units,
    unit
  );
  if (reachableAttackPoints.length === 0) {
    return units;
  }
  const shortestPath = dependencies.findShortestPath(
    unit.position,
    reachableAttackPoints,
    battlefield,
    units
  );
  if (!shortestPath || shortestPath.length < 2) {
    throw new Error("something went wrong. Cannot find the shortest path");
  }
  return units.map(currentUnit => {
    if (unit.id !== currentUnit.id) {
      return currentUnit;
    }
    return { ...currentUnit, position: shortestPath[1] };
  });
};

export default tryToMoveUnitFactory({
  findEnemiesForAttack,
  findShortestPath,
  findReachableAttackPoints
});
