import classes from "./BookCard.module.scss";

export default function BookCard() {
  return (
    <article className={classes.card}>
      <img
        className={classes.img}
        src="https://dummyimage.com/300x500/000/fff"
        alt="Book Cover"
      />
      <div className={classes.details}>
        <p className={classes.category}>FICTION</p>
        <h4 className={classes.title}>Title</h4>
        <p className={classes.author}>Author</p>
        <p className={classes.description}>
          Descrption is entered in here about this awesome book
        </p>
      </div>
    </article>
  );
}
