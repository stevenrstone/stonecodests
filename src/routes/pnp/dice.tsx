import React, { useEffect, useReducer } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "../../components/dice/dice.css";

interface Option {
  active: boolean;
  displayName: string;
}

interface Options {
  accumulate: Option;
  dropHighest: Option;
  dropLowest: Option;
}

interface Roll {
  value: number;
  dieType: number;
}

interface RollHistory {
  accumulate: boolean;
  dropHighest: boolean;
  dropLowest: boolean;
  rolls: Roll[];
}

interface DiceState {
  buttons: number[];
  currentDieType: number;
  currentRolls: Roll[];
  history: RollHistory[];
  options: Options;
  optionsView: boolean;
}

const defaultState: DiceState = {
  buttons: [20, 12, 10, 8, 6, 4, 100],
  currentDieType: -1,
  currentRolls: [],
  history: [],
  options: {
    accumulate: { active: false, displayName: "Accumulate Rolls" },
    dropHighest: { active: false, displayName: "Drop Highest Roll" },
    dropLowest: { active: false, displayName: "Drop Lowest Roll" },
  },
  optionsView: false,
};

const reducer = (state: DiceState, action: any) => {
  switch (action.type) {
    case "roll": {
      const { clickedDieType } = action;
      const { currentDieType, currentRolls, history, options } = state;

      let roll: Roll;
      let rolls: Roll[];
      let newHistory = history;
      if (clickedDieType === currentDieType || options.accumulate.active) {
        rolls = currentRolls;
      } else {
        if (currentRolls.length > 0) {
          newHistory.push({
            accumulate: options.accumulate.active,
            dropHighest: options.dropHighest.active,
            dropLowest: options.dropLowest.active,
            rolls: currentRolls,
          });
        }
        newHistory = newHistory.slice(Math.max(newHistory.length - 5, 0));
        rolls = [];
      }

      roll = {
        dieType: clickedDieType,
        value: Math.floor(Math.random() * clickedDieType) + 1,
      };

      rolls.push(roll);

      return {
        ...state,
        currentDieType: clickedDieType,
        currentRolls: rolls,
        history: newHistory,
      };
      break;
    }
    case "option-change": {
      const { newOptions } = action;
      return {
        ...state,
        options: newOptions,
      };
      break;
    }
    case "show-options": {
      return {
        ...state,
        optionsView: true,
      };
      break;
    }
    case "hide-options": {
      return {
        ...state,
        optionsView: false,
      };
    }
    case "clear": {
      const { currentRolls, history, options } = state;
      let newHistory = history;
      if (currentRolls.length > 0) {
        newHistory.push({
          accumulate: options.accumulate.active,
          dropHighest: options.dropHighest.active,
          dropLowest: options.dropLowest.active,
          rolls: currentRolls,
        });
      }
      newHistory = newHistory.slice(Math.max(newHistory.length - 5, 0));

      return {
        ...state,
        currentRolls: [],
        history: newHistory,
      };
      break;
    }
    default:
      console.error("Incorrect dispatch");
      return state;
      break;
  }
};

