import { State } from "./operations";
import { Instruction } from "./findPossibleOperation";

export interface Sample {
  before: State;
  after: State;
  instruction: Instruction;
}
type ParseSamples = (input: string) => Sample[];

const parseSamples: ParseSamples = input => {
  const regExp = /Before: \[(\d*), (\d*), (\d*), (\d*)\]\s*(\d*) (\d*) (\d*) (\d*)\s*After:\s{2}\[(\d*), (\d*), (\d*), (\d*)\]/g;
  return [...input.matchAll(regExp)].map(match => ({
    before: [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10),
      parseInt(match[4], 10)
    ],
    instruction: {
      code: parseInt(match[5], 10),
      firstInput: parseInt(match[6], 10),
      secondInput: parseInt(match[7], 10),
      output: parseInt(match[8], 10)
    },
    after: [
      parseInt(match[9], 10),
      parseInt(match[10], 10),
      parseInt(match[11], 10),
      parseInt(match[12], 10)
    ]
  }));
};

export default parseSamples;
