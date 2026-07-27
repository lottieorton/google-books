import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import BookCard from "./BookCard";

describe("BookCard", () => {
  const book = {
    id: 123,
    title: "Test Book",
    authors: "Test Author, Test Author 2",
    categories: "Test Category, Test Category 2",
    description: "This is a test description",
    image: "https://example.com/test-image.jpg",
  };

  it("Should render component with book info", () => {
    //ARRANGE
    render(<BookCard key="123" book={book} index={1} />);
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

  it("Should call selectBook with the book id when the card is clicked", async () => {
    //ARRANGE
    const selectBookMock = vi.fn();
    const user = userEvent.setup();
    render(
      <BookCard key="123" book={book} index={1} selectBook={selectBookMock} />,
    );
    //ACT
    const bookCard = screen.getByRole("article");
    await user.click(bookCard);
    // ASSERT
    expect(selectBookMock).toHaveBeenCalledOnce();
    expect(selectBookMock).toHaveBeenCalledWith(123);
  });
});
