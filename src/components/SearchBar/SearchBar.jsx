import { useState } from "react";
import classes from "./SearchBar.module.scss";
import { useSearchTerm } from "../../context/SearchTermContext/SearchTermContext";

export default function SearchBar() {
  const { onSearch } = useSearchTerm();

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput("");
  };

  const isInputEmpty = input === "";

  return (
    <section className={classes.searchBar}>
      <div className={classes.header}>
        <span className={classes.bookIcon + " material-symbols-outlined"}>
          import_contacts
        </span>
        <h2 className={classes.heading}>bookfinder</h2>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <i
          className={classes.icon + " fa-solid fa-magnifying-glass"}
          aria-hidden="true"
        ></i>
        <input
          className={classes.input}
          type="text"
          placeholder="Search books..."
          value={input}
          onChange={handleChange}
        />
        <button className={classes.btn} disabled={isInputEmpty}>
          Go
        </button>
      </form>
    </section>
  );
}
