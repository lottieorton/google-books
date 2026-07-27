import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getBooksBySearchTerm } from "../../services/books-service";
import { useSearchTerm } from "../SearchTermContext/SearchTermContext";

export const BookResultsContext = createContext(null);

const BookResultsProvider = ({ children }) => {
  const { searchTerm } = useSearchTerm();

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
        setBooks(data?.books);
        setTotalNumBooks(data?.totalNumBooks ?? 0);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message);
        console.error(err);
      });
  }, [searchTerm, effectivePage]);

  return (
    <BookResultsContext.Provider
      value={{
        books,
        status,
        error,
        totalNumBooks,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </BookResultsContext.Provider>
  );
};

export default BookResultsProvider;

export const useBookResults = () => {
  return useContext(BookResultsContext);
};
