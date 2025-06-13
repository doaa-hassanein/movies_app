import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useApi } from "../context/ApiProvider";
import { BeatLoader } from "react-spinners";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { apiKey, baseUrl } = useApi();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]); // الممثلين

  async function fetchDetails() {
    try {
      const { data } = await axios.get(`${baseUrl}/movie/${id}`, {
        params: { api_key: apiKey, language: "en-US" },
      });
      setMovie(data);

      const trailerRes = await axios.get(`${baseUrl}/movie/${id}/videos`, {
        params: { api_key: apiKey, language: "en-US" },
      });

      const trailer = trailerRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);

      // Get Similar Movies
      const similarRes = await axios.get(`${baseUrl}/movie/${id}/similar`, {
        params: { api_key: apiKey, language: "en-US" },
      });
      setSimilarMovies(similarRes.data.results);

      // Get Cast
      const castRes = await axios.get(`${baseUrl}/movie/${id}/credits`, {
        params: { api_key: apiKey, language: "en-US" },
      });
      setCast(castRes.data.cast.slice(0, 10)); // أول 10 ممثلين بس

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [id, apiKey, baseUrl]);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-700 flex justify-center items-center">
        <BeatLoader color="#efe2e2" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      <div className=" mx-auto  px-2 md:px-4">
        <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>

          <div className="relative flex flex-col md:flex-row gap-8 p-8">
            {/* Poster */}
            <div className="w-full md:w-[30%] flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-xl shadow-lg "
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-white">
              {/* Title and Year */}
              <h1 className="text-5xl font-bold mb-2">
                {movie.title}{" "}
                <span className="text-3xl text-gray-400">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-lg">
                <span className="bg-red-800 px-3 py-1 rounded-full text-sm font-bold">
                  16+
                </span>
                <span>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>{movie.genres?.map((g) => g.name).join(", ")}</span>
              </div>

              {/* User Score */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">User Score</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-4 border-green-500 mr-4">
                    <span className="text-xl font-bold">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                  </div>
                  <span className="text-xl">What's your Vibe?</span>
                </div>
              </div>

              {/* Status and Budget from API */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { title: "STATUS", value: movie.status, icon: "🎬" },

                  {
                    title: "LANGUAGE",
                    value: movie.original_language?.toUpperCase(),
                    icon: "🗣️",
                  },
                  {
                    title: "RUNTIME",
                    value:
                      movie.runtime > 0
                        ? `${Math.floor(movie.runtime / 60)}h ${
                            movie.runtime % 60
                          }m`
                        : "N/A",
                    icon: "⏱️",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/70 p-4 rounded-lg hover:bg-gray-700/70 transition-colors border border-gray-700"
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 mt-0.5">{item.icon}</span>
                      <div>
                        <div className="flex items-baseline">
                          <h4 className="text-base font-semibold text-gray-300">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-lg font-bold text-white mt-1">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-2xl italic mb-6 text-gray-300">
                  "{movie.tagline}"
                </p>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-4xl font-semibold mb-2">Overview</h3>
                <p className="text-2xl leading-relaxed">{movie.overview}</p>
              </div>

              {/* Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movie.directors?.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold">Director</h4>
                    <p>{movie.directors.join(", ")}</p>
                  </div>
                )}
                {movie.writers?.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold">Screenplay</h4>
                    <p>{movie.writers.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section - تصميم مميز للتريلر */}
      {trailerKey && (
        <div className="mt-16 max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <h2 className="text-4xl font-bold text-red-600 flex items-center">
              <svg
                className="w-8 h-8 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.8L14 10l-7.7 7.2V2.8z" />
              </svg>
              Official Trailer
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800 hover:border-red-600 transition-all duration-300">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* Cast Section - تصميم الممثلين */}
      {cast.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <h2 className="text-4xl font-bold text-red-600 flex items-center">
              <svg
                className="w-8 h-8 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Top Cast
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
            {cast.slice(0, 7).map((actor) => (
              <div key={actor.id} className="group text-center">
                <div className="relative rounded-full overflow-hidden w-32 h-32 mx-auto mb-3 shadow-lg border-2 border-gray-700 group-hover:border-red-600 transition-all duration-300">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "/no-avatar.png"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                    <span className="text-white text-sm font-medium">
                      {actor.character}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">{actor.name}</p>
                <p className="text-gray-400 text-sm truncate max-w-[120px] mx-auto">
                  as {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies Section - أفلام مشابهة */}
      {similarMovies.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <h2 className="text-4xl font-bold text-red-600 flex items-center">
              <svg
                className="w-8 h-8 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V5h-1v2zm1 4v2h-1v-2h1zm-2 0h1v-2h-1v2zm-1 0v2H9v-2h2zm1-4h1V5h-1v2zm-2 0v2H9V7h2z"
                  clipRule="evenodd"
                />
              </svg>
              Similar Movies
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-gray-800 hover:border-red-600 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm mb-2 line-clamp-3">
                      {movie.overview}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm font-bold">
                        {movie.vote_average.toFixed(1)}/10
                      </span>
                      <span className="text-gray-300 text-sm">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">
                    {movie.title}
                  </h3>
                  <a
                    href={`/movie/${movie.id}`}
                    className="inline-flex items-center justify-center w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-lg font-medium transition-all duration-200 no-underline"
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
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
