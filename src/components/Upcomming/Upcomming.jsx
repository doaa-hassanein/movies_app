import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ucard from "./Ucard";
import Slider from "react-slick";
import axios from "axios";
import { useApi } from "./../context/ApiProvider";
import { format } from "date-fns"; // استخدام date-fns لتنسيق التاريخ
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css';

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
        <i className="fa fa-chevron-left"></i>
      </button>
    </div>
  );
};

const Upcomming = ({ title, searchTerm }) => {
  const { apiKey, baseUrl } = useApi();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/movie/upcoming`, {
          params: {
            api_key: apiKey,
            language: "en-US",
            page: 1,
          },
        });
        setUpcomingMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error.message);
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, [apiKey, baseUrl]);

  // فلترة حسب searchTerm لو موجود
  const filteredMovies = searchTerm
    ? upcomingMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : upcomingMovies;

  const settings = {
    dots: false,
    infinite: filteredMovies.length > 1, // لو فيه فيلم واحد فقط خلي infinite: false
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
    },
  },
],

  };

  const formatReleaseDate = (date) => {
    // تحويل التاريخ بتنسيق 'YYYY-MM-DD' إلى تنسيق مناسب مثل 'June 25, 2025'
    return format(new Date(date), "dd MMMM , yyyy");
  };

  if (loading) return null;

  return (
    <section className="upcoming py-10 bg-zinc-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="heading flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      <Link
        to="/upcomming"
        className="text-amber-500 hover:text-amber-600 transition-colors duration-300 no-underline text-lg sm:text-xl font-medium"
      >
        View All
      </Link>
    </div>

    <div className="content relative">
      {filteredMovies.length > 0 ? (
        filteredMovies.length === 1 ? (
          <div className="single-movie-container w-full max-w-md mx-auto">
            <Ucard
              item={filteredMovies[0]}
              releaseDate={formatReleaseDate(filteredMovies[0].release_date)}
            />
          </div>
        ) : (
          <Slider {...settings}>
            {filteredMovies.map((item) => (
              <div key={item.id} className="px-2 sm:px-3">
                <Ucard
                  item={item}
                  releaseDate={formatReleaseDate(item.release_date)}
                />
              </div>
            ))}
          </Slider>
        )
      ) : (
        <p className="text-center text-gray-400">
          No matching upcoming movies found.
        </p>
      )}
    </div>
  </div>
</section>

  );
};

export default Upcomming;
