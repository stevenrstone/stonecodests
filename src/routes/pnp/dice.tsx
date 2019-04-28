import React, { useEffect, useReducer } from "react";

import "../../components/dice/dice.css";

interface Options {
  accumulate: boolean;
  dropHighest: boolean;
  dropLowest: boolean;
}

interface RollHistory {
  accumulate: boolean;
  dieType: number;
  dropHighest: boolean;
  dropLowest: boolean;
  rolls: number[];
}

interface DiceState {
  buttons: number[];
  currentDieType: number;
  currentRolls: number[];
  history: RollHistory[];
  options: Options;
}

const defaultState: DiceState = {
  buttons: [20, 12, 10, 8, 6, 4, 100],
  currentDieType: -1,
  currentRolls: [],
  history: [],
  options: {
    accumulate: false,
    dropHighest: false,
    dropLowest: false
  }
};

const reducer = (state: DiceState, action: any) => {
  console.log(state, action);
  switch (action.type) {
    case "roll":
      const { clickedDieType } = action;
      const { currentDieType, currentRolls, history, options } = state;

      let roll: number;
      let rolls: number[];
      let newHistory = history;
      if (clickedDieType === currentDieType || options.accumulate) {
        rolls = currentRolls;
      } else {
        if (currentRolls.length > 0) {
          newHistory.push({
            accumulate: options.accumulate,
            dieType: currentDieType,
            dropHighest: options.dropHighest,
            dropLowest: options.dropLowest,
            rolls: currentRolls
          });
        }
        newHistory = newHistory.slice(Math.max(newHistory.length - 5, 0));
        rolls = [];
      }

      roll = Math.floor(Math.random() * clickedDieType) + 1;

      rolls.push(roll);

      return {
        ...state,
        currentDieType: clickedDieType,
        currentRolls: rolls,
        history: newHistory
      };
      break;
    default:
      return state;
      break;
  }
};

const Dice = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  let scrollRef = React.createRef<HTMLLIElement>();

  const effect = useEffect(() => {
    const ref = scrollRef.current;
    if (ref !== null) {
      ref.scrollIntoView();
    }
  });

  const renderRolls = (
    timeframe: string,
    rollHistory: RollHistory,
    setIndex: number
  ) => {
    let lowest: number;
    let highest: number;
    let sum: number;

    if (rollHistory.dropHighest || rollHistory.dropLowest) {
      // Making a second copy so the original isn't sorted
      let rollCopy = rollHistory.rolls.map(item => item);
      rollCopy.sort((a, b) => a - b);
      lowest = rollCopy[0];
      if (rollHistory.dropLowest) {
        rollCopy.splice(0, 1);
      }
      highest = rollCopy[rollCopy.length - 1];
      if (rollHistory.dropHighest) {
        rollCopy.splice(rollCopy.length - 1, 1);
      }
      sum = rollCopy.reduce((acc, roll) => acc + roll, 0);
      console.log(rollCopy, sum);
    } else {
      sum = rollHistory.rolls.reduce((acc, roll) => acc + roll, 0);
    }

    return (
      <React.Fragment key={setIndex}>
        <ul className={`sc-dice__${timeframe}__rolls`}>
          {rollHistory.rolls.map((roll, index) => (
            <li
              key={index}
              className={`sc-dice__${timeframe}__rolls__item${
                rollHistory.dropHighest &&
                index === rollHistory.rolls.indexOf(highest)
                  ? " highest"
                  : ""
              }${
                rollHistory.dropLowest &&
                index === rollHistory.rolls.indexOf(lowest)
                  ? " lowest"
                  : ""
              }`}
              data-value={roll}
            >
              {roll}
            </li>
          ))}
          {timeframe === "current" ? (
            <li className="scroll-ref" ref={scrollRef} />
          ) : null}
        </ul>
        <span className={`sc-dice__${timeframe}__total`}>
          {sum > 0 ? sum : null}
          <span className={`sc-dice__${timeframe}__number`}>
            {sum > 0
              ? `${rollHistory.rolls.length} d${
                  rollHistory.accumulate ? "?" : rollHistory.dieType
                }${rollHistory.rolls.length === 1 ? "" : "s"}`
              : null}
          </span>
        </span>
      </React.Fragment>
    );
  };

  const renderHistory = () => {
    return state.history.map((historySet, index) =>
      renderRolls("past", historySet, index)
    );
  };

  const renderButtons = () => {
    return state.buttons.map((button, index) => (
      <button
        className="sc-dice-button"
        key={index}
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "roll",
            clickedDieType: button
          });
        }}
      >
        {button}
      </button>
    ));
  };

  return (
    <>
      <div className="sc-dice-container">
        <div className="sc-dice__display">
          <div className="sc-dice__history">{renderHistory()}</div>
          <div className="sc-dice__current">
            {renderRolls(
              "current",
              {
                accumulate: state.options.accumulate,
                dieType: state.currentDieType,
                dropHighest: state.options.dropHighest,
                dropLowest: state.options.dropLowest,
                rolls: state.currentRolls
              },
              7
            )}
          </div>
        </div>
        <div className="sc-dice__options">
          {renderButtons()}
          <div className="sc-dice-more-options" />
        </div>
      </div>
    </>
  );
};

export default Dice;
