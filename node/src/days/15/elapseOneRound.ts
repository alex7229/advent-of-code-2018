import { cloneDeep } from "lodash";
import { Battlefield, Unit } from "./parseBattlefield";
import tryToMoveUnit from "./tryToMoveUnit";
import tryToAttack from "./tryToAttack";
import sortUnits from "./sortUnits";
import isCombatFinished from "./isCombatFinished";

interface Result {
  readonly wasRoundCompletelyCompleted: boolean;
  readonly units: ReadonlyArray<Unit>;
}
type ElapseOneRound = (
  battlefield: Battlefield,
  units: ReadonlyArray<Unit>
) => Result;

const elapseOneRound: ElapseOneRound = (battlefield, units) => {
  let currentUnits = sortUnits(cloneDeep(units));
  const readyUnitsId = units.map(unit => unit.id);
  while (readyUnitsId.length > 0) {
    if (isCombatFinished(currentUnits)) {
      return { wasRoundCompletelyCompleted: false, units: currentUnits };
    }
    let currentUnit = currentUnits.find(unit => unit.id === readyUnitsId[0]);
    if (!currentUnit) {
      readyUnitsId.shift();
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
  return { wasRoundCompletelyCompleted: true, units: currentUnits };
};

export default elapseOneRound;
