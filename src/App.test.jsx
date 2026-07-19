import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import BooksContainer from "./containers/BooksContainer/BooksContainer";

vi.mock("./components/Header/Header", () => {
  return {
    default: vi.fn(() => {
      return <div data-testid="header" />;
    }),
  };
});
const mockSearchBarSpy = vi.fn();
vi.mock("./components/SearchBar/SearchBar", () => {
  return {
    default: function MockSearchBar(props) {
      mockSearchBarSpy(props);
      return <div data-testid="search-bar" />;
    },
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
    expect(mockSearchBarSpy).toHaveBeenCalledOnce();
    expect(BooksContainer).toHaveBeenCalledOnce();
  });

  it("Should pass the correct props to children", () => {
    //ARRANGE
    render(<App />);
    //ASSERT
    expect(mockSearchBarSpy).toHaveBeenCalledOnce();
    expect(BooksContainer).toHaveBeenCalledOnce();
    expect(mockSearchBarSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({ onSearch: expect.any(Function) }),
    );
    expect(BooksContainer).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: null }),
      undefined,
    );
  });

  it("Should pass an updated search term when onSearch is called", async () => {
    //ARRANGE
    render(<App />);
    //ACTION
    const searchBarProps = mockSearchBarSpy.mock.lastCall[0];
    await waitFor(() => {
      searchBarProps.onSearch("hello");
    });
    //ASSERT
    expect(BooksContainer).toHaveBeenCalledTimes(2);
    expect(BooksContainer).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: null }),
      undefined,
    );
    expect(BooksContainer).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: "hello" }),
      undefined,
    );
  });
});
