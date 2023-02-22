import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header.js";

describe("App", () => {
  it("should have Header with text 'Memory Game'", () => {
    render(<Header />);
    expect(screen.getByTestId("Header")).toBeVisible();
    expect(screen.getByText(/Memory Game/)).toBeVisible();
  });
});
