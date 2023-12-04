import solve from "../../../days/1/Day1Part2";

it("should solve with test input", () => {
  const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;
  expect(solve(input)).toBe(281);
});
