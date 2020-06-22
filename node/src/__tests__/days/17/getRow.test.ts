import parseGround from "../../../days/17/parseGround";
import getRow from "../../../days/17/getRow";

const getTestField = () => {
  const field = parseGround(`x=495, y=2..7
  x=504, y=1..2
  y=2, x=504..506
  y=7, x=495..501
  x=501, y=3..7
  x=498, y=2..4
  x=506, y=1..2
  x=498, y=10..13
  x=504, y=10..13
  y=13, x=498..504
  y=7, x=504..506
  x=504, y=5..7`);

  field[1][6] = { position: { row: 1, column: 500 }, type: "wet sand" };
  field[2][5] = { position: { row: 2, column: 499 }, type: "wet sand" };
  field[2][6] = { position: { row: 2, column: 500 }, type: "wet sand" };
  field[2][7] = { position: { row: 2, column: 501 }, type: "wet sand" };
  field[2][8] = { position: { row: 2, column: 502 }, type: "wet sand" };
  field[3][8] = { position: { row: 3, column: 502 }, type: "wet sand" };
  field[4][8] = { position: { row: 4, column: 502 }, type: "wet sand" };
  field[5][8] = { position: { row: 5, column: 502 }, type: "wet sand" };
  field[6][8] = { position: { row: 6, column: 502 }, type: "wet sand" };
  field[7][8] = { position: { row: 7, column: 502 }, type: "wet sand" };
  field[8][8] = { position: { row: 8, column: 502 }, type: "wet sand" };
  field[9][8] = { position: { row: 9, column: 502 }, type: "wet sand" };
  field[10][8] = { position: { row: 10, column: 502 }, type: "wet sand" };
  field[11][8] = { position: { row: 11, column: 502 }, type: "wet sand" };
  field[12][8] = { position: { row: 12, column: 502 }, type: "water" };
  field[12][9] = { position: { row: 12, column: 503 }, type: "water" };
  field[12][7] = { position: { row: 12, column: 501 }, type: "water" };
  field[12][6] = { position: { row: 12, column: 500 }, type: "water" };
  field[12][5] = { position: { row: 12, column: 499 }, type: "water" };
  field[3][5] = { position: { row: 3, column: 499 }, type: "water" };
  field[3][6] = { position: { row: 3, column: 500 }, type: "water" };
  field[4][5] = { position: { row: 4, column: 499 }, type: "water" };
  field[4][6] = { position: { row: 4, column: 500 }, type: "water" };
  field[5][2] = { position: { row: 5, column: 496 }, type: "water" };
  field[5][3] = { position: { row: 5, column: 497 }, type: "water" };
  field[5][4] = { position: { row: 5, column: 498 }, type: "water" };
  field[5][5] = { position: { row: 5, column: 499 }, type: "water" };
  field[5][6] = { position: { row: 5, column: 500 }, type: "water" };
  field[6][2] = { position: { row: 6, column: 496 }, type: "water" };
  field[6][3] = { position: { row: 6, column: 497 }, type: "water" };
  field[6][4] = { position: { row: 6, column: 498 }, type: "water" };
  field[6][5] = { position: { row: 6, column: 499 }, type: "water" };
  field[6][6] = { position: { row: 6, column: 500 }, type: "water" };

  // field is next:
  // ......+.......
  // ......|...#.#.
  // .#..#||||.###.
  // .#..#~~#|.....
  // .#..#~~#|.....
  // .#~~~~~#|.#...
  // .#~~~~~#|.#...
  // .#######|.###.
  // ........|.....
  // ........|.....
  // ....#...|.#...
  // ....#...|.#...
  // ....#~~~~~#...
  // ....#######...

  return field;
};

it("should return only one cell, if wet (or dry) sand block underneath", () => {
  expect(getRow({ row: 0, column: 500 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 0, column: 500 }, type: "spring" }],
    falldownCell: { position: { row: 1, column: 500 }, type: "wet sand" }
  });
  expect(getRow({ row: 0, column: 499 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 0, column: 499 }, type: "sand" }],
    falldownCell: { position: { row: 1, column: 499 }, type: "sand" }
  });
});

it("should return true, if water underneath and clay to the sides", () => {
  expect(getRow({ row: 4, column: 497 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 4, column: 497 }, type: "sand" },
      { position: { row: 4, column: 496 }, type: "sand" }
    ],
    falldownCell: null
  });
  expect(getRow({ row: 11, column: 500 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 11, column: 500 }, type: "sand" },
      { position: { row: 11, column: 499 }, type: "sand" },
      { position: { row: 11, column: 501 }, type: "sand" },
      { position: { row: 11, column: 502 }, type: "wet sand" },
      { position: { row: 11, column: 503 }, type: "sand" }
    ],
    falldownCell: null
  });
});

it("should return true, if clay is underneath and to the sides", () => {
  expect(getRow({ row: 1, column: 505 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 1, column: 505 }, type: "sand" }],
    falldownCell: null
  });
});

it("should find full rows (2 or more cells) that end with water falling down", () => {
  expect(getRow({ row: 2, column: 500 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 2, column: 500 }, type: "wet sand" },
      { position: { row: 2, column: 499 }, type: "wet sand" },
      { position: { row: 2, column: 501 }, type: "wet sand" },
      { position: { row: 2, column: 502 }, type: "wet sand" }
    ],
    falldownCell: { position: { row: 3, column: 502 }, type: "wet sand" }
  });
  expect(getRow({ row: 1, column: 498 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 1, column: 498 }, type: "sand" },
      { position: { row: 1, column: 497 }, type: "sand" }
    ],
    falldownCell: { position: { row: 2, column: 497 }, type: "sand" }
  });
  expect(getRow({ row: 6, column: 505 }, getTestField())).toEqual({
    wetCells: [
      { position: { row: 6, column: 505 }, type: "sand" },
      { position: { row: 6, column: 506 }, type: "sand" },
      { position: { row: 6, column: 507 }, type: "sand" }
    ],
    falldownCell: { position: { row: 7, column: 507 }, type: "sand" }
  });
});

it("should not fail, if underneath block is out of bounds", () => {
  expect(getRow({ row: 13, column: 495 }, getTestField())).toEqual({
    wetCells: [{ position: { row: 13, column: 495 }, type: "sand" }],
    falldownCell: null
  });
});
