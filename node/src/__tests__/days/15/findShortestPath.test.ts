import parseBattlefield from "../../../days/15/parseBattlefield";
import findShortestPaths from "../../../days/15/findShortestPath";

it("should find the shortest paths correctly without any obstacles", () => {
  const input = `...
  ...
  ...`;
  // shortest path
  // ###
  // ..#
  // ..#
  const { battlefield } = parseBattlefield(input);
  const start = { row: 0, column: 0 };
  const end = { row: 2, column: 2 };
  expect(findShortestPaths(start, end, battlefield, [])).toEqual([
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 }
  ]);
});

it("should find the paths for the adjusted cells for all the goblins from the example #1", () => {
  const input = `#######      
  #E..G.#     
  #...#.#  
  #.G.#G#   
  #######`;
  const { battlefield, units } = parseBattlefield(input);
  const start = { row: 1, column: 1 };
  // end point is to the left from the top goblin
  expect(
    findShortestPaths(start, { row: 1, column: 3 }, battlefield, units)
  ).toEqual([start, { row: 1, column: 2 }, { row: 1, column: 3 }]);
  // end point is to the right of the top goblin (unreachable)
  expect(
    findShortestPaths(start, { row: 1, column: 5 }, battlefield, units)
  ).toEqual(null);
  // end point is to the top of the bottom-left goblin
  expect(
    findShortestPaths(start, { row: 2, column: 2 }, battlefield, units)
  ).toEqual([start, { row: 1, column: 2 }, { row: 2, column: 2 }]);
  // end point is to the top of the bottom-right goblin (unreachable)
  expect(
    findShortestPaths(start, { row: 2, column: 5 }, battlefield, units)
  ).toEqual(null);
  // end point is to the left from the bottom-left goblin
  expect(
    findShortestPaths(start, { row: 3, column: 1 }, battlefield, units)
  ).toEqual([start, { row: 2, column: 1 }, { row: 3, column: 1 }]);
  // end point is to the right from the bottom-left goblin
  expect(
    findShortestPaths(start, { row: 3, column: 3 }, battlefield, units)
  ).toEqual([
    start,
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 2, column: 3 },
    { row: 3, column: 3 }
  ]);
});

it.skip("should find the paths for distant points in adequate amount of time", () => {
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
  ####.......E............########
  ####.#..E.G..............#######
  ###########..............#######
  ###########.............E...####
  ##########.................#####
  #########.....................##
  ########.......#.#....E....E..##
  ###########...............E.####
  ##########.....#....#...##.#####
  ################################
`;
  const { battlefield, units } = parseBattlefield(input);
  const path = findShortestPaths(
    { row: 1, column: 10 },
    { row: 1, column: 13 },
    battlefield,
    units
  );
  console.log(path);
});
