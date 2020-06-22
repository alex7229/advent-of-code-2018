import { intersection } from "lodash";
import { OperationType } from "./operations";
import { Sample } from "./parseSamples";
import findPossibleOperationType from "./findPossibleOperation";

type DecodeOperationCodes = (samples: Sample[]) => OperationType[];
const decodeOperationCodes: DecodeOperationCodes = samples => {
  const allCombinations: OperationType[][][] = Array(16)
    .fill(0)
    .map(() => []);
  samples.forEach(sample => {
    const possibleOperationTypes = findPossibleOperationType(
      sample.before,
      sample.after,
      sample.instruction
    );
    allCombinations[sample.instruction.code].push(possibleOperationTypes);
  });
  let intersectedCombinations = allCombinations.map(combinations =>
    intersection(...combinations)
  );
  const result: (OperationType | null)[] = Array(16).fill(null);
  while (result.some(operation => operation === null)) {
    intersectedCombinations.forEach((combination, index) => {
      if (combination.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        result[index] = combination[0];
      }
    });
    // eslint-disable-next-line no-loop-func
    result.forEach(operationType => {
      if (!operationType) return;

      intersectedCombinations = intersectedCombinations.map(combination =>
        combination.filter(
          currentOperation => currentOperation !== operationType
        )
      );
    });
  }
  return result.filter(operation => operation) as OperationType[];
};

export default decodeOperationCodes;
