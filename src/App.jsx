import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResult";
import Watchlist from "./components/WatchList";
import Favorites from "./components/Favorites";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
