import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should correctly calculate numPages", () => {
    //ARRANGE
    render(
      <Pagination
        currentPage={0}
        totalNumBooks={100}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );
    //ACT
    const pageCounter = screen.getByText("Page 1 of 5");
    //ASSERT
    expect(pageCounter).toBeInTheDocument();
  });

  it("Should render previous button as disabled when on the first page", () => {
    //ARRANGE
    render(
      <Pagination
        currentPage={0}
        totalNumBooks={100}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );
    //ACT
    const prevBtn = screen.getByRole("button", { name: "Previous page" });
    //ASSERT
    expect(prevBtn).toHaveAttribute("disabled");
  });

  it("Should call onPrevious when previous button clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={2}
        totalNumBooks={100}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );
    //ACT
    const prevBtn = screen.getByRole("button", { name: "Previous page" });
    await user.click(prevBtn);
    //ASSERT
    expect(prevBtn).not.toHaveAttribute("disabled");
    expect(mockOnPrevious).toHaveBeenCalledOnce();
  });

  it("Should call onNext when next button clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={0}
        totalNumBooks={100}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );
    //ACT
    const nextBtn = screen.getByRole("button", { name: "Next page" });
    await user.click(nextBtn);
    //ASSERT
    expect(nextBtn).not.toHaveAttribute("disabled");
    expect(mockOnNext).toHaveBeenCalledOnce();
  });

  it("Should render next button as disabled when on the last page", () => {
    //ARRANGE
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={4}
        totalNumBooks={100}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />,
    );
    //ACT
    const nextBtn = screen.getByRole("button", { name: "Next page" });
    //ASSERT
    expect(nextBtn).toHaveAttribute("disabled");
  });
});
