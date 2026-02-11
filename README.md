# 🎬 MovieDB – IMDB Clone

A modern movie database web application built using React and TMDB API. The project focuses on clean UI, structured state management with Redux Toolkit, and smooth client-side routing.

Users can explore trending movies, search by title, view detailed information, watch trailers, and manage a persistent watchlist.

---

## 🚀 Project Overview

This application allows users to:

🎥 Browse trending movies  
🔎 Search movies by title  
📄 View detailed movie information  
🎬 Watch movie trailers in a modal  
⭐ Add and remove movies from watchlist  
💾 Persist watchlist using localStorage  

The project follows a modular and scalable folder structure for maintainability.

---

## ✨ Features

### 🎬 User Features

- Trending movies homepage  
- Search functionality  
- Detailed movie pages  
- Trailer modal integration  
- Add/remove movies to watchlist  
- Persistent watchlist using localStorage  
- Smooth scrolling experience  

---

## 🛠️ Tech Stack

### 🎨 Frontend

- React 18  
- Vite  
- React Router v6  
- Redux Toolkit  
- TMDB API  
- CSS3  

---

## 📁 Project Structure

my-app/
├── src/
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ScrollManager.jsx
│   │   └── TrailerModal.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Search.jsx
│   │   └── Watchlist.jsx
│   │
│   ├── redux/
│   │   ├── movieSlice.js
│   │   └── store.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js  
- Git  

### Clone the Repository

git clone https://github.com/vijaydev-07/MovieDB.git  
cd MovieDB  

---

### TMDB API Setup

1. Get your API key from:  
https://www.themoviedb.org/settings/api  

2. Open `src/services/api.js` and replace:

const API_KEY = 'your_actual_api_key_here';

---

### Install Dependencies

npm install  

---

### Run the Development Server

npm run dev  

Application runs on: http://localhost:5173  

---

## 🔄 State Management

Redux Toolkit is used for:

- Managing global watchlist state  
- Adding and removing movies  
- Persisting watchlist data in localStorage  

---

## 📡 Routing Overview

- Home: /  
- Movie Details: /movie/:id  
- Search: /search  
- Watchlist: /watchlist  

---

## 🚀 Future Enhancements

- Pagination for movie listings  
- Dark mode support  
- User authentication  
- Movie ratings and reviews  
- Performance optimization  

---

## 👨‍💻 Author

Vijay Dev  
GitHub: https://github.com/vijaydev-07  

---

## 📄 License

This project is open-source and available under the MIT License.
