import { Round } from "./parseGame";

export type FindFewestCubes = (rounds: Round[]) => Round;

export const findFewestCubes: FindFewestCubes = (rounds) => {
  const cubes: Round = { blue: 0, green: 0, red: 0 };
  rounds.forEach((round) => {
    if (round.blue > cubes.blue) {
      cubes.blue = round.blue;
    }
    if (round.green > cubes.green) {
      cubes.green = round.green;
    }
    if (round.red > cubes.red) {
      cubes.red = round.red;
    }
  });
  return cubes;
};
