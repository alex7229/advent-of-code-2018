import findRecipesCount from "../../../days/14/findRecipesCount";

it("should find recipes if patten is in the end", () => {
  const recipes = [1, 2, 5, 2, 7];
  const pattern = "527";
  expect(findRecipesCount(recipes, pattern)).toBe(2);
});

it("should find recipes number if pattern is in the middle", () => {
  const recipes = [2, 6, 2, 6];
  const pattern = "62";
  expect(findRecipesCount(recipes, pattern)).toBe(1);
});
