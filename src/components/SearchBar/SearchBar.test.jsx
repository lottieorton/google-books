import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { SearchTermContext } from "../../context/SearchTermContext";

describe("SearchBar", () => {
  const mockOnSearch = vi.fn();
  const searchBar = (
    <SearchTermContext.Provider value={{ onSearch: mockOnSearch }}>
      <SearchBar />
    </SearchTermContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render with form and header", async () => {
    //ARRANGE
    render(searchBar);
    //ACT
    const header = screen.getByRole("heading", { level: 2 });
    const icon = screen.getByText("import_contacts");
    const input = screen.getByPlaceholderText("Search books...");
    const btn = screen.getByRole("button");
    //ASSERT
    expect(header).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it("Should render button as disabled when the input is empty", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(searchBar);
    //ACT
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("disabled");
    const input = screen.getByPlaceholderText("Search books...");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
    expect(btn).not.toHaveAttribute("disabled");
    await user.type(input, "{backspace>5}");
    //ASSERT
    expect(btn).toHaveAttribute("disabled");
  });

  it("Should call onSearch when the button is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(searchBar);
    //ACT
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search books...");
    await user.type(input, "hello");
    await user.click(btn);
    //ASSERT
    expect(mockOnSearch).toHaveBeenCalledOnce();
  });

  it("Should call onSearch with the value typed into the text input when button is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(searchBar);
    //ACT
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search books...");
    await user.type(input, "hello");
    await user.click(btn);
    //ASSERT
    expect(mockOnSearch).toHaveBeenCalledOnce();
    expect(mockOnSearch).toHaveBeenCalledWith("hello");
    expect(mockOnSearch.mock.calls[0][0]).toBe("hello"); //args passed to the first call
  });

  it("Should clear the input field after button is clicked", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(searchBar);
    //ACT
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search books...");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
    await user.click(btn);
    //ASSERT
    expect(input).toHaveValue("");
  });

  it("Should call onSearch with the value typed into the text input, multiple times", async () => {
    //ARRANGE
    const user = userEvent.setup();
    render(searchBar);
    //ACT
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("Search books...");
    await user.type(input, "hello");
    await user.click(btn);
    await user.type(input, "world");
    await user.click(btn);
    //ASSERT
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
    expect(mockOnSearch.mock.calls[0][0]).toBe("hello");
    expect(mockOnSearch.mock.calls[1][0]).toBe("world");
  });
});
