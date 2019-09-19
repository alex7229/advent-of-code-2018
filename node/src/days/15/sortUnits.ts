import { sortBy } from "lodash";
import { Unit } from "./parseBattlefield";

type SortUnits = (units: Unit[]) => Unit[];

const sortUnits: SortUnits = units =>
  sortBy(units, ["position.row", "position.column"]);

export default sortUnits;
