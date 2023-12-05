import { FindPossibleGames, findPossibleGames } from "./findPossibleGames";
import { ParseGame, parseGame } from "./parseGame";

type Solve = (input: string) => number;
type SolveFactory = (
  parseGame: ParseGame,
  findPossibleGames: FindPossibleGames
) => Solve;

const solveFactory: SolveFactory = (parseGame, findPossibleGames) => (
  input
) => {
  const games = input.split("\n").map(parseGame);
  const validGamesIDs = findPossibleGames(games, {
    blue: 14,
    green: 13,
    red: 12,
  });
  return validGamesIDs.reduce((total, currentGame) => total + currentGame, 0);
};

export default solveFactory(parseGame, findPossibleGames);
