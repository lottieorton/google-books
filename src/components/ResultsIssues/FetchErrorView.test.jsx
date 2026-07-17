import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FetchError from "./FetchErrorView";

describe("FetchError", () => {
  it("Should render", () => {
    //ARRANGE
    render(<FetchError />);
    //ACT
    const errorDisplay = screen.getByRole("article");
    //ASSERT
    expect(errorDisplay).toBeInTheDocument();
  });
});
