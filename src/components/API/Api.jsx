import axios from "axios";
import { useEffect } from "react";

const Api = () => {
  const API_KEY = "bbf8872eee2c01a2677607ee49d14ac5"; // mt key
  const BASE_URL = "https://api.themoviedb.org/3";

  async function getAllMovies() {
    const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });
    console.log(data);

    return data;
  }

  
  useEffect(() => {
    getAllMovies();
  }, []);
  return <div>Api</div>;
};

export default Api;
