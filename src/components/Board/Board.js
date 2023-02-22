import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { connect } from "react-redux";

import {
  flipCardAction,
  flipUnmatchedCardsAction,
  resetBoardAction,
  setStartGameAction,
} from "../../redux/features/board/actions.js";
import { ButtonContainer } from "../Button/Button.js";

function Board({
  cardsMismatched,
  flipUnmatchedCards,
  boardCards,
  gridColumns,
  flipCard,
  resetBoard,
  setStateGame,
}) {
  useEffect(() => {
    if (cardsMismatched) {
      setTimeout(() => {
        flipUnmatchedCards();
      }, 600);
    }
  }, [cardsMismatched, flipUnmatchedCards]);

  const handleRestartGame = () => {
    resetBoard();
    setStateGame();
  };

  return (
    <Grid
      data-testid="Board"
      container
      gap={0.9}
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: "20px" }}
    >
      {boardCards.map((arrayElement) => (
        <Grid
          data-testid={"Card" + arrayElement.cardId}
          item
          key={arrayElement.cardId}
          xs={
            gridColumns === 1
              ? 8
              : gridColumns === 2
              ? 5
              : gridColumns === 3
              ? 3.2
              : gridColumns === 4
              ? 2.8
              : null
          }
          style={{
            backgroundColor: arrayElement.backgroundColor,
            height: "100px",
          }}
          onClick={() => {
            flipCard(arrayElement.cardId);
          }}
        ></Grid>
      ))}

      <ButtonContainer label="Restart Game" handleClick={handleRestartGame} />
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    boardCards: state.boardCards,
    cardsMismatched: state.cardsMismatched,
    gridRows: state.gridRows,
    gridColumns: state.gridColumns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (cardId) => dispatch(flipCardAction(cardId)),
    flipUnmatchedCards: () => dispatch(flipUnmatchedCardsAction()),
    resetBoard: () => dispatch(resetBoardAction()),
    setStateGame: () => dispatch(setStartGameAction()),
  };
};

export const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
