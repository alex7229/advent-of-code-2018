import getNextRecipesScore, {
  GetNextRecipesScore
} from "./getNextRecipesScore";

interface Result {
  readonly recipes: number[];
  readonly elvesPositions: ReadonlyArray<number>;
}

export type CookOneRecipe = (
  recipes: number[],
  elvesPositions: ReadonlyArray<number>
) => Result;
type CookOneRecipeFactory = (
  getNextRecipesScore: GetNextRecipesScore
) => CookOneRecipe;

// warning: this function mutates initial recipes; otherwise, it is super slow
export const cookOneRecipeFactory: CookOneRecipeFactory = getNextRecipesScoreFunc => (
  initialRecipes,
  initialElvesPositions
) => {
  const elvesScores = [
    initialRecipes[initialElvesPositions[0]],
    initialRecipes[initialElvesPositions[1]]
  ];
  const nextRecipes = initialRecipes;
  getNextRecipesScoreFunc(elvesScores).forEach(recipe =>
    nextRecipes.push(recipe)
  );
  const nextElvesPositions = initialElvesPositions.map(
    (position, elfNumber) =>
      (position + 1 + elvesScores[elfNumber]) % nextRecipes.length
  );
  return { recipes: nextRecipes, elvesPositions: nextElvesPositions };
};

export default cookOneRecipeFactory(getNextRecipesScore);
