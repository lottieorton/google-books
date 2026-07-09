import { useEffect, useState } from "react";
import { getBooksBySearchTerm } from "../../services/books-service";
import BookList from "../../components/BookList/BookList";
import BookListShell from "../../components/BookList/BookListShell";
import NoBooksView from "../../components/ResultsIssues/NoBooksView";
import FetchErrorView from "../../components/ResultsIssues/FetchErrorView";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (searchTerm === null) return;

    setStatus("loading");
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

  if (status === "pending") return;

  if (status === "loading") return <BookListShell />;

  if (status === "error") return <FetchErrorView />;

  if (status === "success") {
    if (books.length === 0) {
      return <NoBooksView searchTerm={searchTerm} />;
    }
    return <BookList books={books} searchTerm={searchTerm} />;
  }
}
