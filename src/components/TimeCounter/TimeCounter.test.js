import React from "react";
import { act, render, screen } from "@testing-library/react";
import TimeCounter from "./TimeCounter.js";
import { Provider } from "react-redux";
import store from "../../redux/store.js";

describe("Counter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <TimeCounter
          allCardsMatched={false}
          startGame={true}
          restartClicked={false}
        />
      </Provider>
    );
    expect(screen.getByTestId("TimeCounter")).toBeVisible();
  });

  it("should render and update the timer to '0 minutes 7 seconds' after 7 seconds", () => {
    render(
      <Provider store={store}>
        <TimeCounter
          allCardsMatched={false}
          startGame={true}
          restartClicked={false}
        />
      </Provider>
    );

    for (let i = 0; i < 7000; i += 1000) {
      act(() => {
        jest.advanceTimersByTime(1001);
      });
    }

    expect(screen.getByText("0 minutes 7 seconds")).toBeVisible();
  });

  it("should render and update the timer to begin with text 'The game was completed' after the game was ended", () => {
    render(
      <Provider store={store}>
        <TimeCounter
          allCardsMatched={true}
          startGame={true}
          restartClicked={false}
        />
      </Provider>
    );

    expect(screen.getByText(/(The game was completed in)/)).toBeVisible();
  });
});
