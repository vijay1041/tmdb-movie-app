import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  const watchlist = useSelector((state) => state.movies.watchlist);

  return (
    <div className="page">
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="empty-message">Your watchlist is empty. Start adding movies!</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
