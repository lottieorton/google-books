import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import BooksContainer from "./containers/BooksContainer/BooksContainer";
import SearchBar from "./components/SearchBar/SearchBar";
import { useBookResults } from "./context/BookResultContext";

vi.mock("./context/BookResultContext", () => {
  return {
    default: function MockBookResultProvider({ children }) {
      return <div data-testid="book-result-provider">{children}</div>;
    },
  };
});
vi.mock("./context/SearchTermContext", () => {
  return {
    default: function MockSearchTermProvider({ children }) {
      return <div data-testid="search-term-provider">{children}</div>;
    },
  };
});
vi.mock("./components/SearchBar/SearchBar", () => {
  return {
    default: vi.fn(() => {
      return <div data-testid="search-bar" />;
    }),
  };
});
vi.mock("./containers/BooksContainer/BooksContainer", () => {
  return {
    default: vi.fn(() => {
      return <div data-testid="books-container" />;
    }),
  };
});

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render child components", () => {
    //ARRANGE
    render(<App />);
    //ASSERT
    expect(BooksContainer).toHaveBeenCalledOnce();
    expect(SearchBar).toHaveBeenCalledOnce();
    expect(screen.getByTestId("search-term-provider")).toBeInTheDocument();
    expect(screen.getByTestId("book-result-provider")).toBeInTheDocument();
  });
});
