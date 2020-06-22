import { Solve } from "../10/Day10Part1";
import parseSamples from "./parseSamples";
import decodeOperationCodes from "./decodeOperationCodes";
import { State, runOperation } from "./operations";
import parseInstructions from "./parseInstructions";

const solve: Solve = input => {
  const samples = parseSamples(input);
  const operationCodes = decodeOperationCodes(samples);
  const instructions = parseInstructions(input);
  const initialState: State = [0, 0, 0, 0];
  const finalState = instructions.reduce(
    (state, instruction) =>
      runOperation(
        operationCodes[instruction.code],
        instruction.firstInput,
        instruction.secondInput,
        instruction.output,
        state
      ),
    initialState
  );
  return finalState[0];
};

export default solve;
