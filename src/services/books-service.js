const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const getBooksBySearchTerm = async (term, start = 0) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=${start}&maxResults=20&key=${apiKey}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  if (data.totalItems === 0 || !data.items) {
    return null;
  }
  return data;
};
