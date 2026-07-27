import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";
import BookCardShell from "../BookCard/BookCardShell";
import { useSearchTerm } from "../../context/SearchTermContext/SearchTermContext";
import { useBookResults } from "../../context/BookResultContext/BookResultContext";

export default function BookList() {
  const { searchTerm } = useSearchTerm();
  const { books = [], totalNumBooks } = useBookResults();

  const listBooks = books.map((book, index) => {
    return <BookCard key={book.id} book={book.volumeInfo} index={index} />;
  });

  return (
    <section className={classes.container}>
      <div className={classes.searchResultsInfo}>
        <h2 className={classes.searchResultsHeader}>
          Results for "{searchTerm}"
        </h2>
        <p className={classes.searchResultsText}>{totalNumBooks} books found</p>
      </div>
      <div className={classes.grid} data-testid="book-grid">
        {listBooks}
      </div>
    </section>
  );
}
