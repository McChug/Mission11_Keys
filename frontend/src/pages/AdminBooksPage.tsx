import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";
import PaginationTop from "../components/PaginationTop";
import PaginationBottom from "../components/PaginationBottom";

const AdminBookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNumber, sortBy, []);
        setBooks(data.bookList);
        setTotalPages(Math.ceil(data.totalNumberBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [pageSize, pageNumber, sortBy]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h1>Admin &mdash; Book List</h1>

      {/* Items per page and Sort */}
      <PaginationTop
        pageSize={pageSize}
        sortBy={sortBy}
        changePageSize={(newSize) => {
          setPageSize(newSize);
          setPageNumber(1);
        }}
        changeSortBy={(sortString) => {
          setSortBy(sortString);
        }}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>{b.isbn}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Page Controls */}
      <PaginationBottom
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default AdminBookPage;
