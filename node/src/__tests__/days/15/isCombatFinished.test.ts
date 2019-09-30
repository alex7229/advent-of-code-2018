import { Unit } from "../../../days/15/parseBattlefield";
import isCombatFinished from "../../../days/15/isCombatFinished";

const goblin: Unit = {
  id: 117,
  type: "goblin",
  health: 200,
  position: { row: 0, column: 0 }
};

const elf: Unit = { ...goblin, type: "elf" };

it("combat should be finished if only elves are left", () => {
  const elves = [elf, elf];
  expect(isCombatFinished(elves)).toBe(true);
});

it("combat should be finished if only goblins are left", () => {
  const goblins = [goblin, goblin];
  expect(isCombatFinished(goblins)).toBe(true);
});

it("combat should not be finished if elves and goblins are still fighting", () => {
  const units = [elf, elf, goblin];
  expect(isCombatFinished(units)).toBe(false);
});
