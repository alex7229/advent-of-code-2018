import cookOneRecipe, { CookOneRecipe } from "./cookOneRecipe";

export type CookEnoughRecipes = (
  recipes: number[],
  elvesPositions: ReadonlyArray<number>,
  recipesNumber: string
) => ReadonlyArray<number>;
export type CookEnoughRecipesFactory = (
  cookOneRecipe: CookOneRecipe
) => CookEnoughRecipes;

export const cookEnoughRecipesFactory: CookEnoughRecipesFactory = cookOneRecipeFunc => (
  recipes,
  elvesPositions,
  recipesNumber
) => {
  let currentRecipes = recipes;
  let currentElvesPositions = elvesPositions;

  while (currentRecipes.length < parseInt(recipesNumber, 10)) {
    const result = cookOneRecipeFunc(currentRecipes, currentElvesPositions);
    currentRecipes = result.recipes;
    currentElvesPositions = result.elvesPositions;
  }
  return currentRecipes;
};

export default cookEnoughRecipesFactory(cookOneRecipe);
