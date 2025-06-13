import { NavLink } from "react-router-dom";

const Ucard = ({ item, releaseDate }) => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-zinc-900 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-96">
      {/* الصورة كخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
          filter: "brightness(0.7)",
        }}
      />

      {/* المحتوى فوق الصورة */}
      <div className="relative h-full flex flex-col justify-center p-6">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
          
          <p className="text-2xl text-white  mt-6 italic">
             🎞 Coming on{" "}
            <span className="font-semibold text-white">{releaseDate}</span>
          </p>
        </div>

        <NavLink
          to={`/movie/${item.id}`}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md inline-flex items-center justify-center transition-colors duration-300 w-52 text-xl no-underline"
        >
          <div className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="15"
              viewBox="0 0 384 512"
              className="fill-current"
            >
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </div>
          <span className="no-underline">PLAY NOW</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Ucard;
