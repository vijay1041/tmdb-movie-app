import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchMovies } from "../services/api";
import MovieCard from "./MovieCard";

const PAGE_SIZE = 8;

function Navbar() {
  const watchlist = useSelector((state) => state.movies.watchlist);

  // Search box state
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [panelOpen, setPanelOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);

  // Avoid race conditions when typing fast
  const lastRequestId = useRef(0);

  const resetSearch = () => {
    setTerm("");
    setMovies([]);
    setPanelOpen(false);
    setLimit(PAGE_SIZE);
    setLoading(false);
  };

  const fetchSearch = async (value) => {
    const q = value.trim();
    if (!q) {
      setMovies([]);
      setPanelOpen(false);
      return;
    }

    const requestId = ++lastRequestId.current;

    setLoading(true);
    setPanelOpen(true);

    try {
      const results = await searchMovies(q);

      // If user typed again, ignore older response
      if (requestId !== lastRequestId.current) return;

      setMovies(Array.isArray(results) ? results : []);
    } catch (err) {
      // Keep it user-friendly: just show empty list, log for devs
      console.warn("Search issue:", err);
      setMovies([]);
    } finally {
      if (requestId === lastRequestId.current) setLoading(false);
    }
  };

  const onType = (e) => {
    const value = e.target.value;
    setTerm(value);
    setLimit(PAGE_SIZE);

    // simple "search as you type" (no extra libs)
    fetchSearch(value);
  };

  const onSubmit = (e) => {
    // We don’t navigate anywhere; search stays on the same page
    e.preventDefault();
    fetchSearch(term);
  };

  const showMore = () => {
    setLimit((n) => n + PAGE_SIZE);
  };

  // When the results panel is open, stop the background page from scrolling
  useEffect(() => {
    if (!panelOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [panelOpen]);

  const visible = movies.slice(0, limit);
  const canShowMore = visible.length < movies.length;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo" onClick={resetSearch}>
            🎬 MovieDB
          </Link>

          <form className="navbar-search-form" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Search movies..."
              value={term}
              onChange={onType}
              className="navbar-search-input"
            />

            {term && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={resetSearch}
                aria-label="Clear search"
                title="Clear"
              >
                ✕
              </button>
            )}
          </form>

          <div className="nav-links">
            <Link to="/" onClick={resetSearch}>
              Home
            </Link>
            <Link to="/watchlist">Watchlist ({watchlist.length})</Link>
          </div>
        </div>
      </nav>

      {panelOpen && term.trim() && (
        <div className="search-results-overlay" role="dialog" aria-label="Search results">
          <div className="search-results-wrapper">
            <div className="search-results-container">
              <h3>
                Results for “{term.trim()}”
                {movies.length ? <span className="muted"> ({movies.length})</span> : null}
              </h3>

              {loading ? (
                <p className="search-loading">Searching…</p>
              ) : movies.length === 0 ? (
                <p className="search-no-results">No matches. Try a different name.</p>
              ) : (
                <>
                  <div className="search-results-grid">
                    {visible.map((movie) => (
                      <div
                        key={movie.id}
                        className="search-result-item"
                        onClick={resetSearch}
                      >
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>

                  {canShowMore && (
                    <button className="load-more-btn" onClick={showMore}>
                      Show more
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;