import solve from "../../../days/14/Day14part2";

it("should find the recipes count properly via non-mocked functions", () => {
  expect(solve("51589")).toBe(9);
  expect(solve("01245")).toBe(5);
  expect(solve("92510")).toBe(18);
  expect(solve("59414")).toBe(2018);
});
