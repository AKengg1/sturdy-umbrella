import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/books")
      .then((r) => r.json())
      .then((data) => setBooks(data.data.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">Book Through</span>
        <div className="navbar-dot" />
        <span className="navbar-tagline">Your Reading Universe</span>
        <div className="navbar-line" />
      </nav>

      <div className="page-header">
        <h2>The <em>Collection</em></h2>
        <span>Hover to explore</span>
      </div>
      <div className="page-divider" />

      <div className="grid">
        {books.map((book, i) => (
          <div
            key={book.id}
            className="card"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="card-thumb-wrap">
              <img
                className="card-thumb"
                src={book.volumeInfo.imageLinks?.thumbnail?.replace("http", "https")}
                alt="Book Cover"
              />
            </div>
            <div className="card-info">
              <h2 className="card-title">{book.volumeInfo.title}</h2>
              <h3 className="card-subtitle">{book.volumeInfo.subtitle}</h3>
              <span className="card-authors">{book.volumeInfo.authors?.join(", ")}</span>
              <div className="card-desc-wrap">
                <div className="card-divider" />
                <p className="card-desc">{book.volumeInfo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;