import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaHome, FaFilm, FaHeart, FaBookmark } from "react-icons/fa";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  return (
    <>
      {/* Top search bar */}
      <div className="bg-gray-900 text-white shadow-md w-full p-4 space-x-24 flex justify-between items-center md:space-x-7  sm:justify-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-400 flex items-center space-x-2"
          title="Home"
        >
          <FaFilm size={24} />
          <span className="hidden sm:inline sm:p-0">MovieHub</span>
        </NavLink>

        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-xl space-x-2 sm:mx-4"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full sm:flex-1 px-4 py-2 rounded-md md:w-44 bg-gray-800 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search movies"
          />

          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
            aria-label="Search"
          >
            <FaSearch size={20} />
          </button>
        </form>

        {/* Desktop nav */}
        <div className="hidden sm:flex justify-end items-center bg-gray-900 text-white px-8 py-3 space-x-6 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold flex items-center space-x-1"
                : "hover:text-blue-400 flex items-center space-x-1"
            }
            title="Home"
          >
            <FaHome size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold flex items-center space-x-1"
                : "hover:text-blue-400 flex items-center space-x-1"
            }
            title="Favorites"
          >
            <FaHeart size={18} />
            <span>Favorites</span>
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold flex items-center space-x-1"
                : "hover:text-blue-400 flex items-center space-x-1"
            }
            title="Watchlist"
          >
            <FaBookmark size={18} />
            <span>Watchlist</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-inner py-2 border-t border-gray-700 flex justify-around z-50">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-blue-400"
              : "flex flex-col items-center"
          }
          title="Home"
        >
          <FaHome size={20} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-blue-400"
              : "flex flex-col items-center"
          }
          title="Favorites"
        >
          <FaHeart size={20} />
          <span className="text-xs">Fav</span>
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-blue-400"
              : "flex flex-col items-center"
          }
          title="Watchlist"
        >
          <FaBookmark size={20} />
          <span className="text-xs">Watch</span>
        </NavLink>
      </div>
    </>
  );
}
