import { readFileSync } from "fs";
import parseField from "../../../days/17/parseGround";
import dripAllWater from "../../../days/17/dripAllWater";
import drawField from "../../../days/17/drawField";

it("should drip all water from the test example", () => {
  const input = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;
  const field = parseField(input);
  dripAllWater(field);
  drawField(field);
  expect(readFileSync("./fileAnswer.txt", "utf-8")).toEqual(`......+.......
......|.....#.
.#..#||||...#.
.#..#~~#|.....
.#..#~~#|.....
.#~~~~~#|.....
.#~~~~~#|.....
.#######|.....
........|.....
...|||||||||..
...|#~~~~~#|..
...|#~~~~~#|..
...|#~~~~~#|..
...|#######|..`);
});
