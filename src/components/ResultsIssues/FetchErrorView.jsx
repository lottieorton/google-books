import ResultsIssues from "./ResultsIssues";
import classes from "./ResultsIssues.module.scss";

export default function FetchError() {
  const header = "Couldn't reach Google Books";
  const text =
    "Check your internet connection and try again. If the problem persists, Google Books may be temporarily unavailable.";
  return (
    <ResultsIssues type="error" header={header} text={text}>
      <span
        className={
          "material-symbols-outlined " + classes.icon + " " + classes.icon_error
        }
      >
        android_wifi_3_bar_off
      </span>
    </ResultsIssues>
  );
}
