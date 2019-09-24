import { Unit } from "../../../days/15/parseBattlefield";
import sortEnemiesForAttack from "../../../days/15/sortEnemiesForAttack";

const defaultPosition = { row: 2, column: 2 };
const generateUnit = (hp = 200, position = defaultPosition): Unit => ({
  type: "goblin",
  id: 12,
  health: hp,
  position
});

it("should place enemies in health increasing order", () => {
  const highHpEnemy = generateUnit(250);
  const mediumHpEnemy = generateUnit(120);
  const lowHpEnemy = generateUnit(90);
  const sortedEnemies = sortEnemiesForAttack([
    mediumHpEnemy,
    highHpEnemy,
    lowHpEnemy
  ]);
  expect(sortedEnemies[0].health).toBe(90);
  expect(sortedEnemies[1].health).toBe(120);
  expect(sortedEnemies[2].health).toBe(250);
});

it("should sort enemies by position with the same hp", () => {
  const topEnemy = generateUnit(150, { row: 10, column: 10 });
  const leftEnemy = generateUnit(150, { row: 11, column: 9 });
  const rightEnemy = generateUnit(150, { row: 11, column: 11 });
  const bottomEnemy = generateUnit(150, { row: 12, column: 10 });
  const sortedEnemies = sortEnemiesForAttack([
    rightEnemy,
    leftEnemy,
    topEnemy,
    bottomEnemy
  ]);
  expect(sortedEnemies[0].position).toEqual({ row: 10, column: 10 });
  expect(sortedEnemies[1].position).toEqual({ row: 11, column: 9 });
  expect(sortedEnemies[2].position).toEqual({ row: 11, column: 11 });
  expect(sortedEnemies[3].position).toEqual({ row: 12, column: 10 });
});

it("should sort by HP first, and then by position", () => {
  const topHighHealthEnemy = generateUnit(200, { row: 20, column: 20 });
  const rightLowHealthEnemy = generateUnit(100, { row: 21, column: 21 });
  const bottomLowHealthEnemy = generateUnit(100, { row: 22, column: 20 });
  const sortedEnemies = sortEnemiesForAttack([
    topHighHealthEnemy,
    bottomLowHealthEnemy,
    rightLowHealthEnemy
  ]);
  expect(sortedEnemies[0].position).toEqual({ row: 21, column: 21 });
  expect(sortedEnemies[1].position).toEqual({ row: 22, column: 20 });
  expect(sortedEnemies[2].health).toEqual(200);
});
