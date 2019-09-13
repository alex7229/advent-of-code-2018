import { CookEnoughRecipesFactory } from "./cookEnoughRecipes";
import cookOneRecipe from "./cookOneRecipe";

export const cookEnoughRecipesPartTwoFactory: CookEnoughRecipesFactory = cookOneRecipeFunc => (
  recipes,
  elvesPositions,
  numberPattern
) => {
  let currentRecipes = recipes;
  let currentElvesPositions = elvesPositions;
  while (true) {
    const lastString = currentRecipes.slice(0 - numberPattern.length).join("");
    const withoutOneCharacter = currentRecipes
      .slice(-1 - numberPattern.length, -1)
      .join("");
    if (lastString === numberPattern || withoutOneCharacter === numberPattern) {
      return currentRecipes;
    }
    const result = cookOneRecipeFunc(currentRecipes, currentElvesPositions);
    currentRecipes = result.recipes;
    currentElvesPositions = result.elvesPositions;
  }
};

export default cookEnoughRecipesPartTwoFactory(cookOneRecipe);
