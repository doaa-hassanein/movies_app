import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useApi } from "../context/ApiProvider";

const TVShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiKey, baseUrl } = useApi();

  const fetchShowDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // الجلب المتوازي للبيانات الأساسية
      const [detailsRes, castRes] = await Promise.all([
        axios.get(`${baseUrl}/tv/${id}`, {
          params: { api_key: apiKey, language: "ar-EG" },
        }),
        axios.get(`${baseUrl}/tv/${id}/credits`, {
          params: { api_key: apiKey, language: "en-US" },
        }),
      ]);

      setShow(detailsRes.data);
      setCast(castRes.data.cast.slice(0, 10));

      // محاولة جلب المواسم إذا كانت غير موجودة في detailsRes
      let seasonsData = [];
      if (detailsRes.data.seasons && detailsRes.data.seasons.length > 0) {
        seasonsData = detailsRes.data.seasons;
      } else {
        try {
          const seasonsRes = await axios.get(`${baseUrl}/tv/${id}/seasons`, {
            params: { api_key: apiKey },
          });
          seasonsData = seasonsRes.data.seasons || [];
        } catch (seasonsError) {
          console.warn(
            "Failed to fetch seasons separately:",
            seasonsError.message
          );
        }
      }

      // معالجة البيانات لضمان وجود الحقول الأساسية
      setSeasons(
        seasonsData.map((season) => ({
          id: season.id || `${id}-${season.season_number}`,
          season_number: season.season_number || 0,
          name: season.name || `الموسم ${season.season_number}`,
          poster_path: season.poster_path || detailsRes.data.poster_path,
          air_date: season.air_date || detailsRes.data.first_air_date,
          episode_count: season.episode_count || 0,
        }))
      );
    } catch (err) {
      setError(err.response?.data?.status_message || err.message);
      console.error("Fetch error:", {
        url: err.config?.url,
        status: err.response?.status,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [id]);

  if (loading)
    return <div className="text-white text-center py-20">جاري التحميل...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-20">حدث خطأ: {error}</div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      {/* Hero Section with Subtle Background */}
      <div className="relative">
        {/* Background Image - Subtle and Darkened */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-700/10 to-transparent"></div>

        <div className="w-[96%] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 relative z-10">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">
              {show.name}
              <span className="text-2xl text-gray-400 ml-2">
                ({new Date(show.first_air_date).getFullYear()})
              </span>
            </h1>

            {/* Tagline */}
            {show.tagline && (
              <p className="text-xl italic text-gray-300 mb-6">
                "{show.tagline}"
              </p>
            )}

            {/* Basic Info Badges */}
            <div className="mt-4 flex flex-wrap gap-4 mb-6 text-xl">
              <span className="bg-red-800 px-3 py-1 rounded-full text-base font-bold">
                {show.original_language?.toUpperCase()}
              </span>
              <span>
                {new Date(show.first_air_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>{show.genres?.map((g) => g.name).join(", ")}</span>
            </div>

            {/* User Score */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">User Score</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-4 border-green-500 mr-4">
                  <span className="text-xl font-bold">
                    {Math.round(show.vote_average * 10)}%
                  </span>
                </div>
                <span className="text-xl">What's your Vibe?</span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2">Overview</h3>
              <p className="text-lg leading-relaxed">{show.overview}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Cast Section - Moved Below */}
      {cast.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto px-4">
          {/* Header with stylish gradient line */}
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

          {/* Cast Grid - Responsive with hover effects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {cast.slice(0, 9).map((actor) => (
              <div key={actor.id} className="group text-center">
                {/* Circular Avatar with Hover Effect */}
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
                  {/* Character Name on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                    <span className="text-white text-sm font-medium px-2">
                      {actor.character}
                    </span>
                  </div>
                </div>

                {/* Actor Info */}
                <div className="px-2">
                  <p className="text-lg font-semibold text-white truncate">
                    {actor.name}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    as {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seasons Section - Moved Below */}

      {/* عرض المواسم */}

      
      <div className="mt-12  max-w-7xl mx-auto pb-20">
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
              Seasons
            </h2>
            <div className="ml-4 h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>

        {seasons.length === 0 ? (
          <div className="bg-gray-800/30 p-8 rounded-lg text-center">
            <p className="text-gray-400 mb-4">لا تتوفر بيانات المواسم</p>
            {error && (
              <p className="text-red-400 text-sm">
                {error.includes("404")
                  ? "المسلسل قد لا يحتوي على مواسم مسجلة"
                  : error}
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {seasons
              .sort((a, b) => a.season_number - b.season_number)
              .map((season) => (
                <div key={season.id} className="group">
                  <Link
                    to={`/tv/${id}/season/${season.season_number}`}
                    className="block hover:scale-105 transition-transform"
                  >
                    <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg bg-gray-800">
                      <img
                        src={
                          season.poster_path
                            ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                            : "/placeholder-season.jpg"
                        }
                        alt={`موسم ${season.season_number}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-season.jpg";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <span className="text-white font-medium">
                          {season.name}
                        </span>
                      </div>
                    </div>
                    
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowDetails;
