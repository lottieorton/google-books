import "./App.scss";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./containers/BooksContainer/BooksContainer";

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const onSearch = (value) => setSearchTerm(value);

  return (
    <main className="main">
      <SearchBar onSearch={onSearch} />
      <BooksContainer searchTerm={searchTerm} />
    </main>
  );
}

export default App;
