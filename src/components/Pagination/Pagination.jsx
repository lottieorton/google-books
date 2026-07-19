import { useBookResults } from "../../context/BookResultContext/BookResultContext";
import classes from "./Pagination.module.scss";

export default function Pagination() {
  const { totalNumBooks, currentPage, setCurrentPage } = useBookResults();
  const numPages = Math.ceil(totalNumBooks / 20);
  const onNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(currentPage + 1);
  };
  const onPrevious = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={classes.container}>
      <button
        disabled={currentPage === 0}
        onClick={onPrevious}
        className={classes.btn}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <p className={classes.pageText}>
        Page {currentPage + 1} of {numPages}
      </p>
      <button
        disabled={currentPage === numPages - 1}
        onClick={onNext}
        className={classes.btn}
        aria-label="Next page"
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
}
