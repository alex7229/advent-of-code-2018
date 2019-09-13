export type FindRecipesCount = (recipes: number[], pattern: string) => number;

const findRecipesCount: FindRecipesCount = (recipes, pattern) => {
  return recipes.join("").split(pattern)[0].length;
};

export default findRecipesCount;
