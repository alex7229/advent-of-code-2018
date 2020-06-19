import { isEqual } from "lodash";
import { operations, OperationType, State, runOperation } from "./operations";

export interface Instruction {
  code: number
  firstInput: number;
  secondInput: number;
  output: number;
}

type FindPossibleOperationType = (
  before: State,
  after: State,
  instruction: Instruction
) => OperationType[];
const findPossibleOperationType: FindPossibleOperationType = (
  before,
  after,
  instruction
) => {
  const foundOperations: OperationType[] = [];

  Object.entries(operations).forEach(([operationType]) => {
    const currentOperationType = operationType as OperationType;
    const result = runOperation(
      currentOperationType,
      instruction.firstInput,
      instruction.secondInput,
      instruction.output,
      before
    );
    if (isEqual(result, after)) foundOperations.push(currentOperationType);
  });

  return foundOperations;
};

export default findPossibleOperationType;
