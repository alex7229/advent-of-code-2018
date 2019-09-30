import { Unit } from "../../../days/15/parseBattlefield";
import calculateCombatScore from "../../../days/15/calculateCombatScore";

it("should calculate the score properly", () => {
  const defaultUnit: Unit = {
    type: "goblin",
    health: 200,
    position: { row: 0, column: 0 },
    id: 0
  };
  const units: Unit[] = [
    { ...defaultUnit, health: 200 },
    {
      ...defaultUnit,
      health: 131
    },
    { ...defaultUnit, health: 59 },
    { ...defaultUnit, health: 200 }
  ];
  expect(calculateCombatScore(units, 47)).toBe(27730);
});
