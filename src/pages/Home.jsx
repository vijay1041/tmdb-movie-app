import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getTrending } from '../services/api';
import { appendHomeMovies } from '../redux/movieSlice';

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const movies = useSelector(state => state.movies.homeMovies);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false);

  // first load only once
  useEffect(() => {
    if (bootstrapped || movies.length) return;

    setBootstrapped(true);
    fetchFirstPage();
  }, [bootstrapped, movies.length]);

  // restore scroll when coming back to home
  useEffect(() => {
    if (location.pathname !== '/') return;

    const y = sessionStorage.getItem('home_scroll');
    if (y) {
      setTimeout(() => {
        window.scrollTo(0, Number(y));
      }, 0);
    }
  }, [location.pathname]);

  // keep saving scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const saveScroll = () => {
      sessionStorage.setItem('home_scroll', window.scrollY);
    };

    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => window.removeEventListener('scroll', saveScroll);
  }, [location.pathname]);

  const fetchFirstPage = async () => {
    setLoading(true);
    try {
      const list = await getTrending(1);
      if (!list || !list.length) {
        setCanLoadMore(false);
        return;
      }

      dispatch(appendHomeMovies(list));
      setPage(2);
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async (nextPage) => {
    setLoading(true);
    try {
      const list = await getTrending(nextPage);
      if (!list || !list.length) {
        setCanLoadMore(false);
        return;
      }

      dispatch(appendHomeMovies(list));
    } finally {
      setLoading(false);
    }
  };

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (nearBottom && !loading && canLoadMore) {
        setPage(p => p + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, canLoadMore]);

  // load next pages
  useEffect(() => {
    if (page === 1) return;
    fetchMore(page);
  }, [page]);

  return (
    <div className="page">
      <h1>Trending Movies</h1>

      <div className="movies-grid">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: 'center', opacity: 0.6 }}>
          Loading more movies…
        </p>
      )}
    </div>
  );
}

export default Home;
