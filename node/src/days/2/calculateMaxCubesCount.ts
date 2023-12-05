import { Game, Round } from "./parseGame";

type CalculateMaxCubesCount = (rounds: Game["rounds"]) => Round;

export const calculateMaxCubesCount: CalculateMaxCubesCount = (rounds) => {
  let maxResult: Round = {
    blue: 0,
    green: 0,
    red: 0,
  };
  rounds.forEach((round) => {
    if (round.blue > maxResult.blue) {
      maxResult.blue = round.blue;
    }
    if (round.red > maxResult.red) {
      maxResult.red = round.red;
    }
    if (round.green > maxResult.green) {
      maxResult.green = round.green;
    }
  });
  return maxResult;
};
