const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const getBooksBySearchTerm = async (term) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&key=${apiKey}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    if (data.items.length === 0) {
      throw new Error("No books found for the search term " + term);
    }
    return data.items;
  } catch (err) {
    console.error(err.message);
  }
};
