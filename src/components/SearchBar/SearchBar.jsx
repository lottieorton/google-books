import classes from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <form className={classes.form}>
      <i className={classes.searchIcon + " fa-solid fa-magnifying-glass"}></i>
      <input
        className={classes.input}
        type="text"
        placeholder="Search books..."
      />
      <button className={classes.btn}>Go</button>
    </form>
  );
}
