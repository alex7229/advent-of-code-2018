import { Instruction } from "./findPossibleOperation";

const parseInstructions = (input: string): Instruction[] => {
  const [, instructionsPart] = input.split("\n\n\n");
  const regExp = /(\d*) (\d*) (\d*) (\d*)/g;
  return [...instructionsPart.matchAll(regExp)].map(match => ({
    code: parseInt(match[1], 10),
    firstInput: parseInt(match[2], 10),
    secondInput: parseInt(match[3], 10),
    output: parseInt(match[4], 10)
  }));
};

export default parseInstructions;
