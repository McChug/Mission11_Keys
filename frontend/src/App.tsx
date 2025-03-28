import "./App.css";
import "./components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./components/BookList";
import CategoryFilter from "./components/CategoryFilter";
import { useState } from "react";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function Header() {
    return (
      <>
        <h1>Book List</h1>
        <p>Now this... this is awesome.</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container w-100">
        <div className="row w-100">
          <div className="col-lg-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-lg-10">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
