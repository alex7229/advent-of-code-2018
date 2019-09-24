import findEnemiesForAttack, {
  FindEnemiesForAttack
} from "./findEnemiesForAttack";
import sortEnemiesForAttack, {
  SortEnemiesForAttack
} from "./sortEnemiesForAttack";
import { Unit } from "./parseBattlefield";

interface Dependencies {
  readonly findEnemiesForAttack: FindEnemiesForAttack;
  readonly sortEnemiesForAttack: SortEnemiesForAttack;
}
type TryToAttack = (
  unit: Unit,
  units: ReadonlyArray<Unit>
) => ReadonlyArray<Unit>;
type TryToAttackFactory = (dependencies: Dependencies) => TryToAttack;

export const tryToAttackFactory: TryToAttackFactory = dependencies => (
  unit,
  units
) => {
  const enemiesAround = dependencies.findEnemiesForAttack(unit, units);
  if (enemiesAround.length === 0) {
    return units;
  }
  const sortedEnemies = dependencies.sortEnemiesForAttack(enemiesAround);
  return units.map(currentUnit => {
    if (currentUnit.id !== sortedEnemies[0].id) {
      return currentUnit;
    }
    return { ...currentUnit, health: currentUnit.health - 3 };
  });
};

export default tryToAttackFactory({
  findEnemiesForAttack,
  sortEnemiesForAttack
});
