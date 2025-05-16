import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits, fetchMovieVideos } from "../services/api";
import Loading from "../components/Loader";
import { ArrowLeft } from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        const credits = await fetchMovieCredits(id);
        const videos = await fetchMovieVideos(id);

        const trailer = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        setMovie(data);
        setCast(credits.slice(0, 6));
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Failed to load movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  // Check watchlist status
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (movie) {
      setIsInWatchlist(stored.some((item) => item.id === movie.id));
    }
  }, [movie]);

  // Check favorite status
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (movie) {
      setIsFavorite(storedFav.some((item) => item.id === movie.id));
    }
  }, [movie]);

  // Toggle watchlist
  const toggleWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    const updated = isInWatchlist
      ? stored.filter((item) => item.id !== movie.id)
      : [...stored, movie];

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsInWatchlist(!isInWatchlist);
  };

  // Toggle favorite
  const toggleFavorite = () => {
    const storedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = isFavorite
      ? storedFav.filter((item) => item.id !== movie.id)
      : [...storedFav, movie];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <Loading />;
  if (!movie) return <p className="text-center mt-10">Movie not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-500 hover:text-blue-300 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          {movie.tagline && <p className="italic text-white">{movie.tagline}</p>}
          <p className="text-white">⭐ {movie.vote_average} / 10</p>
          <p className="text-white">
            {movie.release_date} • {movie.runtime} mins
          </p>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-white">{movie.overview}</p>

          {/* Buttons: Watchlist and Favorites */}
          <div className="flex gap-4">
            <button
              onClick={toggleWatchlist}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                isInWatchlist
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>

            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                isFavorite
                  ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailerKey && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 sm:h-96 rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {cast.map((actor) => (
              <div key={actor.id} className="min-w-[100px] text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-full h-auto rounded-md shadow"
                />
                <p className="text-sm mt-1">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
