export type Cell = "wall" | "cavern";
type Row = ReadonlyArray<Cell>;
export type Battlefield = ReadonlyArray<Row>;
export interface Unit {
  readonly type: "goblin" | "elf";
  readonly health: number;
  readonly position: {
    readonly row: number;
    readonly column: number;
  };
}
interface Result {
  readonly units: ReadonlyArray<Unit>;
  readonly battlefield: Battlefield;
}
type ParseBattlefield = (input: string) => Result;

const parseBattlefield: ParseBattlefield = input => {
  const battlefield: Cell[][] = [];
  const units: Unit[] = [];
  input.split("\n").forEach((rowString, rowNumber) => {
    const row: Cell[] = [];
    rowString
      .replace(/\s/g, "")
      .split("")
      .forEach((symbol, columnNumber) => {
        if (symbol === "#") {
          row.push("wall");
        } else if (symbol === ".") {
          row.push("cavern");
        } else if (symbol === "G") {
          row.push("cavern");
          units.push({
            type: "goblin",
            health: 200,
            position: { row: rowNumber, column: columnNumber }
          });
        } else {
          row.push("cavern");
          units.push({
            type: "elf",
            health: 200,
            position: { row: rowNumber, column: columnNumber }
          });
        }
      });
    battlefield.push(row);
  });
  return { battlefield, units };
};

export default parseBattlefield;
