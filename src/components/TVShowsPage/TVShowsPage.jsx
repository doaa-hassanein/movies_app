import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useMyList } from "../context/myListProvider";

const TVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToList, myList, removeFromList } = useMyList();

  const isInMyList = (movieId) => {
    return myList.some((movie) => movie.id === movieId);
  };

  async function fetchTVShows() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=7aa23606c359a33c51bf4a2545102c40&language=en-US&page=1`,
        {}
      );
      setShows(response.data.results);
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTVShows();
  }, []);
  
  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <BeatLoader color="#E50914" size={20} />
      </div>
    );
  }
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-40 pb-20">
      <div className="w-[90%] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          <span className="text-red-600">Popular </span> TV Shows
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="group relative rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative pb-[130%]">
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : "/placeholder-tvshow.jpg"
                  }
                  alt={show.name}
                  className="absolute w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute top-3 right-3 bg-gray-900/80 text-yellow-400 px-2 py-1 rounded-full text-sm font-bold flex items-center">
                  ⭐ {show.vote_average.toFixed(1)}
                </div>

                {show.first_air_date && (
                  <div className="absolute bottom-3 left-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-base font-medium">
                    {new Date(show.first_air_date).getFullYear()}
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-xl font-bold mb-1 line-clamp-2 h-14">
                  {show.name}
                </h3>
                <div className="text-center">
                  <NavLink
                    to={`/tv/${show.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 mb-3 px-4 rounded-md inline-flex items-center justify-center w-full transition-colors no-underline text-lg font-medium "
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
                  {!isInMyList(show.id) ? (
                    <button
                      onClick={() => addToList(show)}
                      className="w-full bg-transparent border-2 border-gray-600 hover:border-white text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
                    >
                      Add to List
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromList(show.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
                    >
                      In My List
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowsPage;
