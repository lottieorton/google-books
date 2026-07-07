import "./App.scss";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import BookList from "./components/BookList/BookList";
// import { getBooksBySearchTerm } from "./services/books-service";

function App() {
  //getBooksBySearchTerm("flowers").then((data) => console.log(data.items));

  return (
    <main className="main">
      <Header />
      <SearchBar />
      <BookList />
    </main>
  );
}

export default App;
