import { Unit, Battlefield } from "./parseBattlefield";
import findEnemiesForAttack, {
  FindEnemiesForAttack
} from "./findEnemiesForAttack";
import findAllAttackPoints, {
  FindAllAttackPoints
} from "./findAllAttackPoints";
import findShortestPath, { FindShortestPath } from "./findShortestPath";

interface Dependencies {
  readonly findEnemiesForAttack: FindEnemiesForAttack;
  readonly findAllAttackPoints: FindAllAttackPoints;
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
  const attackPoints = dependencies.findAllAttackPoints(
    battlefield,
    units,
    unit.type
  );
  if (attackPoints.length === 0) {
    return units;
  }
  const shortestPath = dependencies.findShortestPath(
    unit.position,
    attackPoints,
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
  findAllAttackPoints,
  findShortestPath
});
