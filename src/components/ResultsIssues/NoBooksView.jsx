import classes from "./ResultsIssues.module.scss";

export default function NoBooks({ searchTerm }) {
  return (
    <article className={classes.section + " " + classes.section_noBook}>
      <i
        className={
          classes.icon +
          " " +
          classes.icon_noBook +
          " fa-solid fa-magnifying-glass"
        }
      ></i>
      <h2 className={classes.header}>No books found for "{searchTerm}"</h2>
      <p className={classes.text}>
        Try checking your spelling, using different keywords or broadening your
        search.
      </p>
    </article>
  );
}
