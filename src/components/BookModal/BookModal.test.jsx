import React from "react";
// import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookModal from "./BookModal";
import { userEvent } from "@testing-library/user-event";

describe("BookModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  const book = {
    title: "Test Title",
    authors: "Test Author 1, Test Author 2",
    categories: "Test Cat 1, Test Cat 2",
    description: "A test description",
    image: "https://example.com/book.png",
    averageRating: 4.5,
    ratingsCount: 12,
    pageCount: 350,
    publishedYear: "2026",
    publisher: "Test Publisher",
    language: "EN",
  };
  it("Should render with book data", () => {
    //ARRANGE
    render(
      <BookModal
        book={book}
        isOpen={true}
        onClose={mockOnClose}
        bgColorNum={1}
      />,
    );
    //ASSERT
    expect(screen.getByRole("img", { name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(
      screen.getByText("Test Author 1, Test Author 2"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("⭐️ 4.5 / 5")).toBeInTheDocument();
    expect(screen.getByText("from 12 ratings")).toBeInTheDocument();
    expect(screen.getByText("PAGES")).toBeInTheDocument();
    expect(screen.getByText("350")).toBeInTheDocument();
    expect(screen.getByText("PUBLISHED")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("PUBLISHER")).toBeInTheDocument();
    expect(screen.getByText("Test Publisher")).toBeInTheDocument();
    expect(screen.getByText("LANGUAGE")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("ABOUT THIS BOOK")).toBeInTheDocument();
    expect(screen.getByText("A test description")).toBeInTheDocument();
  });

  it("Should render ratings without an 's' if there is only 1", () => {
    //ARRANGE
    const singleRatingBook = { ...book, ratingsCount: 1 };
    render(
      <BookModal
        book={singleRatingBook}
        isOpen={true}
        onClose={mockOnClose}
        bgColorNum={1}
      />,
    );
    //ACT
    const ratingText = screen.getByText("from 1 rating");
    //ASSERT
    expect(ratingText).toBeInTheDocument();
  });

  it("Should call onClose when you click outside the model", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <BookModal
        book={book}
        isOpen={true}
        onClose={mockOnClose}
        bgColorNum={1}
      />,
    );
    //ACT
    const backdrop = screen.getByTestId("outerSection");
    await user.click(backdrop);
    // ASSERT
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("Should call onClose when you click the close button", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <BookModal
        book={book}
        isOpen={true}
        onClose={mockOnClose}
        bgColorNum={1}
      />,
    );
    //ACT
    const closeButton = screen.getByRole("button");
    await user.click(closeButton);
    // ASSERT
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("Should render blank or default elements with missing values", () => {
    //ARRANGE
    const user = userEvent.setup();
    const book = {};
    render(
      <BookModal
        book={book}
        isOpen={true}
        onClose={mockOnClose}
        bgColorNum={1}
      />,
    );
    //ACT
    const defaultImage = screen.getByText("import_contacts");
    const title = screen.getByRole("heading", { level: 4 });
    const pages = screen.getByText("PAGES");
    const published = screen.getByText("PUBLISHED");
    const publisher = screen.getByText("PUBLISHER");
    const lang = screen.getByText("LANGUAGE");
    const placeholders = screen.getAllByText("-");
    //ASSERT
    expect(defaultImage).toBeInTheDocument();
    expect(title).toHaveTextContent("");
    expect(pages).toBeInTheDocument();
    expect(published).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(lang).toBeInTheDocument();
    expect(placeholders).toHaveLength(4);
  });
});
