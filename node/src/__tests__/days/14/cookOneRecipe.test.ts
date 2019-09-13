import { cookOneRecipeFactory } from "../../../days/14/cookOneRecipe";
import getNextRecipesScore from "../../../days/14/getNextRecipesScore";

it("should cook recipes properly", () => {
  const initial = {
    recipes: [3, 7],
    elvesPositions: [0, 1]
  };
  const afterFirstCooking = {
    recipes: [3, 7, 1, 0],
    elvesPositions: [0, 1]
  };
  const afterSecondCooking = {
    recipes: [3, 7, 1, 0, 1, 0],
    elvesPositions: [4, 3]
  };
  const afterThirdCooking = {
    recipes: [3, 7, 1, 0, 1, 0, 1],
    elvesPositions: [6, 4]
  };
  expect(
    cookOneRecipeFactory(getNextRecipesScore)(
      initial.recipes,
      initial.elvesPositions
    )
  ).toEqual(afterFirstCooking);
  expect(
    cookOneRecipeFactory(getNextRecipesScore)(
      afterFirstCooking.recipes,
      afterFirstCooking.elvesPositions
    )
  ).toEqual(afterSecondCooking);
  expect(
    cookOneRecipeFactory(getNextRecipesScore)(
      afterSecondCooking.recipes,
      afterSecondCooking.elvesPositions
    )
  ).toEqual(afterThirdCooking);
});
