import classes from "./BookList.module.scss";
import BookCardShell from "../BookCard/BookCardShell";

const cardShells = [];
for (let i = 0; i < 10; i++) {
  cardShells.push(<BookCardShell key={i} />);
}

export default function BookListShell() {
  return (
    <section className={classes.container + " " + classes.container_loading}>
      <div className={classes.grid}>{cardShells}</div>
    </section>
  );
}
