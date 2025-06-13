import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "./../context/ApiProvider";

import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useMyList } from "../context/myListProvider";
const Movies = () => {
  const { apiKey, baseUrl } = useApi();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

   const { addToList, myList, removeFromList } = useMyList();
    const isInMyList = (movieId) => {
    return myList.some((movie) => movie.id === movieId);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch movies
  async function getAllMovies() {
    try {
      const { data } = await axios.get(`${baseUrl}/movie/popular`, {
        params: {
          api_key: apiKey,
          language: "en-US",
          page: 1,
        },
      });
      console.log(data);

      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, [apiKey, baseUrl]);

  // Filter movies
  const filteredMovies = movies
    .slice(5)
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <BeatLoader color="#E50914" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <div className="text-center text-red-500 text-xl">
          Error: {error}
          <button
            onClick={getAllMovies}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md block mx-auto"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white pt-40 pb-20">
      {/* Main Content */}
      <div className="w-[90%] mx-auto px-4 md:px-8 py-12">
        {/* Recommended Movies */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-red-600">Recommended</span> Movies
            </h2>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-80">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                    />
                    <div className="absolute top-3 right-3 bg-gray-900/80 text-yellow-400 px-2 py-1 rounded-full text-sm font-bold flex items-center">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1 truncate">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-base mb-4 font-medium">
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                    <NavLink
                      to={`/movie/${movie.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md inline-flex items-center justify-center w-full transition-colors no-underline text-lg font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="15"
                        viewBox="0 0 384 512"
                        className="fill-current me-3"
                      >
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                      </svg>
                      Details
                    </NavLink>

                     {/* داخل الجزء الخاص بكل فيلم (بعد زر Details) */}
                    <div className="mt-3">
                      {!isInMyList(movie.id) ? (
                        <button
                          onClick={() => addToList(movie)}
                          className="w-full bg-transparent border-2 border-gray-600 hover:border-white text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add to List
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFromList(movie.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          In My List
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                No movies found for "{searchTerm}"
              </h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Movies;
