import sortAdjustedCellsByPriority from "../../../days/15/sortAdjustedCellsByPriority";

it("should throw if either adjusted cells array or destinations cells array is empty", () => {
  expect(() => sortAdjustedCellsByPriority([], [])).toThrow();
  expect(() =>
    sortAdjustedCellsByPriority([{ row: 0, column: 0 }], [])
  ).toThrow();
  expect(() =>
    sortAdjustedCellsByPriority([], [{ row: 0, column: 0 }])
  ).toThrow();
});

it("should sort the cells properly", () => {
  const adjustedCells = [
    { row: 0, column: 1 },
    { row: 2, column: 2 },
    { row: 1, column: 0 },
    { row: 1, column: 2 }
  ];
  const destinationCells = [{ row: 0, column: 20 }, { row: 2, column: 10 }];
  // given the fact that adjusted cells are close to each other
  // only first cell is used to find the closest destination cell for performance sake
  // with cells, that are far away, this function would not work

  // in this example second point {row: 2, column: 10} is the closest one
  // and adjusted cells are sorted by the distance to that destination cell
  expect(sortAdjustedCellsByPriority(adjustedCells, destinationCells)).toEqual([
    { row: 2, column: 2 },
    { row: 1, column: 2 },
    { row: 0, column: 1 },
    { row: 1, column: 0 }
  ]);
});

it("same distance cells should sort by the game rules", () => {
  const adjustedCells = [
    { row: 1, column: 2 },
    { row: 3, column: 2 },
    { row: 2, column: 3 },
    { row: 2, column: 1 }
  ];
  const destinationCells = [{ row: 2, column: 2 }];
  expect(sortAdjustedCellsByPriority(adjustedCells, destinationCells)).toEqual([
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: 3 },
    { row: 3, column: 2 }
  ]);
});
