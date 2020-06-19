import { clone } from "lodash";

export type OperationType =
  | "addr"
  | "addi"
  | "mulr"
  | "muli"
  | "banr"
  | "bani"
  | "borr"
  | "bori"
  | "setr"
  | "seti"
  | "gtir"
  | "gtri"
  | "gtrr"
  | "eqir"
  | "eqri"
  | "eqrr";

export type State = [number, number, number, number];

type Operations = {
  [key in OperationType]: (
    firstInput: number,
    secondInput: number,
    state: State
  ) => number;
};

export const operations: Operations = {
  addr: (a, b, state) => state[a] + state[b],
  addi: (a, b, state) => state[a] + b,
  // eslint-disable-next-line no-bitwise
  bani: (a, b, state) => state[a] & b,
  // eslint-disable-next-line no-bitwise
  banr: (a, b, state) => state[a] & state[b],
  // eslint-disable-next-line no-bitwise
  bori: (a, b, state) => state[a] | b,
  // eslint-disable-next-line no-bitwise
  borr: (a, b, state) => state[a] | state[b],
  eqir: (a, b, state) => (a === state[b] ? 1 : 0),
  eqri: (a, b, state) => (state[a] === b ? 1 : 0),
  eqrr: (a, b, state) => (state[a] === state[b] ? 1 : 0),
  gtir: (a, b, state) => (a - state[b] > 0 ? 1 : 0),
  gtri: (a, b, state) => (state[a] - b > 0 ? 1 : 0),
  gtrr: (a, b, state) => (state[a] - state[b] > 0 ? 1 : 0),
  muli: (a, b, state) => state[a] * b,
  mulr: (a, b, state) => state[a] * state[b],
  seti: a => a,
  setr: (a, b, state) => state[a]
};

export const runOperation = (
  operationType: OperationType,
  firstInput: number,
  secondInput: number,
  output: number,
  state: State
): State => {
  const stateCopy: State = clone(state);
  stateCopy[output] = operations[operationType](
    firstInput,
    secondInput,
    stateCopy
  );
  return stateCopy;
};
