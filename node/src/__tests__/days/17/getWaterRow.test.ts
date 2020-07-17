import getWaterRow from "../../../days/17/getWaterRow";
import { getTestField } from "./getTestField";
import parseGround from "../../../days/17/parseGround";
import getCellByPosition from "../../../days/17/getCellByPosition";

it("should return only one cell, if wet (or dry) sand block underneath", () => {
  expect(getWaterRow({ row: 0, column: 500 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 0, column: 500 }, type: "spring" }],
    falldownCells: [{ position: { row: 1, column: 500 }, type: "wet sand" }],
    noMoreCells: false,
  });
  expect(getWaterRow({ row: 0, column: 499 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 0, column: 499 }, type: "sand" }],
    falldownCells: [{ position: { row: 1, column: 499 }, type: "sand" }],
    noMoreCells: false,
  });
});

it("should return a full row, if water underneath and clay is on one side", () => {
  expect(getWaterRow({ row: 4, column: 497 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 4, column: 497 }, type: "sand" },
      { position: { row: 4, column: 496 }, type: "sand" },
    ],
    falldownCells: [],
    noMoreCells: false,
  });
  expect(getWaterRow({ row: 11, column: 500 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 11, column: 500 }, type: "sand" },
      { position: { row: 11, column: 499 }, type: "sand" },
      { position: { row: 11, column: 501 }, type: "sand" },
      { position: { row: 11, column: 502 }, type: "wet sand" },
      { position: { row: 11, column: 503 }, type: "sand" },
    ],
    falldownCells: [],
    noMoreCells: false,
  });
});

it("should return a row with one cell, if clay is underneath and to the sides", () => {
  expect(getWaterRow({ row: 1, column: 505 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 1, column: 505 }, type: "sand" }],
    falldownCells: [],
    noMoreCells: false,
  });
});

it("should find full rows (2 or more cells) that end with water falling down from one side", () => {
  expect(getWaterRow({ row: 2, column: 500 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 2, column: 500 }, type: "wet sand" },
      { position: { row: 2, column: 499 }, type: "wet sand" },
      { position: { row: 2, column: 501 }, type: "wet sand" },
      { position: { row: 2, column: 502 }, type: "wet sand" },
    ],
    falldownCells: [{ position: { row: 3, column: 502 }, type: "wet sand" }],
    noMoreCells: false,
  });

  expect(getWaterRow({ row: 6, column: 505 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 6, column: 505 }, type: "sand" },
      { position: { row: 6, column: 506 }, type: "sand" },
      { position: { row: 6, column: 507 }, type: "sand" },
    ],
    falldownCells: [{ position: { row: 7, column: 507 }, type: "sand" }],
    noMoreCells: false,
  });

  // field:
  // ..+.#.
  // ....#.
  // .#~~#.
  // .####.
  const field = parseGround(`x=499, y=2..3
x=502, y=0..3
y=3, x=499..502`);
  getCellByPosition({ row: 2, column: 500 }, field)!.type = "water";
  getCellByPosition({ row: 2, column: 501 }, field)!.type = "water";
  expect(getWaterRow({ column: 500, row: 1 }, field)).toEqual({
    falldownCells: [{ position: { column: 498, row: 2 }, type: "sand" }],
    noMoreCells: false,
    wetCells: [
      { position: { column: 500, row: 1 }, type: "sand" },
      { position: { column: 499, row: 1 }, type: "sand" },
      { position: { column: 498, row: 1 }, type: "sand" },
      { position: { column: 501, row: 1 }, type: "sand" },
    ],
  });
});

it("should find full rows with water fallind down from both directions", () => {
  expect(getWaterRow({ row: 1, column: 498 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 1, column: 498 }, type: "sand" },
      { position: { row: 1, column: 497 }, type: "sand" },
      { position: { row: 1, column: 499 }, type: "sand" },
    ],
    falldownCells: [
      { position: { row: 2, column: 497 }, type: "sand" },
      { position: { row: 2, column: 499 }, type: "wet sand" },
    ],
    noMoreCells: false,
  });
});

it("should return 'no more cells', if underneath block is out of bounds", () => {
  expect(
    getWaterRow({ row: 13, column: 495 }, getTestField()).noMoreCells
  ).toBe(true);
});
