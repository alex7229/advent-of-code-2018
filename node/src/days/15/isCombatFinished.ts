import { uniqBy } from "lodash";
import { Unit } from "./parseBattlefield";

type IsCombatFinished = (units: ReadonlyArray<Unit>) => boolean;

const isCombatFinished: IsCombatFinished = units =>
  uniqBy(units, "type").length < 2;

export default isCombatFinished;
