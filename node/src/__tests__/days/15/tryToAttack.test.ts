import { cloneDeep } from "lodash";
import { Unit } from "../../../days/15/parseBattlefield";
import { tryToAttackFactory } from "../../../days/15/tryToAttack";

const defaultUnit: Unit = {
  type: "goblin",
  id: 117,
  health: 200,
  position: { row: 10, column: 10 }
};

const defaultFunctions = {
  findEnemiesForAttack: jest.fn().mockReturnValue([cloneDeep(defaultUnit)]),
  sortEnemiesForAttack: jest.fn().mockReturnValue([cloneDeep(defaultUnit)])
};

it("should not attack anything if there are no enemies around", () => {
  const currentUnit = cloneDeep(defaultUnit);
  const findEnemiesForAttackMock = jest.fn().mockReturnValue([]);
  expect(
    tryToAttackFactory({
      ...defaultFunctions,
      findEnemiesForAttack: findEnemiesForAttackMock
    })(currentUnit, [currentUnit])
  ).toEqual([currentUnit]);
  expect(findEnemiesForAttackMock.mock.calls.length).toBe(1);
});

it("should attack the proper enemy", () => {
  const highHpEnemy: Unit = {
    id: 20,
    health: 180,
    type: "elf",
    position: { row: 9, column: 10 }
  };
  const lowHpEnemy: Unit = {
    id: 21,
    health: 100,
    type: "elf",
    position: { row: 11, column: 10 }
  };
  const lowHpEnemyHit: Unit = {
    ...cloneDeep(lowHpEnemy),
    health: lowHpEnemy.health - 3
  };
  const currentUnit = cloneDeep(defaultUnit);
  const findEnemiesForAttackMock = jest
    .fn()
    .mockReturnValue([highHpEnemy, lowHpEnemy]);
  const sortEnemiesMock = jest.fn().mockReturnValue([lowHpEnemy, highHpEnemy]);
  expect(
    tryToAttackFactory({
      ...defaultFunctions,
      findEnemiesForAttack: findEnemiesForAttackMock,
      sortEnemiesForAttack: sortEnemiesMock
    })(defaultUnit, [currentUnit, highHpEnemy, lowHpEnemy])
  ).toEqual([currentUnit, highHpEnemy, lowHpEnemyHit]);
});
