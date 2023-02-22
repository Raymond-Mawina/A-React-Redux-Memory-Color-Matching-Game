import React from "react";
import { render, screen } from "@testing-library/react";
import CardFlipCounter from "./CardFlipCounter.js";
import { Provider } from "react-redux";
import store from "../../redux/store.js";

describe("CardFlipCounter", () => {
  const cardFlipComponent = (
    <Provider store={store}>
      <CardFlipCounter cardFlips={4} allCardsMatched={false} />
    </Provider>
  );
  it("should render without errors", () => {
    render(cardFlipComponent);
    expect(screen.getByTestId("CardFlipCounter")).toBeVisible();
  });

  it("should render the Message component", () => {
    render(cardFlipComponent);
    expect(screen.getByTestId("Message")).toBeVisible();
  });

  it("should display the text 'You have taken 4 turns'", () => {
    render(cardFlipComponent);
    expect(screen.getByText("You have taken 4 turns")).toBeVisible();
  });

  it("should display the text 'It took you 5 turns to win the game'", () => {
    render(
      <Provider store={store}>
        <CardFlipCounter cardFlips={4} allCardsMatched={true} />
      </Provider>
    );
    expect(
      screen.getByText("It took you 4 turns to win the game")
    ).toBeVisible();
  });
});
