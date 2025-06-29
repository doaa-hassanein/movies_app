import { useEffect } from "react";
import { useMyList } from "../context/myListProvider";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const MyList = () => {
  const { addToList, myList, removeFromList } = useMyList();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white pt-40 pb-20 px-4 md:px-8">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-3xl font-bold">
            <span className="text-red-600">My</span> List
          </h2>
        </div>

        {myList.length === 0 ? (
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              Your list is empty
            </h3>
            <NavLink
              to="/"
              className="text-red-500 hover:text-red-400 inline-block mt-4"
            >
              Browse movies to add to your list
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {myList.map((movie) => (
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
                  <div className="flex flex-row gap-2 w-full">
                    {/* زر التفاصيل */}
                    <NavLink
                      to={`/movie/${movie.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-2 sm:px-3 md:px-4 rounded-md flex items-center justify-center flex-1 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap min-w-[90px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        width="10"
                        viewBox="0 0 384 512"
                        className="fill-current mr-1 sm:mr-2"
                      >
                        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                      </svg>
                      <span className="truncate">Details</span>
                    </NavLink>

                    {/* زر الإزالة */}
                    <button
                      onClick={() => removeFromList(movie.id)}
                      className="border-2 border-gray-600 hover:border-white text-white py-2 px-2 sm:px-3 md:px-4 rounded-md flex items-center justify-center flex-1 text-sm sm:text-base transition-colors duration-300 whitespace-nowrap min-w-[100px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="truncate">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
