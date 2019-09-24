import { Pot } from "./getInitialPotsFromString";

type ArePotsFilledTheSame = (
  firstPots: ReadonlyArray<Pot>,
  secondPots: ReadonlyArray<Pot>
) => boolean;

const arePotsFilledTheSame: ArePotsFilledTheSame = (firstPots, secondPots) => {
  const firstPotsString = firstPots
    .map(pot => (pot.isFilled ? "#" : "."))
    .join("");
  const secondPotsString = secondPots
    .map(pot => (pot.isFilled ? "#" : "."))
    .join("");
  return firstPotsString === secondPotsString;
};

export default arePotsFilledTheSame;
