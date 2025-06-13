import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useApi } from "../context/ApiProvider";
import { BeatLoader } from "react-spinners";

const SeasonEpisodes = () => {
  const { id, seasonNumber } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [seasonInfo, setSeasonInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiKey, baseUrl } = useApi();

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        const seasonRes = await axios.get(
          `${baseUrl}/tv/${id}/season/${seasonNumber}`,
          {
            params: { api_key: apiKey },
          }
        );

        setSeasonInfo(seasonRes.data);
        setEpisodes(seasonRes.data.episodes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, [id, seasonNumber]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <BeatLoader color="#E50914" size={20} />
      </div>
    );
  }
  if (error)
    return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-32 pb-20">
      <div className="w-[90%] mx-auto px-4">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <Link
            to={`/tv/${id}`}
            className="absolute left-40 flex items-center text-red-400 hover:text-red-300 transition-colors no-underline "
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Series
          </Link>

          <h1 className="text-4xl font-bold text-center">
            {seasonInfo?.name || `Season ${seasonNumber}`}
          </h1>
        </div>

       
        
        {/* Episodes List */}
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 text-center">
          Episodes
        </h2>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-gray-800/50 rounded-lg overflow-hidden hover:bg-gray-700/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Episode Thumbnail */}
              <div className="relative pb-[56.25%] overflow-hidden">
                <img
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w400${episode.still_path}`
                      : "/placeholder-episode.jpg"
                  }
                  alt={`Episode ${episode.episode_number}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="bg-gray-900/80 px-2 py-1 rounded text-sm">
                    {episode.runtime} min
                  </span>
                </div>
              </div>

              {/* Episode Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold line-clamp-1">
                    {episode.episode_number}. {episode.name}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {episode.overview || "No description available."}
                </p>

                <div className="text-xs text-gray-400">
                  Aired: {new Date(episode.air_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonEpisodes;
