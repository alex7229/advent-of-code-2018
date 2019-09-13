import getNextRecipesScore from "../../../days/14/getNextRecipesScore";

it("should produce correct score with two digits", () => {
  expect(getNextRecipesScore([3, 7])).toEqual([1, 0]);
});

it("should produce correct one digit score", () => {
  expect(getNextRecipesScore([2, 3])).toEqual([5]);
});
