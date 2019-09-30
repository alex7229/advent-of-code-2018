import { Unit } from "../../../days/15/parseBattlefield";
import sortUnits from "../../../days/15/sortUnits";

it("should sort all units according to the game order", () => {
  const firstElf: Unit = {
    id: 15,
    type: "elf",
    health: 12,
    position: { row: 1, column: 4 }
  };
  const secondElf: Unit = {
    id: 12,
    type: "elf",
    health: 20,
    position: { row: 2, column: 5 }
  };
  const firstGoblin: Unit = {
    id: 115,
    type: "goblin",
    health: 112,
    position: { row: 1, column: 1 }
  };
  const secondGoblin: Unit = {
    id: 151,
    type: "goblin",
    health: 120,
    position: { row: 2, column: 3 }
  };
  const unsorted = [firstElf, secondElf, secondGoblin, firstGoblin];
  const sorted = [firstGoblin, firstElf, secondGoblin, secondElf];
  expect(sortUnits(unsorted)).toEqual(sorted);
  expect(sortUnits(sorted)).toEqual(sorted);
});
