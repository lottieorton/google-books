import { createPortal } from "react-dom";
import classes from "./BookModal.module.scss";

export default function BookModal({ book, isOpen, onClose, bgColorNum }) {
  const {
    title,
    authors,
    categories,
    description,
    image,
    averageRating,
    ratingsCount,
    pageCount,
    publishedYear,
    publisher,
    language,
  } = book;
  return createPortal(
    <div
      className={`${classes.modal} ${isOpen ? classes.modal_open : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-testid="outerSection"
    >
      <article className={classes.modalContainer}>
        <section
          className={
            classes.modalHeader +
            " " +
            classes[`modalHeader_bgColor_${bgColorNum}`]
          }
        >
          {image ? (
            <img className={classes.img} src={image} alt={title} />
          ) : (
            <span className={classes.noImgIcon + " material-symbols-outlined"}>
              import_contacts
            </span>
          )}
          <div className={classes.headerInfo}>
            <h4 className={classes.title}>{title}</h4>
            <p className={classes.author}>{authors}</p>
            <button
              className={classes.close}
              onClick={onClose}
              aria-label="close modal"
            >
              <i className={classes.closeIcon + " fa-solid fa-xmark"}></i>
            </button>
          </div>
        </section>
        <div className={classes.content}>
          <div className={classes.grid}>
            {averageRating && (
              <div
                className={
                  classes.infoSegment + " " + classes.infoSegment_rating
                }
              >
                <div className={classes.infoSegment_oneLine}>
                  <p className={classes.infoText}> ⭐️ {averageRating} / 5</p>
                  <p className={classes.infoTitle}>
                    from {ratingsCount}{" "}
                    {ratingsCount === 1 ? "rating" : "ratings"}
                  </p>
                </div>
              </div>
            )}
            <div className={classes.infoSegment}>
              <p className={classes.infoTitle}>PAGES</p>
              <p className={classes.infoText}>{pageCount ?? "-"}</p>
            </div>
            <div className={classes.infoSegment}>
              <p className={classes.infoTitle}>PUBLISHED</p>
              <p className={classes.infoText}>{publishedYear ?? "-"}</p>
            </div>
            <div className={classes.infoSegment}>
              <p className={classes.infoTitle}>PUBLISHER</p>
              <p className={classes.infoText}>{publisher ?? "-"}</p>
            </div>
            <div className={classes.infoSegment}>
              <p className={classes.infoTitle}>LANGUAGE</p>
              <p className={classes.infoText}>{language ?? "-"}</p>
            </div>
          </div>
          {description && (
            <div
              className={
                classes.infoSegment + " " + classes.infoSegment_lightbg
              }
            >
              <p className={classes.infoTitle}>ABOUT THIS BOOK</p>
              <p className={classes.infoText}>{description}</p>
            </div>
          )}
        </div>
      </article>
    </div>,
    document.body,
  );
}
