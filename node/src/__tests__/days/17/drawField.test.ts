import { readFileSync } from "fs";
import parseGround, { Field } from "../../../days/17/parseGround";
import drawField from "../../../days/17/drawField";

it("should draw field and save into ./draw-field.txt file", () => {
  const field: Field = [
    [
      { position: { row: 480, column: 0 }, type: "sand" },
      { position: { row: 480, column: 0 }, type: "clay" }
    ],
    [
      { position: { row: 481, column: 1 }, type: "spring" },
      { position: { row: 481, column: 1 }, type: "water" }
    ],
    [
      { position: { row: 482, column: 2 }, type: "sand" },
      { position: { row: 482, column: 2 }, type: "wet sand" }
    ]
  ];
  drawField(field);
  const expectedField = `.#${"\n"}+~${"\n"}.|`;
  expect(readFileSync("./fileAnswer.txt", "utf-8")).toEqual(expectedField);
});

it("should parse and draw field from the example", () => {
  const input = `x=495, y=2..7
    y=7, x=495..501
    x=501, y=3..7
    x=498, y=2..4
    x=506, y=1..2
    x=498, y=10..13
    x=504, y=10..13
    y=13, x=498..504`;
  const expectedField = `......+.......
............#.
.#..#.......#.
.#..#..#......
.#..#..#......
.#.....#......
.#.....#......
.#######......
..............
..............
....#.....#...
....#.....#...
....#.....#...
....#######...`;
  drawField(parseGround(input));
  expect(readFileSync("./fileAnswer.txt", "utf-8")).toEqual(expectedField);
});
