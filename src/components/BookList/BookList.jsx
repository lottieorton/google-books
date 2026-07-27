import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";
import BookCardShell from "../BookCard/BookCardShell";
import { useSearchTerm } from "../../context/SearchTermContext/SearchTermContext";
import { useBookResults } from "../../context/BookResultContext/BookResultContext";
import { useState } from "react";
import BookModal from "../BookModal/BookModal";

export default function BookList() {
  const { searchTerm } = useSearchTerm();
  const { books = [], totalNumBooks } = useBookResults();
  const [selectedBook, setSelectedBook] = useState(null);

  const selectBook = (id) => {
    const clickedBook = books.find((book) => book.id === id);
    setSelectedBook(clickedBook);
  };
  const selectedIndex = books.findIndex((book) => book.id === selectedBook?.id);
  const selectedBookBgColorNumber = selectedIndex != -1 ? selectedIndex % 4 : 0;

  const listBooks = books.map((book, index) => {
    const bgColorNum = index % 4;

    return (
      <BookCard
        key={book.id}
        book={book}
        index={index}
        selectBook={selectBook}
        bgColorNum={bgColorNum}
      />
    );
  });

  return (
    <>
      <section className={classes.container}>
        <div className={classes.searchResultsInfo}>
          <h2 className={classes.searchResultsHeader}>
            Results for "{searchTerm}"
          </h2>
          <p className={classes.searchResultsText}>
            {totalNumBooks} books found
          </p>
        </div>
        <div className={classes.grid} data-testid="book-grid">
          {listBooks}
        </div>
      </section>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          bgColorNum={selectedBookBgColorNumber}
        />
      )}
    </>
  );
}
