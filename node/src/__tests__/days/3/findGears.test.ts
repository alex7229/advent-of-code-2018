import { findGears, Gear } from "../../../days/3/findGears";
import { findValidPartNumbers } from "../../../days/3/findValidPartNumbers";
import { parseField } from "../../../days/3/parseField";

it("should find gears correctly", () => {
  const input = `467..114..
    ...*......
    ..35..633.
    ......#...
    617*..3*4.
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.755..`;
  const field = parseField(input);
  const gears: Gear[] = [
    { position: { row: 1, column: 3 }, ratios: [467, 35] },
    { position: { row: 8, column: 5 }, ratios: [755, 755] },
  ];
  expect(findGears(field, findValidPartNumbers)).toEqual(gears);
});
