import { useSearchTerm } from "../../context/SearchTermContext/SearchTermContext";
import ResultsIssues from "./ResultsIssues";
import classes from "./ResultsIssues.module.scss";

export default function NoBooks() {
  const { searchTerm } = useSearchTerm();
  const header = `No books found for "${searchTerm}"`;
  const text =
    "Try checking your spelling, using different keywords or broadening your search.";
  return (
    <ResultsIssues type="noBook" header={header} text={text}>
      <i
        className={
          classes.icon +
          " " +
          classes.icon_noBook +
          " fa-solid fa-magnifying-glass"
        }
        data-testid="noBookIcon"
      ></i>
    </ResultsIssues>
  );
}
