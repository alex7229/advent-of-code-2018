import findPossibleOperationType, {
  Instruction
} from "../../../days/16/findPossibleOperation";
import { State } from "../../../days/16/operations";

it("should find three opcodes from the official example", () => {
  const before: State = [3, 2, 1, 1];
  const after: State = [3, 2, 2, 1];
  const instruction: Instruction = {
    firstInput: 2,
    secondInput: 1,
    output: 2,
    code: 10
  };
  expect(findPossibleOperationType(before, after, instruction)).toEqual([
    "addi",
    "mulr",
    "seti"
  ]);
});
