import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookCardShell from "./BookCardShell";

describe("BookCardShell", () => {
  it("Should render component with empty paragraph fields", () => {
    //ARRANGE
    //ACT
    render(<BookCardShell />);
    const card = screen.getByRole("article");
    const loadingImage = screen.getByTestId("image-loading-skeleton");
    const loadingTextBars = screen.getAllByRole("paragraph");
    //ASSERT
    expect(card).toBeInTheDocument();
    expect(loadingImage).toBeInTheDocument();
    expect(loadingImage.firstElementChild).toBeInTheDocument();
    expect(loadingTextBars).toHaveLength(4);
  });
});
