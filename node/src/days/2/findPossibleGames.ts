import { Game, Round } from "./parseGame";

type FindPossibleGames = (games: Game[], configuration: Round) => number[];

export const findPossibleGames: FindPossibleGames = (games, configuration) => {
  const possibleGames: number[] = [];
  games.forEach((game) => {
    const isPossible = game.rounds.every(
      (round) =>
        round.blue <= configuration.blue &&
        round.green <= configuration.green &&
        round.red <= configuration.red
    );
    if (isPossible) {
      possibleGames.push(game.id);
    }
  });
  return possibleGames;
};
