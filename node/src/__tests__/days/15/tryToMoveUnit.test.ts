import { cloneDeep } from "lodash";
import parseBattlefield, { Unit } from "../../../days/15/parseBattlefield";
import tryToMoveUnit, {
  tryToMoveUnitFactory
} from "../../../days/15/tryToMoveUnit";

const defaultFunctions = {
  findEnemiesForAttack: jest.fn().mockReturnValue([]),
  findAllAttackPoints: jest.fn().mockReturnValue([{ row: 20, column: 17 }]),
  findShortestPath: jest
    .fn()
    .mockReturnValue([{ row: 10, column: 10 }, { row: 10, column: 11 }])
};

const defaultUnit: Unit = {
  type: "goblin",
  id: 1,
  health: 200,
  position: { row: 0, column: 0 }
};

it("should not move if there are enemies nearby", () => {
  const currentUnit = cloneDeep(defaultUnit);
  const findEnemiesMock = jest.fn().mockReturnValue([
    {
      type: "elf",
      id: 22,
      health: 150,
      position: { row: 1, column: 1 }
    }
  ]);
  const findAllAttackPointsMock = jest.fn();
  expect(
    tryToMoveUnitFactory({
      ...defaultFunctions,
      findEnemiesForAttack: findEnemiesMock,
      findAllAttackPoints: findAllAttackPointsMock
    })(currentUnit, [currentUnit], [])
  ).toEqual([currentUnit]);
  expect(findEnemiesMock.mock.calls.length).toBe(1);
  expect(findAllAttackPointsMock.mock.calls.length).toBe(0);
});

it("should not move if there are no reachable attack points of any enemy", () => {
  const currentUnit = cloneDeep(defaultUnit);
  const findAttackPointsMock = jest.fn().mockReturnValue([]);
  expect(
    tryToMoveUnitFactory({
      ...defaultFunctions,
      findAllAttackPoints: findAttackPointsMock
    })(currentUnit, [currentUnit], [])
  ).toEqual([currentUnit]);
  expect(findAttackPointsMock.mock.calls.length).toBe(1);
});

it("unit should move according to the sortest path", () => {
  const currentUnit = cloneDeep(defaultUnit);
  const randomGoblin: Unit = {
    id: 20,
    type: "goblin",
    health: 100,
    position: { row: 0, column: 0 }
  };
  const randomElf: Unit = {
    id: 50,
    type: "elf",
    health: 250,
    position: { row: 15, column: 17 }
  };
  const availableAttackPoint = { row: 20, column: 20 };
  const intermediatePathPoint = { row: 5, column: 5 };
  const unitAfterMove = { ...currentUnit, position: intermediatePathPoint };
  const findAllAttackPointsMock = jest
    .fn()
    .mockReturnValue([availableAttackPoint]);
  const findShortestPathMock = jest
    .fn()
    .mockReturnValue([
      currentUnit.position,
      intermediatePathPoint,
      availableAttackPoint
    ]);
  expect(
    tryToMoveUnitFactory({
      ...defaultFunctions,
      findShortestPath: findShortestPathMock,
      findAllAttackPoints: findAllAttackPointsMock
    })(currentUnit, [randomElf, randomGoblin, currentUnit], [])
  ).toEqual([randomElf, randomGoblin, unitAfterMove]);
  expect(findShortestPathMock.mock.calls.length).toBe(1);
});

it("should throw if shortest path is null", () => {
  const findShortestPathMock = jest.fn().mockReturnValue(null);
  const currentUnit = cloneDeep(defaultUnit);
  expect(() =>
    tryToMoveUnitFactory({
      ...defaultFunctions,
      findShortestPath: findShortestPathMock
    })(currentUnit, [currentUnit], [])
  ).toThrow();
});

it("should throw if shortest path is one point long", () => {
  const findShortestPathMock = jest
    .fn()
    .mockReturnValue([{ row: 20, column: 20 }]);
  const currentUnit = cloneDeep(defaultUnit);
  expect(() =>
    tryToMoveUnitFactory({
      ...defaultFunctions,
      findShortestPath: findShortestPathMock
    })(currentUnit, [currentUnit], [])
  ).toThrow();
});

it("should move the units properly according to the example", () => {
  const input = `#########
    #G..G..G#
    #.......#
    #.......#
    #G..E..G#
    #.......#
    #.......#
    #G..G..G#
    #########`;
  const { battlefield, units } = parseBattlefield(input);
  const afterFirstGoblinMovement = tryToMoveUnit(units[0], units, battlefield);
  const afterSecondGoblinMovement = tryToMoveUnit(
    afterFirstGoblinMovement[1],
    afterFirstGoblinMovement,
    battlefield
  );
  const afterThirdGoblinMovement = tryToMoveUnit(
    afterSecondGoblinMovement[2],
    afterSecondGoblinMovement,
    battlefield
  );
  const afterFourthGoblinMovement = tryToMoveUnit(
    afterThirdGoblinMovement[3],
    afterThirdGoblinMovement,
    battlefield
  );
  const afterElfMovement = tryToMoveUnit(
    afterFourthGoblinMovement[4],
    afterFourthGoblinMovement,
    battlefield
  );

  const afterFifthGoblinMovement = tryToMoveUnit(
    afterElfMovement[5],
    afterElfMovement,
    battlefield
  );
  const afterSixthGoblinMovement = tryToMoveUnit(
    afterFifthGoblinMovement[6],
    afterFifthGoblinMovement,
    battlefield
  );
  const afterSeventhGoblinMovement = tryToMoveUnit(
    afterSixthGoblinMovement[7],
    afterSixthGoblinMovement,
    battlefield
  );
  const afterEighthGoblinMovement = tryToMoveUnit(
    afterSeventhGoblinMovement[8],
    afterSeventhGoblinMovement,
    battlefield
  );
  const resultPoisitions = afterEighthGoblinMovement.map(unit => unit.position);
  expect(resultPoisitions).toEqual([
    { row: 1, column: 2 },
    { row: 2, column: 4 },
    { row: 1, column: 6 },
    { row: 4, column: 2 },
    { row: 3, column: 4 },
    { row: 3, column: 7 },
    { row: 6, column: 1 },
    { row: 6, column: 4 },
    { row: 6, column: 7 }
  ]);
});
