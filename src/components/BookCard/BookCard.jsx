import classes from "./BookCard.module.scss";

export default function BookCard({ book, index }) {
  const {
    title,
    authors,
    categories,
    description,
    imageLinks: { thumbnail: image },
  } = book;

  const bgColorNum = index % 4;

  return (
    <article className={classes.card}>
      <div
        className={
          classes.imgContainer +
          " " +
          classes[`imgContainer_bgColor_${bgColorNum}`]
        }
      >
        <img className={classes.img} src={image} alt="Book Cover" />
      </div>
      <div className={classes.details}>
        <p className={classes.category}>{categories}</p>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.author}>{authors?.join(", ")}</p>
        <p className={classes.description}>{description}</p>
        <p className={classes.readMore}>Read More</p>
      </div>
    </article>
  );
}
