import parseBattlefield from "../../../days/15/parseBattlefield";
import findAllAttackPoints from "../../../days/15/findAllAttackPoints";

it("should find all attack points from the example", () => {
  const input = `#######      
    #E..G.#     
    #...#.# 
    #.G.#G#    
    #######`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findAllAttackPoints(battlefield, units, units[0])).toEqual([
    { row: 1, column: 3 },
    { row: 1, column: 5 },
    { row: 2, column: 2 },
    { row: 3, column: 1 },
    { row: 3, column: 3 },
    { row: 2, column: 5 }
  ]);
});

it("should not find duplicate attack points", () => {
  const input = `....
    E...
    .G.G`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findAllAttackPoints(battlefield, units, units[0])).toEqual([
    { row: 1, column: 1 },
    { row: 2, column: 0 },
    { row: 2, column: 2 },
    { row: 1, column: 3 }
  ]);
});
