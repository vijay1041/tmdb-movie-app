import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // avoid empty search

    try {
      setLoading(true);
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      console.error('Search failed:', err); // dev log
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Search Movies</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Searching movies...</div>}

      {!loading && movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && query && (
        <p className="no-results">
          No movies found for {query}
        </p>
      )}
    </div>
  );
}

export default Search;