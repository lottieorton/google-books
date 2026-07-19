import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResultsIssues from "./ResultsIssues";

describe("ResultsIssues", () => {
  it("Should render props details", () => {
    //ARRANGE
    const header = "Test Header";
    const text = "Test text";
    const type = "testType";
    render(
      <ResultsIssues header={header} text={text} type={type}>
        <h3 data-testid="children">Child</h3>
      </ResultsIssues>,
    );
    //ACT
    const children = screen.getByTestId("children");
    const headerEl = screen.getByRole("heading", { level: 2 });
    const testEl = screen.getByRole("paragraph");
    const typeEl = screen.getByTestId("testType");
    //ASSERT
    expect(children).toBeInTheDocument();
    expect(headerEl).toBeInTheDocument();
    expect(headerEl).toHaveTextContent("Test Header");
    expect(testEl).toBeInTheDocument();
    expect(testEl).toHaveTextContent("Test text");
    expect(typeEl).toBeInTheDocument();
  });
});
