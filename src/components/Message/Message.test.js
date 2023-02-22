import React from "react";
import { render, screen } from "@testing-library/react";
import { Message } from "./Message.js";

describe("Message", () => {
  it("should have Message with text message passed in as a props", () => {
    render(<Message message="We are currently testing" />);
    expect(screen.getByTestId("Message")).toBeVisible();
    expect(screen.getByText(/We are currently testing/)).toBeVisible();
  });
});
