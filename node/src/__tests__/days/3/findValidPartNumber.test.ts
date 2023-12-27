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

it("should find valid number with metadata", () => {
  const input = `467..114..
  ...*......`;
  const field = parseField(input);
  const validNumbers = [{ value: 467, row: 0, column: { from: 0, to: 2 } }];
  expect(findValidPartNumbers(field, true)).toEqual(validNumbers);
});
