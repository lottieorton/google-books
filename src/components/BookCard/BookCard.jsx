import { useState } from "react";
import classes from "./BookCard.module.scss";
import BookModal from "../BookModal/BookModal";

export default function BookCard({ book, index, selectBook, bgColorNum }) {
  const { id, title, authors, categories, description, image } = book;

  return (
    <>
      <article className={classes.card} onClick={() => selectBook(id)}>
        <div
          className={
            classes.imgContainer +
            " " +
            classes[`imgContainer_bgColor_${bgColorNum}`]
          }
        >
          {image ? (
            <img className={classes.img} src={image} alt={title} />
          ) : (
            <span className={classes.noImgIcon + " material-symbols-outlined"}>
              import_contacts
            </span>
          )}
        </div>
        <div className={classes.details}>
          {categories && <p className={classes.category}>{categories}</p>}
          <h4 className={classes.title}>{title}</h4>
          <p className={classes.author}>{authors}</p>
          <p className={classes.description}>{description}</p>
        </div>
      </article>
    </>
  );
}
