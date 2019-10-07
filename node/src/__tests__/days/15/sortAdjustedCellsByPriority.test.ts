import sortAdjustedCellsByPriority from "../../../days/15/sortAdjustedCellsByPriority";

it("should throw if adjusted cells array is empty", () => {
  expect(() => sortAdjustedCellsByPriority([])).toThrow();
});

it("should sort by the game rules", () => {
  const adjustedCells = [
    { row: 1, column: 2 },
    { row: 3, column: 2 },
    { row: 2, column: 3 },
    { row: 2, column: 1 }
  ];
  expect(sortAdjustedCellsByPriority(adjustedCells)).toEqual([
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: 3 },
    { row: 3, column: 2 }
  ]);
});
