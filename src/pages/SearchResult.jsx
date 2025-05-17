import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loader";

const API_KEY = "a570725c6f9236c18cad03e044897105";

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();

    // Store query in search history
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const updatedHistory = [query, ...storedHistory.filter((q) => q !== query)];
    const limitedHistory = updatedHistory.slice(0, 10); // limit to last 10 searches
    localStorage.setItem("searchHistory", JSON.stringify(limitedHistory));
  }, [query]);

  if (loading) return <Loading />;
  if (!results.length) return <p className="text-center mt-10 text-white">No results found for "{query}"</p>;

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Results for "{query}"</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-gray-900 rounded shadow overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-xs text-gray-500">⭐ {movie.vote_average}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
