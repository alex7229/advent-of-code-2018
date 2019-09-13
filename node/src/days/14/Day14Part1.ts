import { Solve } from "../10/Day10Part1";
import cookEnoughRecipes, { CookEnoughRecipes } from "./cookEnoughRecipes";
import findTenRecipesScore, {
  FindTenRecipesScore
} from "./findTenRecipesScore";

type SolveFactory = (
  cookEnoughRecipes: CookEnoughRecipes,
  findTenRecipesScore: FindTenRecipesScore
) => Solve;

const solveFactory: SolveFactory = (
  cookEnoughRecipesFunc,
  findTenRecipesScoreFunc
) => input => {
  const initialRecipes = [3, 7];
  const initialElvesPositions = [0, 1];
  const lastNonScoredRecipePosition = parseInt(input, 10);
  const cookedRecipes = cookEnoughRecipesFunc(
    initialRecipes,
    initialElvesPositions,
    (lastNonScoredRecipePosition + 10).toString()
  );
  return findTenRecipesScoreFunc(
    cookedRecipes,
    lastNonScoredRecipePosition.toString()
  );
};

export default solveFactory(cookEnoughRecipes, findTenRecipesScore);
