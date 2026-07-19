import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import BookCard from "./BookCard";

const mockBookModalSpy = vi.fn();
vi.mock("../BookModal/BookModal", () => {
  return {
    default: function MockBookModal(props) {
      mockBookModalSpy(props);
      return props.isOpen ? (
        <div data-testid="book-modal-rendered" />
      ) : (
        <div data-testid="book-modal-not-rendered" /> //or null??
      );
    },
  };
});

describe("BookCard", () => {
  const book = {
    volumeInfo: {
      title: "Test Book",
      authors: ["Test Author", "Test Author 2"],
      categories: ["Test Category", "Test Category 2"],
      description: "This is a test description",
      imageLinks: {
        thumbnail: "https://example.com/test-image.jpg",
      },
    },
  };

  it("Should render component with book info", () => {
    //ARRANGE
    render(<BookCard key="123" book={book.volumeInfo} index={1} />);
    // ACT
    const imageElement = screen.getByRole("img", { name: "Test Book" });
    const categories = screen.getByText("Test Category, Test Category 2");
    const title = screen.getByText("Test Book");
    const authors = screen.getByText("Test Author, Test Author 2");
    const description = screen.getByText("This is a test description");
    // ASSERT
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://example.com/test-image.jpg",
    );
    expect(categories).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(authors).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("Should handle missing book data with default or blank elements", () => {
    //ARRANGE
    const emptyBook = {
      volumeInfo: {},
    };
    render(<BookCard key="123" book={emptyBook.volumeInfo} index={1} />);
    // ACT
    const defaultImageElement = screen.getByText("import_contacts");
    const textElements = screen.getAllByRole("paragraph");
    const title = screen.getByRole("heading", { level: 4 });
    // ASSERT
    expect(defaultImageElement).toBeInTheDocument();
    expect(title).toHaveTextContent("");
    // checking author and description elements
    expect(textElements).toHaveLength(2);
    expect(textElements[0]).toHaveTextContent("");
    expect(textElements[1]).toHaveTextContent("");
  });

  it("Should pass correct props to BookModal", () => {
    //ARRANGE
    render(<BookCard key="123" book={book.volumeInfo} index={1} />);
    // ASSERT
    expect(mockBookModalSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        book: book.volumeInfo,
        isOpen: false,
        bgColorNum: 1,
        onClose: expect.any(Function),
      }),
    );
  });

  it("Should have BookModal not open on initial load", () => {
    //ARRANGE
    render(<BookCard key="123" book={book.volumeInfo} index={1} />);
    // ACT
    const bookModalNotRendered = screen.getByTestId("book-modal-not-rendered");
    // ASSERT
    expect(bookModalNotRendered).toBeInTheDocument();
  });

  it("Should open the BookModal when the card is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(<BookCard key="123" book={book.volumeInfo} index={1} />);
    //ACT
    const bookCard = screen.getByRole("article");
    expect(screen.getByTestId("book-modal-not-rendered")).toBeInTheDocument();
    await user.click(bookCard);
    // ASSERT
    expect(screen.getByTestId("book-modal-rendered")).toBeInTheDocument();
  });

  it("Should close the BookModal when the modal calls onClose passed into it", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(<BookCard key="123" book={book.volumeInfo} index={1} />);
    //ACT
    const bookCard = screen.getByRole("article");
    await user.click(bookCard);

    expect(screen.getByTestId("book-modal-rendered")).toBeInTheDocument();
    const lastMockCall = mockBookModalSpy.mock.lastCall[0];
    const triggerOnClose = lastMockCall.onClose;
    triggerOnClose();

    await waitFor(() => {
      expect(screen.getByTestId("book-modal-not-rendered")).toBeInTheDocument();
      expect(
        screen.queryByTestId("book-modal-rendered"),
      ).not.toBeInTheDocument();
    });
  });
});
