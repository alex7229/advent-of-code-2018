export type FindTenRecipesScore = (
  recipes: ReadonlyArray<number>,
  lastNonScoredRecipe: string
) => string;

const findTenRecipesScore: FindTenRecipesScore = (
  recipes,
  lastNonScoredRecipe
) => recipes.join("").substr(parseInt(lastNonScoredRecipe, 10), 10);

export default findTenRecipesScore;
