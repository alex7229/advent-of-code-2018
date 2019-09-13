import cookOneRecipe, { CookOneRecipe } from "./cookOneRecipe";

export type CookEnoughRecipes = (
  recipes: number[],
  elvesPositions: number[],
  recipesNumber: number
) => number[];
type CookEnoughRecipesFactory = (
  cookOneRecipe: CookOneRecipe
) => CookEnoughRecipes;

export const cookEnoughRecipesFactory: CookEnoughRecipesFactory = cookOneRecipeFunc => (
  recipes,
  elvesPositions,
  recipesNumber
) => {
  let currentRecipes = recipes;
  let currentElvesPositions = elvesPositions;

  while (currentRecipes.length < recipesNumber) {
    const result = cookOneRecipeFunc(currentRecipes, currentElvesPositions);
    currentRecipes = result.recipes;
    currentElvesPositions = result.elvesPositions;
  }
  return currentRecipes;
};

export default cookEnoughRecipesFactory(cookOneRecipe);
