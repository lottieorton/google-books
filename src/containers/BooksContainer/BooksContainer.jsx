import { useEffect, useRef, useState } from "react";
import classes from "./BooksContainer.module.scss";
import { getBooksBySearchTerm } from "../../services/books-service";
import BookList from "../../components/BookList/BookList";
import NoBooksView from "../../components/ResultsIssues/NoBooksView";
import FetchErrorView from "../../components/ResultsIssues/FetchErrorView";
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";

export default function BooksContainer({ searchTerm }) {
  const [books, setBooks] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [totalNumBooks, setTotalNumBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const previousSearchTerm = useRef(searchTerm);

  let effectivePage = currentPage;
  if (previousSearchTerm.current !== searchTerm) {
    previousSearchTerm.current = searchTerm;
    effectivePage = 0;
    setCurrentPage(0);
  }

  useEffect(() => {
    if (!searchTerm) return;

    const nextStartBook = 20 * effectivePage;
    setStatus("loading");
    getBooksBySearchTerm(searchTerm, nextStartBook)
      .then((data) => {
        setStatus("success");
        setBooks(data?.items);
        setTotalNumBooks(data?.totalItems ?? 0);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message);
        console.error(err);
      });
  }, [searchTerm, effectivePage]);

  if (status === "pending") return <Header />;

  if (status === "loading") return <BookList isLoading />;

  if (status === "error") {
    if (error === "No books found")
      return <NoBooksView searchTerm={searchTerm} />;
    return <FetchErrorView />;
  }

  if (status === "success") {
    return (
      <div className={classes.container}>
        <BookList
          books={books}
          searchTerm={searchTerm}
          totalNumBooks={totalNumBooks}
        />
        <Pagination
          currentPage={currentPage}
          totalNumBooks={totalNumBooks}
          onNext={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCurrentPage(currentPage + 1);
          }}
          onPrevious={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCurrentPage(currentPage - 1);
          }}
        />
      </div>
    );
  }
}
