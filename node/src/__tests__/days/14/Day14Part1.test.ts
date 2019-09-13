import solve from "../../../days/14/Day14Part1";

it("should work with real test input", () => {
  expect(solve("9")).toEqual("5158916779");
  expect(solve("5")).toEqual("0124515891");
  expect(solve("18")).toEqual("9251071085");
  expect(solve("2018")).toEqual("5941429882");
});
