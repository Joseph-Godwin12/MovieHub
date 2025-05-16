import axios from "axios";

const API_KEY = "a570725c6f9236c18cad03e044897105";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data.cast;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
    },
  });
  return response.data.results;
};

// ✅ New function to fetch videos (e.g., trailers)
export const fetchMovieVideos = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  return response.data.results;
};
