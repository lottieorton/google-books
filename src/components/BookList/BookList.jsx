import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";

export default function BookList() {
  return (
    <section className={classes.container}>
      <h2 className={classes.searchResultsHeader}>Results for "search term"</h2>
      <div className={classes.grid}>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </section>
  );
}
