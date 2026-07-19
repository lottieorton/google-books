import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FetchError from "./FetchErrorView";

describe("FetchError", () => {
  vi.mock("./ResultsIssues", () => {
    return {
      default: function MockResultsIssues(props) {
        return (
          <div data-testid="mock-results-issues">
            <p>{props.children}</p>
            <p>{props.type}</p>
            <p>{props.header}</p>
            <p>{props.text}</p>
          </div>
        );
      },
    };
  });
  it("Should pass correct props to ResultsIssues", () => {
    //ARRANGE
    render(<FetchError />);
    //ACT
    const errorDisplay = screen.getByTestId("mock-results-issues");
    const icon = screen.getByText("android_wifi_3_bar_off");
    const type = screen.getByText("error");
    const header = screen.getByText("Couldn't reach Google Books");
    const text = screen.getByText(
      "Check your internet connection and try again. If the problem persists, Google Books may be temporarily unavailable.",
    );
    //ASSERT
    expect(errorDisplay).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
