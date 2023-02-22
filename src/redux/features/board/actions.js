import types from "./types.js";

export const flipCardAction = (cardId) => ({
  type: types.FLIP_CARD,
  payload: { id: cardId },
});

export const flipUnmatchedCardsAction = () => ({
  type: types.FLIP_UNMATCHED_CARDS,
});

export const resetBoardAction = () => ({
  type: types.RESET_BOARD,
});

export const setGridRowsAction = (gridRows) => ({
  type: types.SET_GRID_ROWS,
  gridRows: gridRows,
});

export const setGridColumnsAction = (gridColumns) => ({
  type: types.SET_GRID_COLUMNS,
  gridColumns: gridColumns,
});

export const setStartGameAction = () => ({
  type: types.SET_START_GAME,
});
