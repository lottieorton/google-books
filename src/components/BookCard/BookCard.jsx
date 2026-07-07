import classes from "./BookCard.module.scss";

export default function BookCard({
  title,
  category,
  author,
  description,
  image,
}) {
  return (
    <article className={classes.card}>
      <img className={classes.img} src={image} alt="Book Cover" />
      <div className={classes.details}>
        <p className={classes.category}>{category}</p>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.author}>{author}</p>
        <p className={classes.description}>{description}</p>
      </div>
    </article>
  );
}
