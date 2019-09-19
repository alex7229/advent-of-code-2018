import parseBattlefield from "../../../days/15/parseBattlefield";
import findAdjustedCells from "../../../days/15/findAdjustedCells";

it("should return all adjusted empty cells", () => {
  const field = "...\n...\n...";
  const { battlefield } = parseBattlefield(field);
  expect(findAdjustedCells(battlefield, { row: 1, column: 1 }, [])).toEqual([
    { row: 0, column: 1 },
    { row: 2, column: 1 },
    { row: 1, column: 0 },
    { row: 1, column: 2 }
  ]);
});

it("should return only cells that are on the battlefield", () => {
  const field = `..\n..`;
  const { battlefield } = parseBattlefield(field);
  expect(findAdjustedCells(battlefield, { row: 0, column: 0 }, [])).toEqual([
    { row: 1, column: 0 },
    { row: 0, column: 1 }
  ]);
  expect(findAdjustedCells(battlefield, { row: 0, column: 1 }, [])).toEqual([
    { row: 1, column: 1 },
    { row: 0, column: 0 }
  ]);
  expect(findAdjustedCells(battlefield, { row: 1, column: 0 }, [])).toEqual([
    { row: 0, column: 0 },
    { row: 1, column: 1 }
  ]);
  expect(findAdjustedCells(battlefield, { row: 1, column: 1 }, [])).toEqual([
    { row: 0, column: 1 },
    { row: 1, column: 0 }
  ]);
});

it("should return only cells that are not walls", () => {
  const field = `.#.
    #.#
    ...`;
  const { battlefield } = parseBattlefield(field);
  expect(findAdjustedCells(battlefield, { row: 1, column: 1 }, [])).toEqual([
    { row: 2, column: 1 }
  ]);
});

it("should return only cells that are not units", () => {
  const field = `...
    #.E
    .G.`;
  const { battlefield, units } = parseBattlefield(field);
  expect(findAdjustedCells(battlefield, { row: 1, column: 1 }, units)).toEqual([
    { row: 0, column: 1 }
  ]);
});
