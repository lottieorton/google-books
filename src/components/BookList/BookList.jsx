import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";
import BookCardShell from "../BookCard/BookCardShell";
import { useSearchTerm } from "../../context/SearchTermContext";
import { useBookResults } from "../../context/BookResultContext";

export default function BookList({ isLoading = false }) {
  const { searchTerm } = useSearchTerm();
  const { books = [], totalNumBooks } = useBookResults();

  const listBooks = !isLoading
    ? books.map((book, index) => {
        return <BookCard key={book.id} book={book.volumeInfo} index={index} />;
      })
    : Array.from({ length: 10 }).map((_, i) => {
        return <BookCardShell key={i} />;
      });

  return (
    <section
      className={`${classes.container} ${isLoading ? classes.container_loading : ""}`}
    >
      {!isLoading && (
        <div className={classes.searchResultsInfo}>
          <h2 className={classes.searchResultsHeader}>
            Results for "{searchTerm}"
          </h2>
          <p className={classes.searchResultsText}>
            {totalNumBooks} books found
          </p>
        </div>
      )}
      <div className={classes.grid} data-testid="book-grid">
        {listBooks}
      </div>
    </section>
  );
}
