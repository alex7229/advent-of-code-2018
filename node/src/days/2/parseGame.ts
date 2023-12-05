export type Round = {
  red: number;
  green: number;
  blue: number;
};
export type Game = { id: number; rounds: Round[] };
export type ParseGame = (input: string) => Game;

export const parseGame: ParseGame = (input) => {
  const gameMatch = input.match(/Game (\d+):/);
  if (gameMatch === null) {
    throw new Error(`Cannot parse ${input}`);
  }
  const gameID = parseInt(gameMatch[1]);
  if (Number.isNaN(gameID)) {
    throw new Error(`Cannot parse game id from input ${input}`);
  }

  const roundsInput = input.replace(/Game (\d)+:/g, "");
  const rounds: Round[] = roundsInput
    .split(";")
    .map((roundString) => {
      return roundString.split(",");
    })
    .map((cubesInfo) => {
      const round: Round = {
        blue: 0,
        green: 0,
        red: 0,
      };
      cubesInfo.forEach((info) => {
        const cubeInfoMatch = info.match(/(\d+) (\w+)/);
        if (cubeInfoMatch === null) return;
        if (!cubeInfoMatch[1] || !cubeInfoMatch[2]) {
          throw new Error(`Cannot parse cube info ${info}`);
        }
        const count = parseInt(cubeInfoMatch[1]);
        const color = cubeInfoMatch[2];
        if (color === "blue") {
          round.blue = count;
        } else if (color === "red") {
          round.red = count;
        } else if (color === "green") {
          round.green = count;
        }
      });
      return round;
    });

  return { id: gameID, rounds };
};
