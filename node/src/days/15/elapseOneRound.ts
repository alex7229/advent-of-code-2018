import { cloneDeep } from "lodash";
import { Battlefield, Unit } from "./parseBattlefield";
import tryToMoveUnit from "./tryToMoveUnit";
import tryToAttack from "./tryToAttack";
import sortUnits from "./sortUnits";

type ElapseOneRound = (
  battlefield: Battlefield,
  units: ReadonlyArray<Unit>
) => ReadonlyArray<Unit>;

const elapseOneRound: ElapseOneRound = (battlefield, units) => {
  let currentUnits = sortUnits(cloneDeep(units));
  const readyUnitsId = units.map(unit => unit.id);
  while (readyUnitsId.length > 0) {
    let currentUnit = currentUnits.find(unit => unit.id === readyUnitsId[0]);
    if (!currentUnit) {
      // eslint-disable-next-line no-continue
      continue;
    }
    currentUnits = tryToMoveUnit(currentUnit, currentUnits, battlefield);
    currentUnit = currentUnits.find(unit => unit.id === readyUnitsId[0]);
    if (!currentUnit) {
      throw new Error("unit should be found, but it wasn`t");
    }
    currentUnits = tryToAttack(currentUnit, currentUnits).filter(
      unit => unit.health > 0
    );
    readyUnitsId.shift();
  }
  return currentUnits;
};

export default elapseOneRound;
