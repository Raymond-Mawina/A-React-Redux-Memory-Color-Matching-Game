import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { AppContainer } from "./App.js";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  let app;
  beforeEach(() => {
    app = (
      <Provider store={store}>
        <AppContainer startGame={false} allCardsMatched={false} />
      </Provider>
    );
  });
  it("should have childen Header and Board", () => {
    render(app);
    expect(screen.getByTestId("App")).toBeVisible();
    expect(screen.getByTestId("Header")).toBeVisible();
    expect(screen.getByTestId("GridSize")).toBeVisible();
  });

  it("should render the component Board with 4 card, when 'Start Game' button of the gridSize is clicked", async () => {
    render(app);

    const inputRows = screen.getByLabelText("Select number of grid row(s)");
    await userEvent.click(inputRows);
    const newerInputRows = await screen.getAllByLabelText(
      "Select number of grid row(s)"
    )[1];
    await userEvent.click(within(newerInputRows).getByText("2 Rows"));
    expect(screen.getAllByText("2 Rows")[0]).toBeVisible();

    const inputColumns = screen.getByLabelText(
      "Select number of grid column(s)"
    );
    await userEvent.click(inputColumns);
    const newerInputColumns = await screen.getAllByLabelText(
      "Select number of grid column(s)"
    )[1];
    await userEvent.click(within(newerInputColumns).getByText("2 Columns"));
    expect(screen.getAllByText("2 Columns")[0]).toBeVisible();

    fireEvent.click(screen.getByTestId("Start Game"));
    expect(screen.getByTestId("Board")).toBeVisible();
    expect(screen.getAllByTestId(/Card/).length).toEqual(4);
  });

  it("should be reset when Board's 'Restart Game' buttton is clicked", async () => {
    render(app);
    fireEvent.click(screen.getByTestId("Restart Game"));
    expect(screen.getByTestId("App")).toBeVisible();
    expect(screen.getByTestId("Header")).toBeVisible();
    expect(screen.getByTestId("GridSize")).toBeVisible();
  });

  it("should render the components TimeCounter and CardFlipCounter", async () => {
    render(app);

    const inputRows = screen.getByLabelText("Select number of grid row(s)");
    await userEvent.click(inputRows);
    const newerInputRows = await screen.getAllByLabelText(
      "Select number of grid row(s)"
    )[1];
    await userEvent.click(within(newerInputRows).getByText("1 Row"));
    expect(screen.getAllByText("1 Row")[0]).toBeVisible();

    const inputColumns = screen.getByLabelText(
      "Select number of grid column(s)"
    );
    await userEvent.click(inputColumns);
    const newerInputColumns = await screen.getAllByLabelText(
      "Select number of grid column(s)"
    )[1];
    await userEvent.click(within(newerInputColumns).getByText("2 Columns"));
    expect(screen.getAllByText("2 Columns")[0]).toBeVisible();

    fireEvent.click(screen.getByTestId("Start Game"));
    expect(screen.getByTestId("Board")).toBeVisible();
    expect(screen.getAllByTestId(/Card/).length).toEqual(2);

    const numberOfCards = screen.getAllByTestId(/Card/).length;
    for (let i = 0; i < numberOfCards; i++) {
      fireEvent.click(screen.getByTestId(`Card${i}`));
    }
    expect(screen.getByText("You Win!!, Game Over")).toBeVisible();
    expect(screen.getByTestId("TimeCounter")).toBeVisible();
    expect(screen.getByTestId("CardFlipCounter")).toBeVisible();
  });
});
