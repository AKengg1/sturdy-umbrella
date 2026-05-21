import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setpage]=useState(1)

  useEffect(() => {
    fetch(`https://api.freeapi.app/api/v1/public/books?page=${page}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.data.data))
      .catch(console.error);
  }, [page]);

  const open = (book) => {
    setSelected(book);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  const info = selected?.volumeInfo;

  return (
    <>
      {/* Background blur layer — sits behind modal, above page content */}
      <div className={`page-blur-layer ${selected ? "active" : ""}`} onClick={close} />

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
        {books.map((book, i) => {
          const v = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="card"
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => open(book)}
            >
              <div className="card-thumb-wrap">
                <img
                  className="card-thumb"
                  src={v.imageLinks?.thumbnail?.replace("http", "https")}
                  alt={v.title}
                />
              </div>
              <div className="card-info">
                <h2 className="card-title">{v.title}</h2>
                <h3 className="card-subtitle">{v.subtitle}</h3>
                <span className="card-authors">{v.authors?.join(", ")}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${selected ? "open" : ""}`} onClick={close}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {selected && (
            <>
              <div className="modal-hero">
                <img
                  src={info.imageLinks?.thumbnail?.replace("http", "https")}
                  alt={info.title}
                />
                <div className="modal-hero-gradient" />
                <div className="modal-hero-title">
                  <h2>{info.title}</h2>
                  {info.subtitle && <p>{info.subtitle}</p>}
                </div>
                <button className="modal-close" onClick={close}>✕</button>
              </div>

              <div className="modal-body">
                <p className="modal-authors">{info.authors?.join(", ")}</p>
                <div className="modal-divider" />

                {info.description ? (
                  <p className="modal-desc">{info.description}</p>
                ) : (
                  <p className="modal-no-desc">No description available.</p>
                )}

                {info.categories?.length > 0 && (
                  <div className="modal-tags">
                    {info.categories.map((cat) => (
                      <span key={cat} className="modal-tag">{cat}</span>
                    ))}
                  </div>
                )}

                {(info.publishedDate || info.pageCount || info.language) && (
                  <div className="modal-meta">
                    {info.publishedDate && (
                      <div className="modal-meta-item">
                        <span className="modal-meta-label">Published</span>
                        <span className="modal-meta-value">{info.publishedDate}</span>
                      </div>
                    )}
      
                    {info.language && (
                      <div className="modal-meta-item">
                        <span className="modal-meta-label">Language</span>
                        <span className="modal-meta-value">{info.language.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                {info.previewLink && (
                  
                    <a className="modal-preview-btn"
                    href={info.previewLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Preview on Google Books ↗
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {page<22?(
      <div className="page-change">
        
        <span>Page {page}</span>
            <button className="modal-preview-btn" disabled={page === 1} onClick={()=>{setpage(page-1)}}>Previous</button>
            <button className="modal-preview-btn" onClick={()=>{setpage(page+1)}}>Next</button>
        </div>):(<div><h2 className="page-end">THIS IS THE LAST PAGE, <em>THANK YOU!!</em></h2>
        <button className="modal-preview-btn" disabled={page === 1} onClick={()=>{setpage(page-1)}}>Previous</button>
        <button disabled={page === 22} className="modal-preview-btn" onClick={()=>{setpage(page+1)}}>Next</button>
        </div>)}
    </>
  );
}

export default App;