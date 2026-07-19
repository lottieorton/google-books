import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookList from "./BookList";
import { SearchTermContext } from "../../context/SearchTermContext";
import { BookResultsContext } from "../../context/BookResultContext";

vi.mock("../BookCard/BookCard", () => {
  return {
    default: function MockBookCard(props) {
      return <p>{`${props.book.title} ${props.index}`}</p>;
    },
  };
});

vi.mock("../BookCard/BookCardShell", () => {
  return {
    default: function MockBookCardShell(props) {
      return <p data-testid="book-card-shell">{props.key}</p>;
    },
  };
});

describe("BookList", () => {
  const books = [
    {
      id: 0,
      volumeInfo: {
        title: "Test Book1",
      },
    },
    {
      id: 1,
      volumeInfo: {
        title: "Test Book2",
      },
    },
    {
      id: 2,
      volumeInfo: {
        title: "Test Book3",
      },
    },
  ];

  it("Should render successful search results information and books", () => {
    //ARRANGE
    render(
      <SearchTermContext.Provider value={{ searchTerm: "test searchterm" }}>
        <BookResultsContext.Provider
          value={{
            books: books,
            totalNumBooks: 100,
          }}
        >
          <BookList />,
        </BookResultsContext.Provider>
      </SearchTermContext.Provider>,
    );
    //ACT
    const searchResultsHeader = screen.getByRole("heading", { level: 2 });
    const searchResultsPara = screen.getByText("100 books found");
    const book1 = screen.getByText("Test Book1 0");
    const book2 = screen.getByText("Test Book2 1");
    const book3 = screen.getByText("Test Book3 2");
    //ASSERT
    expect(searchResultsHeader).toBeInTheDocument();
    expect(searchResultsHeader).toHaveTextContent(
      `Results for "test searchterm"`,
    );
    expect(searchResultsPara).toBeInTheDocument();
    expect(book1).toBeInTheDocument();
    expect(book2).toBeInTheDocument();
    expect(book3).toBeInTheDocument();
  });

  it("Should render empty books correctly", () => {
    //ARRANGE
    const books = [];
    render(
      <SearchTermContext.Provider value={{ searchTerm: "test searchterm" }}>
        <BookResultsContext.Provider
          value={{
            books: books,
            totalNumBooks: 0,
          }}
        >
          <BookList />,
        </BookResultsContext.Provider>
      </SearchTermContext.Provider>,
    );
    //ACT
    const grid = screen.getByTestId("book-grid");
    //ASSERT
    expect(grid).toBeInTheDocument();
    expect(grid).toBeEmptyDOMElement();
  });

  it("Should render 10 empty containers when isLoading", () => {
    //ARRANGE
    render(
      <SearchTermContext.Provider value={{ searchTerm: "test searchterm" }}>
        <BookResultsContext.Provider
          value={{
            books: [],
            // totalNumBooks: ,
          }}
        >
          <BookList isLoading />,
        </BookResultsContext.Provider>
      </SearchTermContext.Provider>,
    );
    //ACT
    const bookCardShells = screen.getAllByTestId("book-card-shell");
    //ASSERT
    expect(bookCardShells).toHaveLength(10);
  });

  it("Shouldn't render search term results message when isLoading", () => {
    //ARRANGE
    render(
      <SearchTermContext.Provider value={{ searchTerm: "test searchterm" }}>
        <BookResultsContext.Provider
          value={{
            books: [],
            // totalNumBooks: ,
          }}
        >
          <BookList isLoading />,
        </BookResultsContext.Provider>
      </SearchTermContext.Provider>,
    );
    //ACT
    const bookCardShells = screen.getAllByTestId("book-card-shell");
    const searchResultsHeader = screen.queryByRole("heading", { level: 2 });
    //ASSERT
    expect(bookCardShells).toHaveLength(10);
    expect(searchResultsHeader).not.toBeInTheDocument();
  });
});
