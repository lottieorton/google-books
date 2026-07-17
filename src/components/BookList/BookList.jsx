import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";

export default function BookList({ books, searchTerm, totalNumBooks }) {
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
