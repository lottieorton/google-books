import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchTermProvider, { useSearchTerm } from "./SearchTermContext";
import userEvent from "@testing-library/user-event";

const MockChild = () => {
  const { searchTerm, onSearch } = useSearchTerm();

  return (
    <div>
      <div data-testid="search-term">{searchTerm ?? "null"}</div>
      <button data-testid="btn" onClick={() => onSearch("Search actioned")}>
        Search
      </button>
    </div>
  );
};

describe("SearchTermContext", () => {
  it("Should initialise with default null search term", () => {
    //ARRANGE
    render(
      <SearchTermProvider>
        <MockChild />
      </SearchTermProvider>,
    );
    //ACT
    const searchTerm = screen.getByTestId("search-term");
    //ASSERT
    expect(searchTerm).toHaveTextContent("null");
  });

  it("Should update searchTerm value when onSearch is called", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <SearchTermProvider>
        <MockChild />
      </SearchTermProvider>,
    );
    //ACT
    const searchBtn = screen.getByRole("button");
    await user.click(searchBtn);
    //ASSERT
    expect(screen.getByTestId("search-term")).toHaveTextContent(
      "Search actioned",
    );
  });
});
