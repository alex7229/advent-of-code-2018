import parseBattlefield from "../../../days/15/parseBattlefield";
import findShortestPath from "../../../days/15/findShortestPath";

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
  expect(findShortestPath(start, [end], battlefield, [])).toEqual([
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
    findShortestPath(start, [{ row: 1, column: 3 }], battlefield, units)
  ).toEqual([start, { row: 1, column: 2 }, { row: 1, column: 3 }]);
  // end point is to the right of the top goblin (unreachable)
  expect(
    findShortestPath(start, [{ row: 1, column: 5 }], battlefield, units)
  ).toEqual(null);
  // end point is to the top of the bottom-left goblin
  expect(
    findShortestPath(start, [{ row: 2, column: 2 }], battlefield, units)
  ).toEqual([start, { row: 1, column: 2 }, { row: 2, column: 2 }]);
  // end point is to the top of the bottom-right goblin (unreachable)
  expect(
    findShortestPath(start, [{ row: 2, column: 5 }], battlefield, units)
  ).toEqual(null);
  // end point is to the left from the bottom-left goblin
  expect(
    findShortestPath(start, [{ row: 3, column: 1 }], battlefield, units)
  ).toEqual([start, { row: 2, column: 1 }, { row: 3, column: 1 }]);
  // end point is to the right from the bottom-left goblin
  expect(
    findShortestPath(start, [{ row: 3, column: 3 }], battlefield, units)
  ).toEqual([
    start,
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 2, column: 3 },
    { row: 3, column: 3 }
  ]);
});

it("should utilize length limit properly", () => {
  // this test ensures that point which is close enough would be found fast enough
  // even though the algo starts looking for the point in the wrong direction
  // length limit 'limits' recursion depth buy ignoring very long paths
  const input = `################################
  #########.G...G.........#....###
  #########.....#####............#
  ########...G.#######.......##..#
  ########....#########...#.####.#
  ######E##G..#########.....#....#
  ######....E.#########....##...##
  ######......#########.....##..##
  ######......#########...########
  #..###.......#######GGGGG#######
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
  expect(
    findShortestPath(
      { row: 1, column: 10 },
      [{ row: 1, column: 13 }],
      battlefield,
      units,
      undefined,
      undefined,
      10
    )
  ).toEqual([
    { row: 1, column: 10 },
    { row: 1, column: 11 },
    { row: 1, column: 12 },
    { row: 1, column: 13 }
  ]);
});

it("should find the shortest path to one of the multiple destinations", () => {
  const input = ` ######
  #....#
  #....#
  #....#
  ######`;
  const { battlefield, units } = parseBattlefield(input);
  expect(
    findShortestPath(
      { row: 1, column: 1 },
      [{ row: 3, column: 4 }, { row: 3, column: 3 }],
      battlefield,
      units
    )
  ).toEqual([
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 2, column: 3 },
    { row: 3, column: 3 }
  ]);
});

it("should find the closest point behind the wall instead of further point that is in clear view", () => {
  const input = `##################
  #..E...#.........#
  #.......#G.......#
  #........#.......#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #................#
  #........G.......#
  ##################`;
  const { battlefield, units } = parseBattlefield(input);
  // first point is to the top of the bottom goblin
  // second point is to the right of the top goblin (closer even behind the wall)
  expect(
    findShortestPath(
      { row: 1, column: 3 },
      [{ row: 14, column: 9 }, { row: 2, column: 10 }],
      battlefield,
      units
    )
  ).toEqual([
    { row: 1, column: 3 },
    { row: 1, column: 4 },
    { row: 1, column: 5 },
    { row: 1, column: 6 },
    { row: 2, column: 6 },
    { row: 2, column: 7 },
    { row: 3, column: 7 },
    { row: 3, column: 8 },
    { row: 4, column: 8 },
    { row: 4, column: 9 },
    { row: 4, column: 10 },
    { row: 3, column: 10 },
    { row: 2, column: 10 }
  ]);
});

it("should find far away cell immediately", () => {
  // this test checks performance
  const input = `################################
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  #..............................#
  ################################`;
  const { battlefield, units } = parseBattlefield(input);
  const path = findShortestPath(
    { row: 1, column: 1 },
    [{ row: 15, column: 15 }],
    battlefield,
    units
  );
  if (!path) {
    throw new Error("path should be found here");
  }
  expect(path[0]).toEqual({ row: 1, column: 1 });
  expect(path[path.length - 1]).toEqual({ row: 15, column: 15 });
  expect(path.length).toBe(29);
});
