import { useEffect, useState } from "react";
import "./App.css";

function BookCard({ book, onClick }) {
  const v = book.volumeInfo;
  const thumb = v.imageLinks?.thumbnail?.replace("http", "https");

  return (
    <div className="card" onClick={() => onClick(book)}>
      <div className="card-inner">
        <div className="cover-wrap">
          {thumb
            ? <img src={thumb} alt={v.title} loading="lazy" />
            : <div className="no-cover">{v.title}</div>}
          <div className="cover-overlay" />
        </div>
        <div className="info">
          <div className="title">{v.title}</div>
          {v.subtitle && <div className="subtitle">{v.subtitle}</div>}
          <div className="authors">{v.authors?.join(", ")}</div>
        </div>
      </div>
    </div>
  );
}

function Modal({ book, onClose }) {
  if (!book) return null;
  const v = book.volumeInfo;
  const thumb = v.imageLinks?.thumbnail?.replace("http", "https");

  return (
    <div className="modal-backdrop active" onClick={(e) => e.target.classList.contains("modal-backdrop") && onClose()}>
      <div className="modal">
        {thumb && <div className="modal-cover"><img src={thumb} alt={v.title} /></div>}
        <div className="modal-body">
          <span className="modal-label">Now Featuring</span>
          <h2 className="modal-title">{v.title}</h2>
          {v.subtitle && <p className="modal-subtitle">{v.subtitle}</p>}
          <div className="divider" />
          <p className="modal-authors">{v.authors?.join(", ")}</p>
          <p className="modal-description">{v.description || "No description available."}</p>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/books")
      .then((r) => r.json())
      .then((data) => setBooks(data.data.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <header>
        <h1>The Reading Room</h1>
        <p>A curated collection of books</p>
        <div className="shelf-line" />
      </header>
      <div className="grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={setSelected} />
        ))}
      </div>
      <Modal book={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default App;