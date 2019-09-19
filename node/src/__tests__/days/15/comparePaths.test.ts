import comparePaths from "../../../days/15/comparePaths";

it("should throw if there are no paths passed", () => {
  expect(() => comparePaths([])).toThrow();
});

it("should return path if it is only one in the array", () => {
  const path = [{ row: 2, column: 2 }, { row: 3, column: 4 }];
  expect(comparePaths([path])).toEqual(path);
});

it("should return the shortest path", () => {
  const shortPath = [{ row: 1, column: 2 }];
  const longerPath = [{ row: 1, column: 2 }, { row: 4, column: 4 }];
  expect(comparePaths([longerPath, shortPath])).toEqual(shortPath);
});

it("should return the shortest path by order if paths are the same length", () => {
  // straight path       curvy path
  //       ###              ##
  //         #               ##
  const straightPath = [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 2, column: 2 }
  ];
  const curvyPath = [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
    { row: 2, column: 2 }
  ];

  expect(comparePaths([curvyPath, straightPath])).toEqual(straightPath);
  // left path       right path
  //    ##               ##
  //    #                 #
  //    ##               ##
  //     #               #
  const leftPath = [
    { row: 3, column: 1 },
    { row: 2, column: 1 },
    { row: 2, column: 0 },
    { row: 1, column: 0 },
    { row: 0, column: 0 },
    { row: 0, column: 1 }
  ];
  const rightPath = [
    { row: 3, column: 1 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
    { row: 1, column: 2 },
    { row: 0, column: 2 },
    { row: 0, column: 1 }
  ];
  expect(comparePaths([rightPath, leftPath])).toEqual(leftPath);
});

it("should return correct path if number is paths is bigger than 2", () => {
  const position = { row: 0, column: 0 };
  const shortestPath = [position];
  const secondShortestPath = [position, position];
  const secondLongestPath = [position, position, position];
  const longestPath = [position, position, position, position];
  expect(
    comparePaths([
      secondLongestPath,
      longestPath,
      shortestPath,
      secondShortestPath
    ])
  ).toEqual(shortestPath);
});
