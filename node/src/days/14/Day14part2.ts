import { Solve } from "../10/Day10Part1";
import { CookEnoughRecipes } from "./cookEnoughRecipes";
import cookEnoughRecipesPartTwo from "./cookEnoughRecipesPartTwo";
import findRecipesCount, { FindRecipesCount } from "./findRecipesCount";

type SolveFactory = (
  cookEnoughRecipes: CookEnoughRecipes,
  findRecipesCount: FindRecipesCount
) => Solve;

const solveFactory: SolveFactory = (
  cookEnoughRecipesFunc,
  findRecipesCountFunc
) => input => {
  const initialRecipes = [3, 7];
  const initialElvesPositions = [0, 1];
  const cookedRecipes = cookEnoughRecipesFunc(
    initialRecipes,
    initialElvesPositions,
    input
  );
  return findRecipesCountFunc(cookedRecipes, input);
};

export default solveFactory(cookEnoughRecipesPartTwo, findRecipesCount);
