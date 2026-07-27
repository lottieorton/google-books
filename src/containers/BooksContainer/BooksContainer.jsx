import classes from "./BooksContainer.module.scss";
import BookList from "../../components/BookList/BookList";
import NoBooksView from "../../components/ResultsIssues/NoBooksView";
import FetchErrorView from "../../components/ResultsIssues/FetchErrorView";
import Pagination from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { useBookResults } from "../../context/BookResultContext/BookResultContext";
import BookListShell from "../../components/BookList/BookListShell";

export default function BooksContainer() {
  const { status, error } = useBookResults();

  if (status === "pending") return <Header />;

  if (status === "loading") return <BookListShell />;

  if (status === "error") {
    if (error === "No books found") return <NoBooksView />;
    return <FetchErrorView />;
  }

  if (status === "success") {
    return (
      <div className={classes.container}>
        <BookList />
        <Pagination />
      </div>
    );
  }
}
