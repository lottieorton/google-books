import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
//import mocked components
import { getBooksBySearchTerm } from "../services/books-service";
import BookResultsProvider, { useBookResults } from "./BookResultContext";
import { SearchTermContext } from "./SearchTermContext";

//mocking Components and services
vi.mock("../services/books-service", () => ({
  getBooksBySearchTerm: vi.fn(),
}));

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

const MockChild = () => {
  const { books, status, error, totalNumBooks, currentPage, setCurrentPage } =
    useBookResults();

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="currentPage">{currentPage}</div>
      <div data-testid="totalNumBooks">{totalNumBooks}</div>
      <div data-testid="books">
        {books
          ? books.map((book, i) => (
              <div key={i} data-testid={`book-item-${book.id}`}>
                {book.name}
              </div>
            ))
          : "null"}
      </div>
      <button
        data-testid="btn"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};
const renderProvider = (searchTerm = "") => {
  return render(
    <SearchTermContext.Provider value={{ searchTerm }}>
      <BookResultsProvider>
        <MockChild />
      </BookResultsProvider>
    </SearchTermContext.Provider>,
  );
};

describe("BookResultContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should initialize with correct defaults when no search term is provided", () => {
    //ARRANGE
    renderProvider("");
    //ACT
    const status = screen.getByTestId("status");
    const error = screen.getByTestId("error");
    const currentPage = screen.getByTestId("currentPage");
    const totalNumBooks = screen.getByTestId("totalNumBooks");
    const books = screen.getByTestId("books");
    //ASSERT
    expect(status).toHaveTextContent("pending");
    expect(error).toHaveTextContent("");
    expect(currentPage).toHaveTextContent("0");
    expect(totalNumBooks).toHaveTextContent("0");
    expect(books).toHaveTextContent("null");
  });

  it("Should have status as loading when a search term is set", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockReturnValue(new Promise(() => {}));
    renderProvider("book");
    //ASSERT
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("loading");
      expect(getBooksBySearchTerm).toHaveBeenCalledWith("book", 0);
    });
  });

  it("Should have status as error and an error message if API rejects", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockRejectedValue(
      new Error("No books found"),
    );
    renderProvider("empty");
    //ACT
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("error");
      expect(screen.getByTestId("error")).toHaveTextContent("No books found");
    });
  });

  it("Should have status as success if API resolves", async () => {
    //ARRANGE
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    renderProvider("successful");
    //ACT
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("success");
      expect(screen.getByTestId("currentPage")).toHaveTextContent("0");
      expect(screen.getByTestId("totalNumBooks")).toHaveTextContent("10");
      expect(screen.getByTestId("book-item-1")).toHaveTextContent("book1");
      expect(screen.getByTestId("book-item-2")).toHaveTextContent("book");
    });
  });

  it("Should adjust current page and execute a new search when changing page", async () => {
    //ARRANGE
    const user = userEvent.setup();
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    renderProvider("pagination");
    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("success"),
    );
    //ACT
    const nextBtn = screen.getByTestId("btn");
    await user.click(nextBtn);
    //ASSERT
    expect(screen.getByTestId("currentPage")).toHaveTextContent(1);
    expect(getBooksBySearchTerm).toHaveBeenCalledWith("pagination", 20);
  });

  it("Should reset current page to 0 if a new search term is received", async () => {
    //ARRANGE
    const user = userEvent.setup();
    vi.mocked(getBooksBySearchTerm).mockResolvedValue(mockBooksData);
    const { rerender } = renderProvider("first");
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("success");
    });
    //ACT
    const nextBtn = screen.getByTestId("btn");
    await user.click(nextBtn);
    expect(screen.getByTestId("currentPage")).toHaveTextContent(1);
    rerender(
      <SearchTermContext.Provider value={{ searchTerm: "second" }}>
        <BookResultsProvider>
          <MockChild />
        </BookResultsProvider>
      </SearchTermContext.Provider>,
    );
    expect(screen.getByTestId("currentPage")).toHaveTextContent(0);
    expect(getBooksBySearchTerm).toHaveBeenLastCalledWith("second", 0);
  });
});
