import findMinimumTeoriticalPathLength from "../../../days/15/findMinimumTeoriticalPathLength";

it("should properly calculate teoritical minimum path length if destination is one cell", () => {
  expect(
    findMinimumTeoriticalPathLength(10, { row: 0, column: 0 }, [
      { row: 5, column: 15 }
    ])
  ).toEqual(30);
});

it("should properly find optimistic path length for multiple destionations", () => {
  expect(
    findMinimumTeoriticalPathLength(30, { row: 10, column: 10 }, [
      { row: 100, column: 20 },
      { row: 3, column: 18 },
      { row: 30, column: 10 }
    ])
  ).toEqual(45);
});
