import { describe, it, expect } from "vitest";
import { getBooksBySearchTerm } from "./books-service";

describe("getBooksBySearchTerm", () => {
  it("Should throw an error when passed an empty search term", async () => {
    await expect(getBooksBySearchTerm("")).rejects.toThrow("No books found");
  });

  it("Should throw an error when passed an empty search string", async () => {
    await expect(getBooksBySearchTerm("     ")).rejects.toThrow(
      "No books found",
    );
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

  it("Should throw an error if totalItems = 0", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({ totalItems: 0, items: ["hello"] });
      },
    };
    spyFetch.mockResolvedValue(mock);
    await expect(getBooksBySearchTerm("")).rejects.toThrow("No books found");
  });

  it("Should throw an error if there are no items", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({ totalItems: 10 });
      },
    };
    spyFetch.mockResolvedValue(mock);
    await expect(getBooksBySearchTerm("")).rejects.toThrow("No books found");
  });

  it("Should return santized book data if api is successful", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({
          totalItems: 1,
          items: [
            {
              id: 1,
              volumeInfo: {
                title: "Best Book",
                authors: ["Fav Author1", "Fav Author2"],
                categories: ["Fiction", "Horror"],
                description: "This is a test description",
                imageLinks: {
                  thumbnail: "http:testimg.com",
                },
                averageRating: 5,
                ratingsCount: 10,
                pageCount: 100,
                publishedDate: "2000-05-01",
                publisher: "Top Publishers",
                language: "en",
              },
            },
          ],
        });
      },
    };
    spyFetch.mockResolvedValue(mock);
    const result = await getBooksBySearchTerm("best");
    expect(result).toEqual(
      expect.objectContaining({
        totalNumBooks: 1,
        books: [
          {
            id: 1,
            title: "Best Book",
            authors: "Fav Author1, Fav Author2",
            categories: "Fiction, Horror",
            description: "This is a test description",
            image: "http:testimg.com",
            averageRating: 5,
            ratingsCount: 10,
            pageCount: 100,
            publishedYear: "2000",
            publisher: "Top Publishers",
            language: "EN",
          },
        ],
      }),
    );
  });

  it("Should return undefined for any empty data fields", async () => {
    const spyFetch = vi.spyOn(window, "fetch");
    const mock = {
      ok: true,
      json() {
        return Promise.resolve({
          totalItems: 1,
          items: [{ volumeInfo: {} }],
        });
      },
    };
    spyFetch.mockResolvedValue(mock);
    const result = await getBooksBySearchTerm("best");
    expect(result).toEqual(
      expect.objectContaining({
        totalNumBooks: 1,
        books: [
          {
            id: undefined,
            title: undefined,
            authors: undefined,
            categories: undefined,
            description: undefined,
            image: undefined,
            averageRating: undefined,
            ratingsCount: undefined,
            pageCount: undefined,
            publishedYear: undefined,
            publisher: undefined,
            language: undefined,
          },
        ],
      }),
    );
  });
});
