export type FindTenRecipesScore = (
  recipes: number[],
  lastNonScoredRecipe: number
) => string;

const findTenRecipesScore: FindTenRecipesScore = (
  recipes,
  lastNonScoredRecipe
) => recipes.join("").substr(lastNonScoredRecipe, 10);

export default findTenRecipesScore;
