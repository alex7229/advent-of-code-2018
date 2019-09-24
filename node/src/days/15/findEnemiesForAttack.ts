import { Unit } from "./parseBattlefield";

type FindEnemiesForAttack = (
  currentUnit: Unit,
  units: ReadonlyArray<Unit>
) => ReadonlyArray<Unit>;

const findEnemiesForAttack: FindEnemiesForAttack = (currentUnit, units) =>
  units.filter(unit => {
    if (unit.type === currentUnit.type) {
      return false;
    }

    const isTopUnit =
      unit.position.row === currentUnit.position.row - 1 &&
      unit.position.column === currentUnit.position.column;
    const isBottomUnit =
      unit.position.row === currentUnit.position.row + 1 &&
      unit.position.column === currentUnit.position.column;
    const isLeftUnit =
      unit.position.row === currentUnit.position.row &&
      unit.position.column === currentUnit.position.column - 1;
    const isRightUnit =
      unit.position.row === currentUnit.position.row &&
      unit.position.column === currentUnit.position.column + 1;

    return isTopUnit || isBottomUnit || isLeftUnit || isRightUnit;
  });

export default findEnemiesForAttack;
