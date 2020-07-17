import parseGround from "../../../days/17/parseGround";

// eslint-disable-next-line import/prefer-default-export
export const getTestField = () => {
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
