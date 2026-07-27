import { FetchBookError, NoBookError, RequestError } from "../errors/errors";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const getBooksBySearchTerm = async (term, start = 0) => {
  if (term.trim() === "") throw new NoBookError("No books found");
  if (isNaN(start)) throw new RequestError("Start number has to be a number");
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=${start}&maxResults=20&key=${apiKey}`,
  );
  if (!response.ok) {
    throw new FetchBookError("Failed to fetch books");
  }
  const data = await response.json();
  if (data.totalItems === 0 || !data.items) {
    throw new NoBookError(`No books found for ${term}`);
  }
  return sanitizeBookData(data);
};

const sanitizeBookData = (booksData) => {
  const cleanedBooks = booksData.items.map((book) => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(", "),
      categories: book.volumeInfo.categories?.join(", "),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail,
      averageRating: book.volumeInfo.averageRating,
      ratingsCount: book.volumeInfo.ratingsCount,
      pageCount: book.volumeInfo.pageCount,
      publishedYear: book.volumeInfo.publishedDate?.slice(0, 4),
      publisher: book.volumeInfo.publisher,
      language: book.volumeInfo.language?.toUpperCase(),
    };
  });

  return {
    totalNumBooks: booksData.totalItems,
    books: cleanedBooks,
  };
};
