import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";

export default function BookList({ books, searchTerm }) {
  const listBooks = books.map((book, index) => {
    return <BookCard key={book.id} book={book.volumeInfo} index={index} />;
  });

  return (
    <section className={classes.container}>
      <h2 className={classes.searchResultsHeader}>
        Results for "{searchTerm}"
      </h2>
      <div className={classes.grid}>{listBooks}</div>
    </section>
  );
}
