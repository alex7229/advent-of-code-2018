import { findValidPartNumbers } from "../../../days/3/findValidPartNumbers";
import { parseField } from "../../../days/3/parseField";

it("should find valid numbers correctly", () => {
  const input = `467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..`;
  const field = parseField(input);
  const validNumbers = [467, 35, 633, 617, 592, 755, 664, 598];
  expect(findValidPartNumbers(field)).toEqual(validNumbers);
});
