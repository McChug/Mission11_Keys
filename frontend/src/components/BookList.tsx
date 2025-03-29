import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import HandleCart from "./HandleCart";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  // const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParameters = selectedCategories
        .map((c) => `categories=${encodeURIComponent(c)}`)
        .join("&");

      const url = `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}${
        selectedCategories.length ? `&${categoryParameters}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.bookList);
      // setTotalItems(data.totalNumberBooks);
      setTotalPages(Math.ceil(data.totalNumberBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNumber, sortBy, selectedCategories]);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {/* Results per page */}
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-3">
            <label htmlFor="resultsPerPage">Results per page:</label>
            <select
              id="resultsPerPage"
              value={pageSize}
              onChange={(p) => setPageSize(Number(p.target.value))}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
          {/* Sort by title */}
          <div className="d-flex gap-3">
            <label htmlFor="sortBySelect">Sort by title:</label>
            <select
              id="sortBySelect"
              value={sortBy}
              onChange={(p) => setSortBy(p.target.value)}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
        {/* Cards */}
        {books.map((b) => (
          <div className="card" key={`b_id${b.bookID}`}>
            <div className="card-header">
              <h2 className="card-title">
                {b.title} &ndash; {b.author}
              </h2>
            </div>
            <div className="card-body">
              <p className="card-price">${b.price}</p>
              <p className="card-info">
                {b.classification}, {b.category} | {b.pageCount} pages |
                Published by {b.publisher}
              </p>
              <HandleCart bookId={b.bookID} title={b.title} price={b.price} />
              <p className="card-isbn">ISBN: {b.isbn}</p>
            </div>
          </div>
        ))}

        {/* Page Controls */}
        <div className="d-flex">
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={`p${i + 1}`}
              onClick={() => setPageNumber(i + 1)}
              disabled={pageNumber === i + 1}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default BookList;
