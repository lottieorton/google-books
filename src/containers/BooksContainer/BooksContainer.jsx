import { useEffect, useState } from "react";
import { getBooksBySearchTerm } from "../../services/books-service";
import BookList from "../../components/BookList/BookList";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    if (searchTerm === null) return;

    setStatus("searching");
    getBooksBySearchTerm(searchTerm)
      .then((data) => {
        setStatus("success");
        setBooks(data);
      })
      .catch((err) => {
        setStatus("error");
        console.error(err);
      });
  }, [searchTerm]);

  if (status === "waiting") return;

  if (status === "loading") return <p>Loading...</p>;

  if (status === "error") return <p>There was an error</p>;

  if (status === "success")
    return <BookList books={books} searchTerm={searchTerm} />;
}
