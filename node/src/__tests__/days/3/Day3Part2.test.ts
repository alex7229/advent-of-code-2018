import solve from "../../../days/3/Day3Part2";

it("should solve with test input", () => {
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

  expect(solve(input)).toBe(467835);
});
