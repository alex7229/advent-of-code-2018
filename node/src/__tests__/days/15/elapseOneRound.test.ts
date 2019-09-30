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
  const afterTwoRounds = elapseOneRound(battlefield, afterOneRound);
  // IDs are irrelevant here
  const unitsWithoutId = afterTwoRounds.map(unit => {
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
});

it("should work when there are casualties on the battlefield", () => {
  const battlefield: Battlefield = [["cavern", "cavern", "cavern"]];
  const units: Unit[] = [
    {
      type: "goblin",
      health: 3,
      position: { row: 0, column: 0 },
      id: 12
    },
    {
      type: "goblin",
      health: 2,
      position: { row: 0, column: 1 },
      id: 100
    },
    {
      type: "elf",
      health: 7,
      position: { row: 0, column: 2 },
      id: 7
    }
  ];

  const afterOneRound = elapseOneRound(battlefield, units);
  const afterTwoRounds = elapseOneRound(battlefield, afterOneRound);
  expect(afterTwoRounds).toEqual([
    {
      type: "elf",
      health: 1,
      position: { row: 0, column: 2 },
      id: 7
    }
  ]);
});
