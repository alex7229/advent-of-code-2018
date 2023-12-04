import solve from "../../../days/1/Day1Part1";

it("should solve with test input", () => {
  const input = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`;
  expect(solve(input)).toBe(142);
});
