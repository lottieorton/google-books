import { useState } from "react";
import classes from "./SearchBar.module.scss";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput("");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <i className={classes.icon + " fa-solid fa-magnifying-glass"}></i>
      <input
        className={classes.input}
        type="text"
        placeholder="Search books..."
        value={input}
        onChange={handleChange}
      />
      <button className={classes.btn}>Go</button>
    </form>
  );
}
