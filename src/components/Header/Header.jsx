import classes from "./Header.module.scss";

export default function Header() {
  return (
    <header className={classes.container}>
      <h1 className={classes.heading}>
        Find your <br />
        next <span className={classes.heading__highlight}>great read.</span>
      </h1>
      <p className={classes.text}>
        Search millions of books from Google Books. Discover your next
        adventure.
      </p>
    </header>
  );
}
