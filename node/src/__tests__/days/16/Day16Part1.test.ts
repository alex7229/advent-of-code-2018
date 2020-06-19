import solve from "../../../days/16/Day16Part1";

it("should calculate one sample from example", () => {
  const input = `Before: [3, 2, 1, 1]
    9 2 1 2
    After:  [3, 2, 2, 1]`;
  expect(solve(input)).toBe(1);
});
