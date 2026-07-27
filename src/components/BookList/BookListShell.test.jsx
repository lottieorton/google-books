import React from "react";
// import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookListShell from "./BookListShell";

vi.mock("./../BookCard/BookCardShell", () => {
  return {
    default: function MockBookCardShell(props) {
      return <p data-testid="book-card-shell">{props.key}</p>;
    },
  };
});

describe("BookListShell", () => {
  it("Should render 10 BookCardShells", () => {
    //ARRANGE
    render(<BookListShell />);
    //ACT
    const bookCardShells = screen.getAllByTestId("book-card-shell");
    //ASSERT
    expect(bookCardShells).toHaveLength(10);
  });
});
