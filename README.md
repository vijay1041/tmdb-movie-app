# 🎬 MovieDB – IMDB Clone

A modern movie database web application built using React and TMDB API. The project focuses on clean UI, structured state management with Redux Toolkit, and smooth navigation using React Router.

This application allows users to explore trending movies, search titles, view detailed information, and manage a persistent watchlist.

---

## 🚀 Project Overview

This application allows users to:

🎥 Browse trending movies  
🔎 Search movies by title  
📄 View detailed movie information  
⭐ Add and remove movies to watchlist  
💾 Persist watchlist using localStorage  

The project follows a modular component-based architecture, making it easy to maintain and scale.

---

## ✨ Features

### 🎬 User Features

- Trending movies homepage  
- Movie search functionality  
- Detailed movie information page  
- Add/remove movies to watchlist  
- Persistent watchlist using localStorage  

---

## 🛠️ Tech Stack

### 🎨 Frontend

- React 18 – Component-based UI development  
- Vite – Fast build tool and development server  
- React Router v6 – Client-side routing  
- Redux Toolkit – Global state management  
- TMDB API – Movie data source  
- CSS3 – Styling  

---

## 📁 Project Structure

src/
├── components/
│   ├── Navbar.jsx
│   └── MovieCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── Search.jsx
│   └── Watchlist.jsx
├── redux/
│   ├── store.js
│   └── movieSlice.js
├── services/
│   └── api.js
├── App.jsx
└── main.jsx

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

- Managing watchlist state globally  
- Adding and removing movies  
- Persisting data using localStorage  

---

## 📡 Routing Overview

- Home: /  
- Movie Details: /movie/:id  
- Search: /search  
- Watchlist: /watchlist  

---

## 🚀 Future Enhancements

- Pagination for movie listings  
- Dark mode toggle  
- Improved loading states  
- User authentication  
- Movie ratings and reviews  

---

## 👨‍💻 Author

Vijay Dev  
GitHub: https://github.com/vijaydev-07  

---

## 📄 License

This project is open-source and available under the MIT License.
