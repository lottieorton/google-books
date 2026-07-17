import { describe, it, expect } from "vitest";
import { getBooksBySearchTerm } from "./books-service";

describe("getBooksBySearchTerm", () => {
  it("Should throw an error when passed an empty search term", () => {
    return getBooksBySearchTerm("").then((data) => expect(data).toBe(null));
  });

  it("Should throw an error when passed an empty search string", () => {
    return getBooksBySearchTerm("    ").then((data) => expect(data).toBe(null));
  });

  it("Should throw an error when passed a non-number start index", () => {
    return getBooksBySearchTerm("hello", "world").catch((e) =>
      expect(e.message).toBe("Start number has to be a number"),
    );
  });

  it("Should throw an error when api response is not ok", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    spyFetch.mockResolvedValue({ ok: false });
    await expect(getBooksBySearchTerm("fails")).rejects.toThrow();
    await expect(getBooksBySearchTerm("fails")).rejects.toThrow(
      "Failed to fetch books",
    );
  });

  it("Should return null if totalItems = 0", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({ totalItems: 0, items: ["hello"] });
      },
    };
    spyFetch.mockResolvedValue(mock);
    const result = await getBooksBySearchTerm("empty");
    expect(result).toBe(null);
  });

  it("Should return null if there is are no items", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({ totalItems: 10 });
      },
    };
    spyFetch.mockResolvedValue(mock);
    const result = await getBooksBySearchTerm("empty");
    expect(result).toBe(null);
  });

  it("Should return data if api is successful", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({
          totalItems: 1,
          items: [{ volumeInfo: { id: 1, title: "Best Book" } }],
        });
      },
    };
    spyFetch.mockResolvedValue(mock);
    const result = await getBooksBySearchTerm("best");
    expect(result).toEqual(
      expect.objectContaining({
        totalItems: 1,
        items: [{ volumeInfo: { id: 1, title: "Best Book" } }],
      }),
    );
  });
});
