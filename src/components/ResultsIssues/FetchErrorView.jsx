import classes from "./ResultsIssues.module.scss";

export default function FetchError({}) {
  return (
    <article className={classes.section + " " + classes.section_error}>
      <span
        className={
          "material-symbols-outlined " + classes.icon + " " + classes.icon_error
        }
      >
        android_wifi_3_bar_off
      </span>
      <h2 className={classes.header}>Couldn't reach Google Books</h2>
      <p className={classes.text}>
        Check your internet connection and try again. If the problem persists,
        Google Books may be temporarily unavailable.
      </p>
    </article>
  );
}
