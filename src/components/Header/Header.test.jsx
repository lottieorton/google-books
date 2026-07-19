import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("Should render with text", () => {
    //ARRANGE
    render(<Header />);
    //ACT
    const header = screen.getByRole("heading", { level: 1 });
    const text = screen.getByRole("paragraph");
    //ASSERT
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Find your next great read.");
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(
      "Search millions of books from Google Books. Discover your next adventure.",
    );
  });
});
