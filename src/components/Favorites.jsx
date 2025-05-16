import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />

      {favorites.length === 0 ? (
        <p className="text-center flex justify-center items-center mt-10 text-white">
          No favorite movies yet.
        </p>
      ) : (
        <div className="max-w-6xl mx-auto p-4 text-white">
          <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 sm:h-48 object-cover"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
                <div className="p-3 flex justify-between items-center flex-1">
                  <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className="text-red-500 hover:text-red-400 font-bold"
                    aria-label={`Remove ${movie.title} from favorites`}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
