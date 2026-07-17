import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookList from "./BookList";

vi.mock("../BookCard/BookCard", () => {
  return {
    default: function MockBookCard(props) {
      return <p>{`${props.book.title} ${props.index}`}</p>;
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

  it("Should renders search results", () => {
    //ARRANGE
    render(
      <BookList
        books={books}
        searchTerm="test searchterm"
        totalNumBooks={100}
      />,
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
      <BookList books={books} searchTerm="test searchterm" totalNumBooks={0} />,
    );
    //ACT
    const grid = screen.getByTestId("book-grid");
    //ASSERT
    expect(grid).toBeInTheDocument();
    expect(grid).toBeEmptyDOMElement();
  });
});
