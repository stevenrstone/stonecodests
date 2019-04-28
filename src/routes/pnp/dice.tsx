import React, { useEffect, useReducer } from "react";

import "../../components/dice/dice.css";

interface Options {
  accumulate: boolean;
  dropHighest: boolean;
  dropLowest: boolean;
}

interface DiceState {
  buttons: number[];
  currentDieType: number;
  currentRolls: number[];
  history: Array<number[]>;
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
          newHistory.push(currentRolls);
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
  const effect = useEffect(() => {
    console.log("effect");
  });

  const renderRolls = (
    timeframe: string,
    rolls: number[],
    setIndex: number
  ) => {
    const sum = rolls.reduce((acc, roll) => acc + roll, 0);
    return (
      <React.Fragment key={setIndex}>
        <ul className={`sc-dice__${timeframe}__rolls`}>
          {rolls.map((roll, index) => (
            <li
              key={index}
              className={`sc-dice__${timeframe}__rolls__item`}
              data-value={roll}
            >
              {roll}
            </li>
          ))}
        </ul>
        <span className={`sc-dice__${timeframe}__total`}>
          {sum > 0 ? sum : null}
          <span className={`sc-dice__${timeframe}__number`}>
            {sum > 0
              ? `${rolls.length} roll${rolls.length === 1 ? "" : "s"}`
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
            {renderRolls("current", state.currentRolls, 7)}
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
