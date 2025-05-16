import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMoviesByGenre } from "../services/api";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import Loading from "../components/Loader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 18, name: "Drama" },
  { id: 10749, name: "Romance" },
];

export default function Home() {
  const [genreMovies, setGenreMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(genres[0].name); // Default: Action

  useEffect(() => {
    const loadAllGenres = async () => {
      setLoading(true);
      try {
        const data = {};
        for (const genre of genres) {
          const movies = await fetchMoviesByGenre(genre.id);
          data[genre.name] = movies;
        }
        setGenreMovies(data);
      } catch (err) {
        console.error("Failed to load genre movies:", err);
      } finally {
        setLoading(false);
      }
       setTimeout(() => {  // simulate loading delay for demo
      setFavorites(stored);
    }, 800)
    };

    loadAllGenres();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
        },
      },
    ],
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />

      {/* Genre Selector */}
      <div className="hidden sm:flex overflow-x-auto space-x-3 sm:space-x-6 px-4 py-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        {genres.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => setSelectedGenre(name)}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap font-medium transition-colors ${
              selectedGenre === name
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Mobile View: All genres with sliders */}
      <div className="block sm:hidden space-y-6 px-2  mt-4">
        {genres.map(({ id, name }) => (
          <div key={id}>
            <h2 className="text-lg font-bold text-gray-200 mb-2">{name} Movies</h2>
            <Slider {...sliderSettings}>
              {genreMovies[name]?.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="bg-gray-900 rounded shadow px-2 space-x-2 overflow-hidden"
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
            </Slider>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop: Filtered grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
        {genreMovies[selectedGenre]?.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-900 rounded shadow overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              <p className="text-xs text-gray-500">⭐ {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
