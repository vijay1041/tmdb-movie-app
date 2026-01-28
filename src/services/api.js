const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// simple helper taaki repeat na ho
async function request(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }

  return res.json();
}

export const getTrending = async (page = 1) => {
  try {
    const data = await request(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );

    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.log('Trending movies fetch failed', err);
    return [];
  }
};


export const getMovieDetails = async (id) => {
  if (!id) return null;

  try {
    return await request(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
  } catch (err) {
    console.log('Movie details fetch failed', err);
    return null;
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];

  try {
    const data = await request(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    return data.results || [];
  } catch (err) {
    console.log('Movie search failed', err);
    return [];
  }
};

export const getMovieVideos = async (id) => {
  if (!id) return [];

  try {
    const data = await request(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );

    return data.results || [];
  } catch (err) {
    console.log('Movie videos fetch failed', err);
    return [];
  }
};

export const getMovieCredits = async (id) => {
  if (!id) {
    return {
      cast: [],
      crew: []
    };
  }

  try {
    return await request(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
  } catch (err) {
    console.log('Movie credits fetch failed', err);
    return {
      cast: [],
      crew: []
    };
  }
};

export const getImageUrl = (path) => {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};

export const getProfileImageUrl = (path) => {
  if (!path) {
    return 'https://via.placeholder.com/200x300?text=No+Photo';
  }
  return `https://image.tmdb.org/t/p/w200${path}`;
};
