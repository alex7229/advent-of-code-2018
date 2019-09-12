export interface Pot {
  readonly position: number;
  readonly isFilled: boolean;
}

type GetInitialPotsFromString = (pots: string) => Pot[];

const getInitialPotsFromString: GetInitialPotsFromString = pots =>
  pots.split("").map((potSymbol, index) => ({
    position: index,
    isFilled: potSymbol === "#"
  }));

export default getInitialPotsFromString;
