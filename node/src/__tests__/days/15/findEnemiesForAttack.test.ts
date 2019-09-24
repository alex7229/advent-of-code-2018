import findEnemiesForAttack from "../../../days/15/findEnemiesForAttack";
import { Unit } from "../../../days/15/parseBattlefield";

const currentUnit: Unit = {
  id: 5,
  type: "elf",
  health: 152,
  position: {
    row: 2,
    column: 2
  }
};

it("should return null if there are no units around", () => {
  expect(findEnemiesForAttack(currentUnit, [currentUnit])).toEqual([]);
  const farAwayUnit: Unit = {
    id: 12,
    type: "goblin",
    health: 23,
    position: {
      row: 12,
      column: 12
    }
  };
  expect(findEnemiesForAttack(currentUnit, [currentUnit, farAwayUnit])).toEqual(
    []
  );
});

it("should not return allies if they are nearby", () => {
  const topAlly: Unit = {
    id: 12,
    type: currentUnit.type,
    health: 232,
    position: {
      row: currentUnit.position.row - 1,
      column: currentUnit.position.column
    }
  };
  const leftAlly: Unit = {
    id: 11,
    type: currentUnit.type,
    health: 21,
    position: {
      row: currentUnit.position.row,
      column: currentUnit.position.column - 1
    }
  };
  expect(
    findEnemiesForAttack(currentUnit, [currentUnit, topAlly, leftAlly])
  ).toEqual([]);
});

it("should only return enemies that are adjusted to the current unit", () => {
  const topEnemy: Unit = {
    id: 25,
    type: "goblin",
    health: 114,
    position: {
      row: currentUnit.position.row - 1,
      column: currentUnit.position.column
    }
  };
  const leftEnemy: Unit = {
    id: 55,
    type: "goblin",
    health: 232,
    position: {
      row: currentUnit.position.row,
      column: currentUnit.position.column - 1
    }
  };
  const rightEnemy: Unit = {
    id: 15,
    type: "goblin",
    health: 232,
    position: {
      row: currentUnit.position.row,
      column: currentUnit.position.column + 1
    }
  };
  const bottomEnemy: Unit = {
    id: 115,
    type: "goblin",
    health: 116,
    position: {
      row: currentUnit.position.row + 1,
      column: currentUnit.position.column
    }
  };
  const farAwayEnemy: Unit = {
    id: 124,
    type: "goblin",
    health: 111,
    position: {
      row: 10,
      column: 16
    }
  };
  expect(
    findEnemiesForAttack(currentUnit, [
      currentUnit,
      leftEnemy,
      topEnemy,
      rightEnemy,
      bottomEnemy,
      farAwayEnemy
    ])
  ).toEqual([leftEnemy, topEnemy, rightEnemy, bottomEnemy]);
});
