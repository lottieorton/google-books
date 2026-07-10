import classes from "./Pagination.module.scss";

export default function Pagination({
  currentPage,
  totalNumBooks,
  onNext,
  onPrevious,
}) {
  const numPages = Math.ceil(totalNumBooks / 20);
  return (
    <div className={classes.container}>
      <button
        disabled={currentPage === 0}
        onClick={onPrevious}
        className={classes.btn}
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
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
}
