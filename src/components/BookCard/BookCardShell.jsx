import classes from "./BookCard.module.scss";

export default function BookCardShell() {
  return (
    <article className={classes.card + " " + classes.card_loading}>
      <div
        className={
          classes.imgContainer + " " + classes[`imgContainer_bgColor_loading`]
        }
      >
        <div className={classes.img}></div>
      </div>
      <div className={classes.details}>
        <p
          className={classes.loadingText + " " + classes.loadingText_small}
        ></p>
        <p
          className={classes.loadingText + " " + classes.loadingText_large}
        ></p>
        <p
          className={classes.loadingText + " " + classes.loadingText_small}
        ></p>
        <p
          className={classes.loadingText + " " + classes.loadingText_large}
        ></p>
      </div>
    </article>
  );
}
