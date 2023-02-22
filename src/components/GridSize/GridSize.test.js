import React from "react";
import { render, screen, within } from "@testing-library/react";
import { GridSizeContainer } from "./GridSize.js";
import { Provider } from "react-redux";
import store from "../../redux/store.js";
import userEvent from "@testing-library/user-event";

describe("GridSize", () => {
  let gridSizeForm;
  beforeEach(() => {
    gridSizeForm = (
      <Provider store={store}>
        <GridSizeContainer />
      </Provider>
    );
  });

  it("should render Form to Select Grid sizes", () => {
    render(gridSizeForm);
    expect(screen.getByTestId("GridSize")).toBeVisible();
  });

  it("should render a Form whose select dropdown(s) is changeable", async () => {
    render(gridSizeForm);

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
  });
});
