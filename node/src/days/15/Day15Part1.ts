import { Solve } from "../10/Day10Part1";
import parseBattlefield from "./parseBattlefield";
import isCombatFinished from "./isCombatFinished";
import elapseOneRound from "./elapseOneRound";
import calculateCombatScore from "./calculateCombatScore";

const solve: Solve = input => {
  const { battlefield, units } = parseBattlefield(input);
  let currentUnits = units;
  let rounds = 0;
  let isBattleOver = isCombatFinished(currentUnits);
  while (!isBattleOver) {
    const result = elapseOneRound(battlefield, currentUnits);
    currentUnits = result.units;
    if (!result.wasRoundCompletelyCompleted) {
      break;
    }
    rounds += 1;

    isBattleOver = isCombatFinished(currentUnits);
  }
  // todo: the answer is incorrect for some reason
  // goblins have less health than they should
  // check it (compare to https://github.com/albertobastos/advent-of-code-2018-nodejs)
  return calculateCombatScore(currentUnits, rounds);
};

export default solve;
