import "./App.scss";
import Header from "./components/Header/Header";
import { getBooksBySearchTerm } from "./services/books-service";

function App() {
  getBooksBySearchTerm("flowers").then((data) => console.log(data.items));

  return (
    <main>
      <Header />
    </main>
  );
}

export default App;
