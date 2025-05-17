import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-2 sm:p-4 max-w-full md:max-w-6xl mx-auto text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Your Watchlist</h1>

        {watchlist.length === 0 ? (
          <p className="text-center">You have no movies saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {watchlist.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-gray-900 text-black rounded shadow overflow-hidden hover:scale-105 transition-transform flex flex-col"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 sm:h-48 object-cover"
                />
                <div className="p-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-base sm:text-sm font-semibold truncate text-white">{movie.title}</h3>
                  <p className="text-xs text-white mt-1">⭐ {movie.vote_average}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
