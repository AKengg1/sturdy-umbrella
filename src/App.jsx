import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.data.data))
      .catch(console.error);
  }, []);

  const open = (book) => {
    setSelected(book);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

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
        <span>Click to explore</span>
      </div>
      <div className="page-divider" />

      <div className="grid">
        {books.map((book, i) => (
          <div
            key={book.id}
            className="card"
            style={{ animationDelay: `${i * 0.04}s` }}
            onClick={() => open(book)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${selected ? "open" : ""}`} onClick={close}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {selected && (
            <>
              <div className="modal-hero">
                <img
                  src={selected.volumeInfo.imageLinks?.thumbnail?.replace("http", "https")}
                  alt="Book Cover"
                />
                <div className="modal-hero-gradient" />
                <div className="modal-hero-title">
                  <h2>{selected.volumeInfo.title}</h2>
                  {selected.volumeInfo.subtitle && (
                    <p>{selected.volumeInfo.subtitle}</p>
                  )}
                </div>
                <button className="modal-close" onClick={close}>✕</button>
              </div>
              <div className="modal-body">
                <p className="modal-authors">
                  {selected.volumeInfo.authors?.join(", ")}
                </p>
                <div className="modal-divider" />
                {selected.volumeInfo.description ? (
                  <p className="modal-desc">{selected.volumeInfo.description}</p>
                ) : (
                  <p className="modal-no-desc">No description available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;