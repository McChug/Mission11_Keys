import "./App.css";
import "./BookList";
import BookList from "./BookList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
      <BookList />
    </>
  );
}

export default App;
