import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookList from "./BookList";
import { SearchTermContext } from "../../context/SearchTermContext/SearchTermContext";
import { BookResultsContext } from "../../context/BookResultContext/BookResultContext";
import userEvent from "@testing-library/user-event";

vi.mock("../BookCard/BookCard", () => {
  return {
    default: function MockBookCard(props) {
      return (
        <div
          data-testid={`book ${props.index}`}
          onClick={() => props.selectBook(props.book.id)}
        >
          <p>{`${props.book.title}, Color ${props.bgColorNum}`}</p>
        </div>
      );
    },
  };
});

const mockBookModalSpy = vi.fn();
vi.mock("../BookModal/BookModal", () => {
  return {
    default: function MockBookModal(props) {
      mockBookModalSpy(props);
      return <div data-testid="book-modal" />;
    },
  };
});

describe("BookList", () => {
  const books = [
    {
      id: 0,
      title: "Test Book1",
    },
    {
      id: 1,
      title: "Test Book2",
    },
    {
      id: 2,
      title: "Test Book3",
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
    const book1 = screen.getByText("Test Book1, Color 0");
    const book2 = screen.getByText("Test Book2, Color 1");
    const book3 = screen.getByText("Test Book3, Color 2");
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

  it("Should not render BookModal when there's no selected book", () => {
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
    // ACT
    const bookModal = screen.queryByTestId("book-modal");
    // ASSERT
    expect(bookModal).not.toBeInTheDocument();
  });

  it("Should render the BookModal when the card is clicked, with correct props", async () => {
    //ARRANGE
    const user = userEvent.setup();
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
    expect(screen.queryByTestId("book-modal")).not.toBeInTheDocument();
    const bookCard = screen.getByTestId("book 0");
    await user.click(bookCard);
    // ASSERT
    expect(screen.getByTestId("book-modal")).toBeInTheDocument();
    expect(mockBookModalSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        book: books[0],
        bgColorNum: 0,
        onClose: expect.any(Function),
      }),
    );
  });

  it("Should close the BookModal when the modal calls onClose passed into it", async () => {
    //ARRANGE
    const user = userEvent.setup();
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
    const bookCard = screen.getByTestId("book 0");
    await user.click(bookCard);
    expect(screen.getByTestId("book-modal")).toBeInTheDocument();

    const lastMockCall = mockBookModalSpy.mock.lastCall[0];
    const triggerOnClose = lastMockCall.onClose;
    triggerOnClose();

    await waitFor(() => {
      expect(screen.queryByTestId("book-modal")).not.toBeInTheDocument();
    });
  });
});
