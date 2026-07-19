import "./App.scss";
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import BooksContainer from "./containers/BooksContainer/BooksContainer";
import SearchTermProvider from "./context/SearchTermContext/SearchTermContext";
import BookResultsProvider from "./context/BookResultContext/BookResultContext";

function App() {
  return (
    <SearchTermProvider>
      <BookResultsProvider>
        <main className="main">
          <SearchBar />
          <BooksContainer />
        </main>
      </BookResultsProvider>
    </SearchTermProvider>
  );
}

export default App;
