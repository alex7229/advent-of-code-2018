import dripWater, { dripWaterFactory } from "../../../days/17/dripWater";
import getCellByPosition from "../../../days/17/getCellByPosition";
import { getTestField } from "./getTestField";
import { Cell } from "../../../days/17/parseGround";

it("should drop initial block of water from the spring", () => {
  const field = getTestField();
  expect(dripWater(null, field)).toEqual([
    {
      position: { row: 1, column: 500 },
      type: "water",
    },
  ]);
  expect(getCellByPosition({ row: 0, column: 500 }, field)).toEqual({
    position: { row: 0, column: 500 },
    type: "spring",
  });
  expect(getCellByPosition({ row: 1, column: 500 }, field)?.type).toBe("water");
  expect(getCellByPosition({ row: 2, column: 500 }, field)?.type).toBe(
    "wet sand"
  );
});

it("should not return next water blocks if water is dripped from non-water block", () => {
  const field = getTestField();
  expect(dripWater({ row: 0, column: 499 }, field)).toEqual([]);
});

it("should mark previous water block as wet sand", () => {
  const field = getTestField();
  const cell = getCellByPosition({ row: 0, column: 499 }, field)!;
  cell.type = "water";
  expect(dripWater({ row: 0, column: 499 }, field)).toEqual([
    {
      position: { row: 1, column: 499 },
      type: "water",
    },
  ]);
  expect(getCellByPosition({ row: 0, column: 499 }, field)?.type).toBe(
    "wet sand"
  );
  expect(getCellByPosition({ row: 1, column: 499 }, field)?.type).toBe("water");
});

it("should fill up the whole row (2+ cells) and return wet cells on top of that row to continue flow", () => {
  const field = getTestField();
  getCellByPosition({ row: 11, column: 502 }, field)!.type = "water";
  expect(dripWater({ row: 11, column: 502 }, field)).toEqual([
    {
      position: { row: 10, column: 502 },
      type: "water",
    },
  ]);
  expect(getCellByPosition({ row: 11, column: 499 }, field)?.type).toBe(
    "water"
  );
  expect(getCellByPosition({ row: 11, column: 500 }, field)?.type).toBe(
    "water"
  );
  expect(getCellByPosition({ row: 11, column: 501 }, field)?.type).toBe(
    "water"
  );
  expect(getCellByPosition({ row: 11, column: 502 }, field)?.type).toBe(
    "water"
  );
  expect(getCellByPosition({ row: 11, column: 503 }, field)?.type).toBe(
    "water"
  );
});

it("should make whole row wet and return multiple next water cells", () => {
  const field = getTestField();
  const falldownCellsBefore: Cell[] = [
    { position: { column: 410, row: 410 }, type: "sand" },
    { position: { column: 400, row: 400 }, type: "wet sand" },
  ];
  const falldownCellsAfter: Cell[] = falldownCellsBefore.map((cell) => ({
    ...cell,
    type: "water",
  }));
  const wetCellsBefore: Cell[] = [
    { position: { column: 4, row: 4 }, type: "sand" },
    { position: { column: 2, row: 2 }, type: "sand" },
  ];
  const wetCellsAfter: Cell[] = wetCellsBefore.map((cell) => ({
    ...cell,
    type: "wet sand",
  }));
  const getWaterRowMock = jest.fn().mockReturnValue({
    falldownCells: falldownCellsBefore,
    wetCells: wetCellsBefore,
    noMoreCells: false,
  });
  const getCellByPositionMock = jest.fn().mockReturnValue({
    position: { row: 0, column: 0 },
    type: "water",
  });
  expect(
    dripWaterFactory(getWaterRowMock, getCellByPositionMock)(
      { row: 0, column: 0 },
      field
    )
  ).toEqual(falldownCellsAfter);
  expect(wetCellsBefore).toEqual(wetCellsAfter);
  expect(falldownCellsBefore).toEqual(falldownCellsAfter);
});

it("should not return any cells, if everything is filled (next water cells are out of bounds)", () => {
  const field = getTestField();
  const position = { column: 506, row: 13 };
  getCellByPosition(position, field)!.type = "water";
  expect(dripWater(position, field)).toEqual([]);
  expect(getCellByPosition(position, field)?.type).toBe("wet sand");
});
