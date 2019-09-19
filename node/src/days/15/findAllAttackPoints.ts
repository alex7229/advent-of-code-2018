import { uniqBy } from "lodash";
import { Battlefield, Unit } from "./parseBattlefield";
import findAdjustedCells, { Position } from "./findAdjustedCells";

type FindAllAttackPoints = (
  battlefield: Battlefield,
  units: Unit[],
  currentUnit: Unit
) => Position[];

const findAllAttackPoints: FindAllAttackPoints = (
  battlefield,
  units,
  currentUnit
) => {
  const enemies = units.filter(unit => {
    if (currentUnit.type === "goblin") {
      return unit.type === "elf";
    }
    return unit.type === "goblin";
  });
  const adjustedCells = enemies.map(enemy =>
    findAdjustedCells(battlefield, enemy.position, units)
  );
  const allFoundCells = adjustedCells.reduce(
    (allCells, currentCells) => allCells.concat(currentCells),
    []
  );
  return uniqBy(allFoundCells, cell => `${cell.row}-${cell.column}`);
};

export default findAllAttackPoints;
