import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NoBooks from "./NoBooksView";
import { SearchTermContext } from "../../context/SearchTermContext";

describe("NoBooks", () => {
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
    render(
      <SearchTermContext.Provider value={{ searchTerm: "test search" }}>
        <NoBooks />
      </SearchTermContext.Provider>,
    );
    //ACT
    const noBooksDisplay = screen.getByTestId("mock-results-issues");
    const icon = screen.getByTestId("noBookIcon");
    const type = screen.getByText("noBook");
    const header = screen.getByText('No books found for "test search"');
    const text = screen.getByText(
      "Try checking your spelling, using different keywords or broadening your search.",
    );
    //ASSERT
    expect(noBooksDisplay).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
