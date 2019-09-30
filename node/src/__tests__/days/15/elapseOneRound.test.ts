import { cloneDeep } from "lodash";
import parseBattlefield, {
  Battlefield,
  Unit
} from "../../../days/15/parseBattlefield";
import elapseOneRound from "../../../days/15/elapseOneRound";

it("should work with real examples", () => {
  const input = `#######   
  #.G...# 
  #...EG# 
  #.#.#G#  
  #..G#E# 
  #.....#   
  #######`;
  const { units, battlefield } = parseBattlefield(input);
  const afterOneRound = elapseOneRound(battlefield, units);
  const afterTwoRounds = elapseOneRound(battlefield, afterOneRound.units);
  // IDs are irrelevant here
  const unitsWithoutId = afterTwoRounds.units.map(unit => {
    const unitCopy = cloneDeep(unit);
    // @ts-ignore
    delete unitCopy.id;
    return unitCopy;
  });
  expect(unitsWithoutId).toEqual([
    {
      type: "goblin",
      health: 200,
      position: { row: 1, column: 4 }
    },
    {
      type: "elf",
      health: 188,
      position: { row: 2, column: 4 }
    },
    {
      type: "goblin",
      health: 194,
      position: { row: 2, column: 5 }
    },
    {
      type: "goblin",
      health: 200,
      position: { row: 2, column: 3 }
    },
    {
      type: "goblin",
      health: 194,
      position: { row: 3, column: 5 }
    },
    {
      type: "elf",
      health: 194,
      position: { row: 4, column: 5 }
    }
  ]);
  expect(afterOneRound.wasRoundCompletelyCompleted).toBe(true);
  expect(afterTwoRounds.wasRoundCompletelyCompleted).toBe(true);
});

it("should work when there are casualties on the battlefield", () => {
  const battlefield: Battlefield = [["cavern", "cavern", "cavern"]];
  const units: Unit[] = [
    {
      type: "goblin",
      health: 200,
      position: { row: 0, column: 0 },
      id: 12
    },
    {
      type: "elf",
      health: 2,
      position: { row: 0, column: 1 },
      id: 100
    },
    {
      type: "goblin",
      health: 200,
      position: { row: 0, column: 2 },
      id: 7
    },
    {
      type: "elf",
      health: 4,
      position: { row: 0, column: 3 },
      id: 71
    }
  ];

  const result = elapseOneRound(battlefield, units);
  expect(result.units).toEqual([
    {
      type: "goblin",
      health: 200,
      position: { row: 0, column: 0 },
      id: 12
    },
    {
      type: "goblin",
      health: 197,
      position: { row: 0, column: 2 },
      id: 7
    },
    {
      type: "elf",
      health: 1,
      position: { row: 0, column: 3 },
      id: 71
    }
  ]);
  expect(result.wasRoundCompletelyCompleted).toBe(true);
});

it("round should end immediately if there are no enemies left", () => {
  const battlefield: Battlefield = [["cavern", "cavern"]];
  const units: Unit[] = [
    { type: "goblin", id: 15, health: 10, position: { row: 0, column: 0 } },
    {
      type: "elf",
      id: 10,
      health: 1,
      position: { row: 0, column: 1 }
    }
  ];
  const result = elapseOneRound(battlefield, units);
  expect(result.wasRoundCompletelyCompleted).toBe(false);
  expect(result.units).toEqual([
    { type: "goblin", id: 15, health: 10, position: { row: 0, column: 0 } }
  ]);
});

it("round should not start if there are no enemies left", () => {
  const battlefield: Battlefield = [["cavern", "cavern"]];
  const units: Unit[] = [
    { type: "goblin", id: 15, health: 10, position: { row: 0, column: 0 } },
    {
      type: "goblin",
      id: 10,
      health: 1,
      position: { row: 0, column: 1 }
    }
  ];
  const result = elapseOneRound(battlefield, units);
  expect(result.wasRoundCompletelyCompleted).toBe(false);
  expect(result.units).toEqual(units);
});
