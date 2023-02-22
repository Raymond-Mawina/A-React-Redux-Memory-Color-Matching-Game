import types from "./types.js";
import { formErrors, getBoardCards } from "./utilities.js";

const initialState = {
  boardCards: [],
  allCardsMatched: false,
  cardMismatched: false,
  gridRows: 4,
  gridColumns: 4,
  startGame: false,
  startGameFormErrors: [],
  firstClick: false,
  startTime: "",
  totalTime: "",
  restartClicked: false,
  cardFlips: 0,
};

export const cardReducer = (state = initialState, action) => {
  let index,
    stateCopy,
    allCardsMatched = false,
    cardsMismatched = false;

  switch (action.type) {
    case types.FLIP_CARD:
      if (!state.firstClick) {
        state.startTime = new Date().toLocaleTimeString();
        state.firstClick = true;
      }

      index = state.boardCards.findIndex(
        (card) => card.cardId === action.payload.id
      );

      stateCopy = [...state.boardCards];

      if (
        stateCopy.filter((card) => card.flipped === true).length < 2 &&
        stateCopy[index].matched === false
      ) {
        stateCopy[index].backgroundColor =
          stateCopy[index].alternativeBackground;
        stateCopy[index].flipped = true;
      }

      if (
        stateCopy.filter(
          (card) => card.flipped === true && card.matched === false
        ).length >= 2
      ) {
        const matchingCards = stateCopy
          .filter((card) => card.flipped === true)
          .filter(
            (card) => card.backgroundColor === stateCopy[index].backgroundColor
          );
        if (matchingCards.length > 1) {
          const indexesOfmatchedCards = matchingCards.map(
            (card) => card.cardId
          );

          for (const indexx of indexesOfmatchedCards) {
            stateCopy[indexx].flipped = false;
            stateCopy[indexx].matched = true;
          }

          state.cardFlips++;
        } else {
          state.cardFlips++;
          cardsMismatched = true;
        }
      }

      if (
        stateCopy.filter((card) => card.matched === true).length ===
        state.gridColumns * state.gridRows
      ) {
        const startTime = state.startTime.split(":");
        const finishTime = new Date().toLocaleTimeString().split(":");
        let totalMinutes = parseInt(finishTime[1] - startTime[1]),
          totalSeconds = parseInt(finishTime[2] - startTime[2]);

        if (totalMinutes < 0) totalMinutes = 60 + totalMinutes;

        if (totalSeconds < 0) totalSeconds = 60 + totalSeconds;

        let minutesText, secondsText;

        if (totalMinutes === 1) minutesText = "minute";
        else minutesText = "minutes";

        if (totalSeconds === 1) secondsText = "second";
        else secondsText = "seconds";

        state.totalTime = `The game lasted ${totalMinutes} ${minutesText} ${totalSeconds} ${secondsText}`;

        allCardsMatched = true;
      }

      return {
        ...state,
        boardCards: stateCopy,
        allCardsMatched: allCardsMatched,
        cardsMismatched: cardsMismatched,
      };

    case types.FLIP_UNMATCHED_CARDS:
      stateCopy = [...state.boardCards];
      for (let i = 0; i < stateCopy.length; i++) {
        if (!stateCopy[i].matched) {
          stateCopy[i].flipped = false;
          stateCopy[i].backgroundColor = "rgb(43, 120, 228)";
        }
      }

      cardsMismatched = false;

      return {
        ...state,
        boardCards: stateCopy,
        cardsMismatched: cardsMismatched,
      };
    case types.SET_GRID_ROWS:
      return {
        ...state,
        gridRows: action.gridRows,
      };

    case types.SET_GRID_COLUMNS:
      return {
        ...state,
        gridColumns: action.gridColumns,
      };

    case types.SET_START_GAME:
      if ((state.gridColumns * state.gridRows) % 2 === 1) {
        return {
          ...state,
          startGameFormErrors: [formErrors.OddNumber],
        };
      }
      return {
        ...state,
        startGame: !state.startGame,
        boardCards: [...getBoardCards(state.gridRows * state.gridColumns)],
      };

    case types.RESET_BOARD:
      return {
        ...state,
        boardCards: [...getBoardCards(state.gridRows * state.gridColumns)],
        allCardsMatched: false,
        firstClick: false,
        startTime: "",
        restartClicked: true,
        cardFlips: 0,
      };

    default:
      return state;
  }
};
