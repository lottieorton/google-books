import "./App.scss";
import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import BookList from "./components/BookList/BookList";
import { getBooksBySearchTerm } from "./services/books-service";

function App() {
  // getBooksBySearchTerm("flowers").then((data) => console.log(data.items));
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (value) => setSearchTerm(value);

  return (
    <main className="main">
      <Header />
      <SearchBar onSearch={onSearch} />
      <BookList />
    </main>
  );
}

export default App;
