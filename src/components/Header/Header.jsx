import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.container}>
      <h1 className={classes.heading}>Google Books</h1>
      <p className={classes.text}>
        Search millions of books from Google Books. Find your next perfect read.
      </p>
    </header>
  );
}
