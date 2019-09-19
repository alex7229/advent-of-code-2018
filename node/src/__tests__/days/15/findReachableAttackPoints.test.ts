import parseBattlefield from "../../../days/15/parseBattlefield";
import findReachableAttackPoints from "../../../days/15/findReachableAttackPoints";

it("should return nothing if battlefield is empty", () => {
  const input = `G.\n..`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findReachableAttackPoints(battlefield, units, units[0])).toEqual([]);
});

it("should return nothing if everything is unrechable", () => {
  expect(
    findReachableAttackPoints(
      [["cavern"]],
      [{ type: "goblin", health: 200, position: { row: 0, column: 0 } }],
      { type: "goblin", health: 200, position: { row: 0, column: 0 } }
    )
  ).toEqual([]);
  const input = `##\n#G`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findReachableAttackPoints(battlefield, units, units[0])).toEqual([]);
});

it("should return all adjusted attack points if multiple enemies closer together", () => {
  const input = `######
  #.GG.#
  #....#
  #..E.#
  ######`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findReachableAttackPoints(battlefield, units, units[2])).toEqual([
    { row: 2, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 3 },
    { row: 1, column: 4 }
  ]);
});

it("should return nothing if only allies are reachable", () => {
  const input = `#####
  #.E.#
  ###G#
  #G..#
  #####`;
  const { battlefield, units } = parseBattlefield(input);
  expect(findReachableAttackPoints(battlefield, units, units[2])).toEqual([]);
});

it("should return only enemies that are reachable", () => {
  const input = `######
  #.G..#
  #GEEE#
  #..E.#
  ######`;
  const { battlefield, units } = parseBattlefield(input);
  expect(
    findReachableAttackPoints(battlefield, units, units[units.length - 1])
  ).toEqual([{ row: 3, column: 1 }]);
});

it("should find all the enemies attacks on the big map", () => {
  const input = `################################
  #########.G...G.........#....###
  #########.....#####............#
  ########...G.#######.......##..#
  ########....#########...#.####.#
  ######E#.G..#########.....#....#
  ######....E.#########....##...##
  ######......#########.....##..##
  ######......#########...########
  #..###.......#######.....#######
  #..G##.G......#####..G...#######
  #.........#..E...........#######
  ####.......E#...........########
  ####.#..E.G..............#######
  ###########..............#######
  ###########.............E...####
  ##########.................#####
  #########.....................##
  ########.......#.#....E....E..##
  ###########...............E.####
  ##########.....#....#...##.#####
  ################################`;
  const { battlefield, units } = parseBattlefield(input);
  expect(
    findReachableAttackPoints(battlefield, units, units[units.length - 1])
  ).toEqual([
    { row: 1, column: 15 },
    { row: 9, column: 21 },
    { row: 11, column: 21 },
    { row: 10, column: 20 },
    { row: 10, column: 22 },
    { row: 13, column: 11 }
  ]);
});
