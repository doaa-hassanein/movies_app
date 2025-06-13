import { useEffect, useState } from "react";
import { useApi } from "../context/ApiProvider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useMyList } from "../context/myListProvider";

const UpCommingMovies = () => {
  const { apiKey, baseUrl } = useApi();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  
    const { addToList, myList, removeFromList } = useMyList();
  
    const isInMyList = (movieId) => {
      return myList.some((movie) => movie.id === movieId);
    };
  

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}/movie/upcoming`, {
          params: {
            api_key: apiKey,
            language: "en-US",
            page: 1,
          },
        });
        console.log(response.data.results);

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getUpcomingMovies();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <BeatLoader color="#E50914" size={20} />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-red-500 text-center py-20">حدث خطأ: {error}</div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40 pb-20">
      <div className="w-[90%] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          <span className="text-red-600">Recommended </span> Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative pb-[130%]">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder-movie.jpg"
                  }
                  alt={movie.title}
                  className="absolute w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute top-3 right-3 bg-gray-900/80 text-yellow-400 px-2 py-1 rounded-full text-sm font-bold flex items-center">
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
                {/* movie up coming date */}

                {movie.release_date && (
                  <div className="absolute bottom-4 left-4 group">
                    {/* العنصر الرئيسي */}
                    <div className="bg-gray-900/80 text-white px-4 py-2 rounded-full border border-gray-700 shadow-lg flex items-center gap-2 transition-all duration-300 group-hover:bg-red-600 group-hover:border-red-400 group-hover:scale-105 group-hover:shadow-red-500/40">
                      {/* أيقونة التقويم */}
                      <svg
                        className="w-5 h-5 text-red-400 group-hover:text-white group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>

                      {/* تاريخ الإصدار */}
                      <span className="font-medium">
                        {new Date(movie.release_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {/* هالة حمراء تظهر عند الهافر */}
                    <div
                      className="absolute inset-0 rounded-full bg-red-500/20 opacity-0 group-hover:opacity-100 
      transition-opacity duration-500 -z-10"
                    ></div>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-xl font-bold mb-1 line-clamp-2 h-14">
                  {movie.title}
                </h3>

                <div className="text-center">
                  <NavLink
                    to={`/movie/${movie.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md inline-flex items-center justify-center w-full transition-colors no-underline text-lg font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="18"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpCommingMovies;
