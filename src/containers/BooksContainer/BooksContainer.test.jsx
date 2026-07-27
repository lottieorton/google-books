import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import BooksContainer from "./BooksContainer";
//import mocked components
import { BookResultsContext } from "../../context/BookResultContext/BookResultContext";

//mocking Components and services
vi.mock("../../components/Header/Header", () => {
  return {
    default: function MockHeader(props) {
      return <div data-testid="header" />;
    },
  };
});
vi.mock("../../components/ResultsIssues/FetchErrorView", () => {
  return {
    default: function MockFetchErrorView(props) {
      return <div data-testid="fetch-error-view" />;
    },
  };
});
vi.mock("../../components/ResultsIssues/NoBooksView", () => {
  return {
    default: function MockNoBooksView(props) {
      return <div data-testid="no-books-view" />;
    },
  };
});
vi.mock("../../components/BookList/BookList", () => {
  return {
    default: function MockBookList() {
      return <div data-testid={`book-list`} />;
    },
  };
});
vi.mock("../../components/BookList/BookListShell", () => {
  return {
    default: function MockBookListShell() {
      return <div data-testid={`book-list-shell`} />;
    },
  };
});
const mockPaginationsSpy = vi.fn();
vi.mock("../../components/Pagination/Pagination", () => {
  return {
    default: function MockPagination(props) {
      mockPaginationsSpy(props);
      return <div data-testid="pagination" />;
    },
  };
});

const mockBooksData = {
  totalItems: 10,
  items: [
    { id: 1, name: "book1" },
    { id: 2, name: "book2" },
  ],
};

const mockEmptyData = {
  totalItems: 0,
  items: [],
};

describe("BooksContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the Header component when in a pending state", () => {
    //ACT
    const { container } = render(
      <BookResultsContext.Provider
        value={{
          status: "pending",
        }}
      >
        <BooksContainer />
      </BookResultsContext.Provider>,
    );
    //ASSERT
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Should render the BookListShell component when status is loading", () => {
    //ARRANGE
    render(
      <BookResultsContext.Provider
        value={{
          status: "loading",
        }}
      >
        <BooksContainer />
      </BookResultsContext.Provider>,
    );
    //ASSERT
    expect(screen.getByTestId("book-list-shell")).toBeInTheDocument();
  });

  it("Should render the NoBooks view if status is error with error message 'No Books Found'", () => {
    //ARRANGE
    render(
      <BookResultsContext.Provider
        value={{
          status: "error",
          error: "No books found",
        }}
      >
        <BooksContainer />
      </BookResultsContext.Provider>,
    );
    //ACT
    expect(screen.getByTestId("no-books-view")).toBeInTheDocument();
  });

  it("Should render the FetchErrorView if status is error with a non-'No Books Found' error message", () => {
    //ARRANGE
    render(
      <BookResultsContext.Provider
        value={{
          status: "error",
          error: "Bad request",
        }}
      >
        <BooksContainer />
      </BookResultsContext.Provider>,
    );
    //ACT
    expect(screen.getByTestId("fetch-error-view")).toBeInTheDocument();
  });

  it("Should render the BookList and Pagination views if status is success", () => {
    //ARRANGE
    render(
      <BookResultsContext.Provider
        value={{
          status: "success",
        }}
      >
        <BooksContainer />
      </BookResultsContext.Provider>,
    );
    //ACT
    expect(screen.getByTestId("book-list")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
