import { findFewestCubes } from "../../../days/2/findFewestCubes";
import { parseGame } from "../../../days/2/parseGame";

it("should calculate fewest cubes properly", () => {
  const game = parseGame(
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  );
  expect(findFewestCubes(game.rounds)).toEqual({ red: 4, green: 2, blue: 6 });
});
