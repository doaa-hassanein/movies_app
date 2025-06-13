import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "./../context/ApiProvider";
import Upcomming from "../Upcomming/Upcomming";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useMyList } from "../context/myListProvider";

const Home = () => {
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
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {movies[0] && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
                {movies[0].title}
              </h1>
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full mr-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(movies[0].vote_average / 2)
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-yellow-400 font-bold text-sm">
                    {movies[0].vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-300">
                  {new Date(movies[0].release_date).getFullYear()}
                </span>
              </div>
              <p className="text-lg md:text-xl mb-8 max-w-2xl line-clamp-3">
                {movies[0].overview}
              </p>
              <NavLink
                to={`/movie/${movies[0].id}`}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-bold flex items-center w-max transition-all no-underline"
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
                Watch Now
              </NavLink>
            </div>
          </>
        )}
      </div>

      {/* Search Box */}
      <div
        className={`sticky top-0 z-50 py-4 px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/90 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-6 py-3 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[90%] mx-auto px-4 md:px-8 py-12">
        {/* Recommended Movies */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-red-600">Recommended</span> Movies
            </h2>
            {filteredMovies.length > 0 && (
              <NavLink
                to="/movies"
                className="text-gray-400 hover:text-white flex items-center transition-colors"
              >
                View All
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavLink>
            )}
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <button
                onClick={() => setSearchTerm("")}
                className="text-red-500 hover:text-red-400"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Upcoming Movies */}
        <Upcomming title="Upcoming Movies" searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
