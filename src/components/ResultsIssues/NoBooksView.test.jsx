import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NoBooks from "./NoBooksView";

describe("NoBooks", () => {
  it("Should render", () => {
    //ARRANGE
    render(<NoBooks searchTerm="test search" />);
    //ACT
    const header = screen.getByRole("heading", { level: 2 });
    //ASSERT
    expect(header).toHaveTextContent('No books found for "test search"');
  });
});
