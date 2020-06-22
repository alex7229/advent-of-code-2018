import parseGround from "../../../days/17/parseGround";
import getCellByPosition from "../../../days/17/getCellByPosition";

it("should get cell properly with offset", () => {
  const input = `x=499, y=1..3
    y=3, x=498..501`;
  const field = parseGround(input);
  expect(getCellByPosition({ row: 2, column: 499 }, field)).toEqual({
    position: { row: 2, column: 499 },
    type: "clay"
  });
});

it("should return null, if position is out of bounds", () => {
  const input = `x=499, y=1..3
    y=3, x=498..501`;
  const field = parseGround(input);
  expect(getCellByPosition({ row: 0, column: 25 }, field)).toEqual(null);
  expect(getCellByPosition({ row: 0, column: 850 }, field)).toEqual(null);
  expect(getCellByPosition({ row: 50, column: 499 }, field)).toEqual(null);
  expect(getCellByPosition({ row: -2, column: 499 }, field)).toEqual(null);
  expect(getCellByPosition({ row: 0, column: -2 }, field)).toEqual(null);
  expect(getCellByPosition({ row: -2, column: -2 }, field)).toEqual(null);
});
