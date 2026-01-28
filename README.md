# MovieDB - IMDB Clone

A clean and modern movie database application built with React, Redux Toolkit, and TMDB API.

## Features

- Browse trending movies
- Search for movies
- View detailed movie information
- Add/remove movies to watchlist
- Persistent watchlist using localStorage

## Tech Stack

- React 18
- Vite
- React Router v6
- Redux Toolkit
- TMDB API
- CSS3

## Setup Instructions

1. Get your TMDB API key from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

2. Open `src/services/api.js` and replace `YOUR_TMDB_API_KEY` with your actual API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Navigation bar with links
│   └── MovieCard.jsx    # Reusable movie card component
├── pages/
│   ├── Home.jsx         # Trending movies page
│   ├── MovieDetails.jsx # Movie details page
│   ├── Search.jsx       # Search movies page
│   └── Watchlist.jsx    # Watchlist page
├── redux/
│   ├── store.js         # Redux store configuration
│   └── movieSlice.js    # Watchlist state management
├── services/
│   └── api.js           # TMDB API functions
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## Key Features Explained

### Redux Watchlist
- Add/remove movies from watchlist
- Data persists in localStorage
- Global state management

### API Integration
- All API calls centralized in `services/api.js`
- Error handling included
- Loading states for better UX

### Routing
- Home: `/`
- Movie Details: `/movie/:id`
- Search: `/search`
- Watchlist: `/watchlist`
