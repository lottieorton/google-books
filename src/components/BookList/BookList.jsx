import classes from "./BookList.module.scss";
import BookCard from "../BookCard/BookCard";

export default function BookList({ books, searchTerm }) {
  const listBooks = books.map((book) => {
    const { id } = book;
    const {
      title,
      author,
      categories,
      description,
      imageLinks: { thumbnail: image },
    } = book.volumeInfo;
    return (
      <BookCard
        key={id}
        title={title}
        category={categories}
        author={author}
        description={description}
        image={image}
      />
    );
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
