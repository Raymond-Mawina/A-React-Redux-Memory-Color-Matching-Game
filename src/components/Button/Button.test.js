import React from "react";
import { render, screen } from "@testing-library/react";
import { ButtonContainer } from "./Button.js";
import { Provider } from "react-redux";
import store from "../../redux/store.js";

describe("Button", () => {
  it("should have Button with text 'Click to Play Again :)'", () => {
    render(
      <Provider store={store}>
        <ButtonContainer label="Restart Game" />
      </Provider>
    );
    expect(screen.getByTestId("Restart Game")).toBeVisible();
  });
});
