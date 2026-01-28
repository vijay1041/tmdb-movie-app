import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { getMovieDetails, getImageUrl, getMovieVideos, getMovieCredits, getProfileImageUrl } from '../services/api';
import TrailerModal from '../components/TrailerModal';

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const isInWatchlist = watchlist.some(item => item.id === parseInt(id));

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const videos = await getMovieVideos(id);
        const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          setTrailerKey(trailer.key);
        }

        const credits = await getMovieCredits(id);
        setCast(credits.cast?.slice(0, 8) || []);
        setCrew(credits.crew || []);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const director = crew.find(member => member.job === 'Director');
  const writer = crew.find(member => member.job === 'Writer' || member.job === 'Screenplay');

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="error">{error || 'Movie not found'}</div>;
  }

  return (
    <div className="movie-details">
      <div className="details-container">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="details-poster"
        />
        <div className="details-content">
          <h1>{movie.title}</h1>
          <div className="details-meta">
            <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre">{genre.name}</span>
            ))}
          </div>
          <div className="details-crew">
            {director && <p><strong>Director:</strong> {director.name}</p>}
            {writer && <p><strong>Writer:</strong> {writer.name}</p>}
          </div>
          <div className="details-buttons">
            <button
              className="trailer-button"
              onClick={() => setShowTrailer(true)}
              disabled={!trailerKey}
            >
              {trailerKey ? '▶ Watch Trailer' : 'No Trailer Available'}
            </button>
            <button
              className={`watchlist-button ${isInWatchlist ? 'active' : ''}`}
              onClick={handleWatchlist}
            >
              {isInWatchlist ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-grid">
            {cast.map(actor => (
              <div key={actor.id} className="cast-member">
                <img
                  src={getProfileImageUrl(actor.profile_path)}
                  alt={actor.name}
                />
                <p className="cast-name">{actor.name}</p>
                <p className="cast-character">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTrailer && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}

export default MovieDetails;
