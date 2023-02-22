import React from "react";
import { Header } from "./components/Header/Header.js";
import { Box } from "@mui/material";
import { BoardContainer } from "./components/Board/Board.js";
import { Message } from "./components/Message/Message.js";
import { connect } from "react-redux";
import { GridSizeContainer } from "./components/GridSize/GridSize.js";
import TimeCounter from "./components/TimeCounter/TimeCounter.js";
import CardFlipCounter from "./components/CardFlipCounter/CardFlipCounter.js";

export function App({
  startGame,
  allCardsMatched,
  restartClicked,
  firstClick,
  cardFlips,
}) {
  return (
    <Box data-testid="App">
      <Header />
      {!startGame && <GridSizeContainer />}
      {startGame && <BoardContainer />}
      {allCardsMatched && <Message message="You Win!!, Game Over" />}
      {firstClick && (
        <TimeCounter
          startGame={startGame}
          allCardsMatched={allCardsMatched}
          restartClicked={restartClicked}
        ></TimeCounter>
      )}

      {firstClick && (
        <CardFlipCounter
          cardFlips={cardFlips}
          allCardsMatched={allCardsMatched}
        ></CardFlipCounter>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    allCardsMatched: state.allCardsMatched,
    startGame: state.startGame,
    restartClicked: state.restartClicked,
    firstClick: state.firstClick,
    cardFlips: state.cardFlips,
  };
};

export const AppContainer = connect(mapStateToProps)(App);
