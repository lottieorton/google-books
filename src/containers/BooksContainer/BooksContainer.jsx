import { useEffect, useState } from "react";
import { getBooksBySearchTerm } from "../../services/books-service";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (searchTerm === null) return;

    getBooksBySearchTerm(searchTerm)
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchTerm]);
}
