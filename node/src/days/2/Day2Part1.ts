type Solve = (input: string) => number;
type SolveFactory = () => Solve;

const solveFactory: SolveFactory = () => (input) => {
  return 23;
};

export default solveFactory();
