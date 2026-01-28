import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { getImageUrl } from '../services/api';

function MovieCard({ movie }) {
  const dispatch = useDispatch();

  // watchlist ko seedha destructure nahi kiya
  // real projects me aksar aise hi milta hai
  const movieState = useSelector(state => state.movies);
  const watchlist = movieState.watchlist || [];

  const alreadyAdded = watchlist.find(m => m.id === movie.id);

  const onWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (alreadyAdded) {
        dispatch(removeFromWatchlist(movie.id));
      } else {
        dispatch(addToWatchlist(movie));
      }
    } catch (err) {
      // production me yaha toast / logger hota
      console.error('Watchlist action failed', err);
    }
  };

  const poster = movie.poster_path
    ? getImageUrl(movie.poster_path)
    : '/placeholder-movie.png';

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={poster}
        alt={movie.title ? movie.title : 'Movie poster'}
        loading="lazy"
      />

      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>

        <div className="movie-meta">
          {movie.vote_average ? (
            <span className="rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          ) : (
            <span className="rating muted">N/A</span>
          )}

          <button
            type="button"
            className={`watchlist-btn ${alreadyAdded ? 'active' : ''}`}
            onClick={onWatchlistClick}
            aria-label="Add to watchlist"
          >
            {alreadyAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
    </Link>
  );
}

// PropTypes intentionally kept minimal
// many teams still use this instead of TS
MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
