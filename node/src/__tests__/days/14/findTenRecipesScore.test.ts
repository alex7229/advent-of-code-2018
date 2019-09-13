import findTenRecipesScore from "../../../days/14/findTenRecipesScore";

it("should find the score correctly", () => {
  const recipes = [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2];
  expect(findTenRecipesScore(recipes, "9")).toBe("5158916779");
});

it("should find the score correctly starting with 0", () => {
  const recipes = [3, 7, 1, 0, 1, 0, 1, 2, 0, 0, 0, 5, 8, 9, 1, 6, 7, 7, 9, 2];
  expect(findTenRecipesScore(recipes, "8")).toBe("0005891677");
});
