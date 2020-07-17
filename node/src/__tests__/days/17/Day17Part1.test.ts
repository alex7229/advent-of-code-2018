import solve from "../../../days/17/Day17Part1";

it("should calculate wet/water tiles after all water is set", () => {
  const fieldInput = `x=495, y=2..7
  y=7, x=495..501
  x=501, y=3..7
  x=498, y=2..4
  x=506, y=1..2
  x=498, y=10..13
  x=504, y=10..13
  y=13, x=498..504`;

  expect(solve(fieldInput)).toBe(57);
});
