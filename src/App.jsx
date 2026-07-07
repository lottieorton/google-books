import "./App.scss";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import { getBooksBySearchTerm } from "./services/books-service";

function App() {
  getBooksBySearchTerm("flowers").then((data) => console.log(data.items));

  return (
    <main className="main">
      <Header />
      <SearchBar />
    </main>
  );
}

export default App;
