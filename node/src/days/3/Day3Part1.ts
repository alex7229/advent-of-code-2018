type Solve = (input: string) => number;
type SolveFactory = () => Solve;

const solveFactory: SolveFactory = () => (input) => {
  return 15;
};

export default solveFactory();
