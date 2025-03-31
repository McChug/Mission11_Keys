import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import CartLink from "../components/CartLink";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartLink />
      <Header />
      <button onClick={() => navigate("/admin")}>Secret Admin Page</button>
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

export default BooksPage;