const Dice = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  let scrollRef = React.createRef<HTMLLIElement>();

  // Keep the current rolls div scrolled to the right for new rolls
  useEffect(() => {
    const ref = scrollRef.current;
    if (ref !== null && ref.parentElement !== null) {
      ref.parentElement.scrollTo(ref.getBoundingClientRect().right, 0);
    }
  });

  const renderRolls = (
    timeframe: string,
    rollHistory: RollHistory,
    setIndex: number,
  ) => {
    let lowest: Roll;
    let highest: Roll;
    let sum: number;

    if (rollHistory.dropHighest || rollHistory.dropLowest) {
      // Making a second copy so the original isn't sorted
      let rollCopy = rollHistory.rolls.map(item => item);
      rollCopy.sort((a, b) => a.value - b.value);
      lowest = rollCopy[0];
      if (rollHistory.dropLowest) {
        rollCopy.splice(0, 1);
      }
      highest = rollCopy[rollCopy.length - 1];
      if (rollHistory.dropHighest) {
        rollCopy.splice(rollCopy.length - 1, 1);
      }
      sum = rollCopy.reduce((acc, roll) => acc + roll.value, 0);
    } else {
      sum = rollHistory.rolls.reduce((acc, roll) => acc + roll.value, 0);
    }

    return (
      <div key={setIndex} className="sc-dice__history-row">
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
              data-value={roll.value}
            >
              {roll.value}
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
                  rollHistory.accumulate ||
                  rollHistory.rolls.some(
                    rh => rh.dieType !== rollHistory.rolls[0].dieType,
                  )
                    ? "?"
                    : rollHistory.rolls[0].dieType
                }${rollHistory.rolls.length === 1 ? "" : "s"}`
              : null}
          </span>
        </span>
      </div>
    );
  };

  const renderHistory = () => {
    return state.history.map((historySet, index) =>
      renderRolls("past", historySet, index),
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
            clickedDieType: button,
          });
        }}
      >
        {button}
      </button>
    ));
  };

  const handleOptionChange = (name: string) => {
    const option = Object.entries<Option>(state.options).find(
      (o: [string, Option]) => o[1].displayName === name,
    );
    if (option !== undefined) {
      const newValue = !option[1].active;
      dispatch({
        type: "option-change",
        newOptions: {
          ...state.options,
          [option[0]]: {
            active: newValue,
            displayName: option[1].displayName,
          },
        },
      });
    }
  };

  const renderOptions = () => {
    // Sorting this because iOS Safari reorders the list based on recently updated
    return Object.values<Option>(state.options)
      .sort((a: Option, b: Option) => (a.displayName > b.displayName ? 1 : -1))
      .map((value: Option) => (
        <label key={value.displayName} className="sc-dice-option">
          <input
            type="checkbox"
            defaultChecked={value.active}
            onChange={() => handleOptionChange(value.displayName)}
          />
          {value.displayName}
        </label>
      ));
  };

  const showOptions = () => {
    dispatch({
      type: "show-options",
    });
  };

  const hideOptions = () => {
    if (state.optionsView) {
      dispatch({
        type: "hide-options",
      });
    }
  };

  return (
    <>
      <div className="sc-dice-container">
        <CSSTransition
          classNames="options-transition"
          key="options"
          timeout={{ enter: 300, exit: 300 }}
          in={state.optionsView}
          unmountOnExit
        >
          <div className="sc-dice__options-flyout">
            <span className="sc-dice__options-callout" onClick={hideOptions}>
              &larr; Close Options
            </span>
            {renderOptions()}
            <button
              className="sc-dice__options-button"
              type="button"
              onClick={() => {
                dispatch({
                  type: "option-change",
                  newOptions: {
                    ...defaultState.options,
                    dropLowest: {
                      active: true,
                      displayName: "Drop Lowest Roll",
                    },
                  },
                });
                dispatch({
                  type: "clear",
                });

                for (let i = 0; i < 6; i += 1) {
                  for (let j = 0; j < 4; j += 1) {
                    dispatch({
                      type: "roll",
                      clickedDieType: 6,
                    });
                  }
                  if (i < 5) {
                    dispatch({
                      type: "clear",
                    });
                  }
                }
                dispatch({
                  type: "hide-options",
                });
              }}
            >
              Roll Stats
            </button>
          </div>
        </CSSTransition>
        <div className="sc-dice__display" onClick={hideOptions}>
          <span className="sc-dice__options-callout" onClick={showOptions}>
            Options &rarr;
          </span>
          <div className="sc-dice__history">{renderHistory()}</div>
          <div className="sc-dice__current">
            {renderRolls(
              "current",
              {
                accumulate: state.options.accumulate.active,
                dropHighest: state.options.dropHighest.active,
                dropLowest: state.options.dropLowest.active,
                rolls: state.currentRolls,
              },
              7,
            )}
          </div>
        </div>
        <div className="sc-dice__buttons" onClick={hideOptions}>
          {renderButtons()}
          <button
            className="sc-dice-button"
            onClick={e => {
              e.preventDefault();
              dispatch({
                type: "clear",
              });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default Dice;
