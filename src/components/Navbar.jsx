import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaHome, FaFilm, FaHeart, FaBookmark } from "react-icons/fa";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  // Load search history from localStorage on mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const updateSearchHistory = (newQuery) => {
    let updatedHistory = [newQuery, ...searchHistory.filter((item) => item !== newQuery)];
    if (updatedHistory.length > 10) updatedHistory = updatedHistory.slice(0, 10); // Limit to 10 items
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/search/${trimmed}`);
      updateSearchHistory(trimmed);
      setQuery("");
      setShowHistory(false);
    }
  };

  const handleSelectHistory = (term) => {
    navigate(`/search/${term}`);
    updateSearchHistory(term);
    setQuery("");
    setShowHistory(false);
  };

  return (
    <>
      {/* Top search bar */}
      <div className="bg-gray-900 text-white shadow-md w-full p-4 space-x-24 flex justify-between items-center md:space-x-7 sm:justify-center relative z-50">
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
          className="relative flex items-center w-full max-w-xl space-x-2 sm:mx-4"
        >
          <div className="relative w-full">
         <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)} // delay to allow click
            placeholder="Search for a movie..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-inner"
            aria-label="Search movies"
          />



            {/* History dropdown */}
            {showHistory && searchHistory.length > 0 && (
              <ul className="absolute left-0 right-0 bg-gray-800 border border-gray-700 mt-1 rounded-md max-h-48 overflow-y-auto shadow-lg text-sm z-50">
                {searchHistory.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectHistory(item)}
                    className="px-4 py-2 hover:bg-blue-600 cursor-pointer truncate"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
      <div className="sm:hidden fixed inset-x-0 bottom-0 bg-gray-900 text-white shadow-inner py-2 border-t border-gray-700 flex justify-around z-[100] pointer-events-auto touch-manipulation">
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
