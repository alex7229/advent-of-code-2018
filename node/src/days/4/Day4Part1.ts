type Solve = (input: string) => number;
type SolveFactory = () => Solve;

const solveFactory: SolveFactory = () => (input) => {
  return 98;
};

export default solveFactory();
