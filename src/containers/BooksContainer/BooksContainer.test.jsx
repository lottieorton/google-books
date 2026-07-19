import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import BooksContainer from "./BooksContainer";
//import mocked components
import { getBooksBySearchTerm } from "../../services/books-service";
import BookList from "../../components/BookList/BookList";
import Pagination from "../../components/Pagination/Pagination";

//mocking Components and services
vi.mock("../../services/books-service", () => ({
  getBooksBySearchTerm: vi.fn(),
}));
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
const mockBookListSpy = vi.fn();
vi.mock("../../components/BookList/BookList", () => {
  return {
    default: function MockBookList(props) {
      mockBookListSpy(props);
      return <div data-testid={`book-list-isLoading-${props.isLoading}`} />;
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

  it("Should render the Header component when it starts in a pending state", () => {
    //ACT
    const { container } = render(<BooksContainer searchTerm={null} />);
    //ASSERT
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Should not call getBooksBySearchTerm for empty search term", () => {
    //ACT
    const { container } = render(<BooksContainer searchTerm="" />);
    //ASSERT
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(getBooksBySearchTerm).not.toHaveBeenCalled();
  });

  it("Should render the BookList component when status is loading", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockReturnValue(new Promise(() => {}));
    render(<BooksContainer searchTerm="book" />);
    //ASSERT
    await waitFor(() => {
      expect(
        screen.getByTestId("book-list-isLoading-true"),
      ).toBeInTheDocument();
    });
  });

  it("Should render the FetchErrorView if status is error", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockRejectedValue(() => {});
    render(<BooksContainer searchTerm="error" />);
    //ACT
    await waitFor(() => {
      expect(screen.getByTestId("fetch-error-view")).toBeInTheDocument();
    });
  });

  it("Should render the NoBooks view if status is success and books has zero length", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockEmptyData);
    render(<BooksContainer searchTerm="empty" />);
    //ACT
    await waitFor(() => {
      expect(screen.getByTestId("no-books-view")).toBeInTheDocument();
    });
  });

  it("Should render the NoBooks view if status is success and there were no books", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue({});
    render(<BooksContainer searchTerm="empty" />);
    //ACT
    await waitFor(() => {
      expect(screen.getByTestId("no-books-view")).toBeInTheDocument();
    });
  });

  it("Should render the BookList and Pagination views if status is success and returns some books", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    render(<BooksContainer searchTerm="success" />);
    //ACT
    await waitFor(() => {
      expect(
        screen.getByTestId("book-list-isLoading-undefined"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });

  it("Should pass the correct props to the BookList and Pagination views if status is success and returns some books", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    render(<BooksContainer searchTerm="success" />);
    //ACT
    await waitFor(() => {
      expect(
        screen.getByTestId("book-list-isLoading-undefined"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
      expect(mockBookListSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          books: mockBooksData.items,
          searchTerm: "success",
          totalNumBooks: mockBooksData.totalItems,
        }),
      );
      expect(mockPaginationsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          currentPage: 0,
          totalNumBooks: 10,
          onNext: expect.any(Function),
          onPrevious: expect.any(Function),
        }),
      );
    });
  });

  it("Should set current page to 0 if a new search term is received", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    const { rerender } = render(<BooksContainer searchTerm="first" />);
    //ACT
    await waitFor(() => {
      expect(mockPaginationsSpy).toHaveBeenCalled();
      expect(mockPaginationsSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          currentPage: 0,
        }),
      );
    });
    const paginationProps = mockPaginationsSpy.mock.lastCall[0];
    paginationProps.onNext();
    await waitFor(() => {
      expect(mockPaginationsSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          currentPage: 1,
        }),
      );
    });
    rerender(<BooksContainer searchTerm="second" />);
    await waitFor(() => {
      expect(mockPaginationsSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          currentPage: 0,
        }),
      );
    });
  });
});
