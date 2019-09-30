import { Unit } from "./parseBattlefield";

type CalculateCombatScore = (
  units: ReadonlyArray<Unit>,
  rounds: number
) => number;

const calculateCombatScore: CalculateCombatScore = (units, rounds) =>
  units.reduce(
    (totalHealth, currentUnit) => totalHealth + currentUnit.health,
    0
  ) * rounds;

export default calculateCombatScore;
