import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BoardContainer } from "./Board.js";
import { Provider } from "react-redux";
import store from "../../redux/store.js";
import { AppContainer } from "../../App.js";

const {
  cardsMismatched,
  flipUnmatchedCards,
  boardCards,
  gridColumns,
  flipCard,
} = store.getState();

describe("Board", () => {
  let board;
  beforeEach(() => {
    board = (
      <Provider store={store}>
        <BoardContainer
          cardsMismatched={cardsMismatched}
          flipUnmatchedCards={flipUnmatchedCards}
          boardCards={boardCards}
          gridColumns={gridColumns}
          flipCard={flipCard}
        />
      </Provider>
    );
  });

  it("should render without errors and render the Button component'", () => {
    render(board);
    expect(screen.getByTestId("Board")).toBeVisible();
    expect(screen.getByTestId("Restart Game")).toBeVisible();
  });
});

describe("BoardCard", () => {
  let matchingCards = [];
  let differingCards = [];
  let app;

  beforeEach(() => {
    app = (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );

    matchingCards = store
      .getState()
      .boardCards.filter(
        (card) => card.alternativeBackground === "rgb(139,69,19)"
      );

    differingCards = [
      store
        .getState()
        .boardCards.filter(
          (card) => card.alternativeBackground === "rgb(225,225,0)"
        )[0],
      store
        .getState()
        .boardCards.filter(
          (card) => card.alternativeBackground === "rgb(255,0,0)"
        )[0],
    ];
  });

  afterEach(() => {
    matchingCards = [];
    differingCards = [];
    const restartButton = screen.getByTestId("Restart Game");
    fireEvent.click(restartButton);
  });

  it("should have boardCard with Id '0'", () => {
    render(app);
    const startGameButton = screen.getByTestId("Start Game");
    fireEvent.click(startGameButton);
    expect(screen.getByTestId("Card0").style.backgroundColor).toBe(
      "rgb(43, 120, 228)"
    );
    expect(screen.getByTestId("Card0")).toBeVisible();
  });

  it("should change the backgroundColor of a boardCard when the boardCard is clicked", () => {
    render(app);
    const startGameButton = screen.getByTestId("Start Game");
    fireEvent.click(startGameButton);
    expect(screen.getByTestId("Card0").style.backgroundColor).toBe(
      "rgb(43, 120, 228)"
    );
    fireEvent.click(screen.getByTestId("Card0"));
    setTimeout(() => {
      expect(screen.getByTestId("Card0").style.backgroundColor).not.toBe(
        "rgb(43, 120, 228)"
      );
    }, 100);
  });

  it("should change the backgroundColor of both boardCards, if the two boardCards clicked are a mismatch", () => {
    render(app);
    const startGameButton = screen.getByTestId("Start Game");
    fireEvent.click(startGameButton);
    expect(
      screen.getByTestId(`Card${differingCards[0].cardId}`).style
        .backgroundColor
    ).toBe("rgb(43, 120, 228)");
    expect(
      screen.getByTestId(`Card${differingCards[1].cardId}`).style
        .backgroundColor
    ).toBe("rgb(43, 120, 228)");

    fireEvent.click(screen.getByTestId(`Card${differingCards[0].cardId}`));
    fireEvent.click(screen.getByTestId(`Card${differingCards[1].cardId}`));

    setTimeout(() => {
      expect(
        screen.getByTestId(`Card${differingCards[0].cardId}`).style
          .backgroundColor
      ).toBe("rgb(43, 120, 228)");
      expect(
        screen.getByTestId(`Card${differingCards[1].cardId}`).style
          .backgroundColor
      ).toBe("rgb(43, 120, 228)");
    }, 601);
  });

  it("should make the backgroundColor of both boardCards, if the two boardCards clicked are a matched", () => {
    render(app);
    const startGameButton = screen.getByTestId("Start Game");
    fireEvent.click(startGameButton);
    expect(
      screen.getByTestId(`Card${matchingCards[0].cardId}`).style.backgroundColor
    ).toBe("rgb(43, 120, 228)");
    expect(
      screen.getByTestId(`Card${matchingCards[1].cardId}`).style.backgroundColor
    ).toBe("rgb(43, 120, 228)");

    fireEvent.click(screen.getByTestId(`Card${matchingCards[0].cardId}`));
    fireEvent.click(screen.getByTestId(`Card${matchingCards[1].cardId}`));

    setTimeout(() => {
      expect(
        screen.getByTestId(`Card${matchingCards[0].cardId}`).style
          .backgroundColor
      ).toBe("rgb(139,69,19)");
      expect(
        screen.getByTestId(`Card${matchingCards[1].cardId}`).style
          .backgroundColor
      ).toBe("rgb(139,69,19)");
    }, 601);
  });
});
