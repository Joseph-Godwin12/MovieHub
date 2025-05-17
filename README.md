MovieHub is a responsive React application that lets users explore popular movies, view detailed information, watch trailers, and manage personal favorites and watchlists.

🚀 Features
🔍 Search for movies by title

📄 Movie Details with poster, rating, release date, genres, overview, cast, and trailer

❤️ Favorites list stored in localStorage

📌 Watchlist feature to save movies for later

📱 Fully responsive with a mobile-friendly navbar

💀 Skeleton loading UI for smoother experience during data fetches

🛠️ Tech Stack
React

React Router v6

Tailwind CSS

TMDB API (The Movie Database)

localStorage for persistence

📦 Installation
Clone the repo:

bash
Copy
Edit
git clone https://github.com/yourusername/moviehub.git
cd moviehub
Install dependencies:

bash
Copy
Edit
npm install
Get a TMDB API Key:

Sign up at https://www.themoviedb.org

Go to your account settings > API > Generate an API key

Create a .env file:

ini
Copy
Edit
VITE_TMDB_API_KEY=your_tmdb_api_key_here
Start the app:

bash
Copy
Edit
npm run dev
📁 Folder Structure
graphql
Copy
Edit
src/
├── assets/              # Static images/icons
├── components/          # Reusable UI components (Navbar, MovieCard, Loader)
├── pages/               # Route-level components (Home, MovieDetails, Watchlist, Favorites)
├── services/            # API functions for TMDB
├── context/             # Global state (optional)
├── styles/              # Tailwind / custom styles
├── App.jsx              # Main app with routes
└── main.jsx             # React entry point
📌 Roadmap / TODO
✅ Skeleton loading screens

✅ Favorites and watchlist via localStorage

🚧 Pagination or infinite scroll

🚧 Actor profile pages

🚧 User authentication (optional)

🙌 Credits
Movie data & images from TMDB API

Icons by React Icons

Loader & skeletons styled with Tailwind CSS