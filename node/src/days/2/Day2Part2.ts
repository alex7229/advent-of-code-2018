import { FindFewestCubes, findFewestCubes } from "./findFewestCubes";
import { ParseGame, parseGame } from "./parseGame";

type Solve = (input: string) => number;
type SolveFactory = (
  parseGame: ParseGame,
  findFewestCubes: FindFewestCubes
) => Solve;

const solveFactory: SolveFactory = (parseGame, findFewestCubes) => (input) => {
  const games = input.split("\n").map(parseGame);
  const cubes = games.map((game) => findFewestCubes(game.rounds));
  const powers = cubes.map(
    (cubeSet) => cubeSet.blue * cubeSet.red * cubeSet.green
  );
  return powers.reduce((total, current) => total + current, 0);
};

export default solveFactory(parseGame, findFewestCubes);
