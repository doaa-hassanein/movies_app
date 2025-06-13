import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import { ApiProvider } from "./components/context/ApiProvider";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TVShowsPage from "./components/TVShowsPage/TVShowsPage";
import ShowsDetails from "./components/ShowsDetails/ShowsDetails";
import UpCommingMovies from "./components/Upcomming/UpCommingMovies";
import Movies from "./components/Movies/Movies";
import SeasonEpisodes from "./components/SeasonEpisodes/SeasonEpisodes";
import { MyListProvider } from "./components/context/myListProvider";
import MyList from "./components/MyList/MyList";


function App() {
  const myRouter = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // upcomming
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/movies", element: <Movies /> },
        { path: "/upcomming", element: <UpCommingMovies /> },
        { path: "/movie/:id", element: <MovieDetails /> },
        { path: "/tv", element: <TVShowsPage /> },
        { path: "/mylist", element: <MyList /> },
        { path: "/tv/:id", element: <ShowsDetails /> },
        { path: "*", element: <NotFoundPage /> },
        { path: "/tv/:id/season/:seasonNumber", element: <SeasonEpisodes /> },
      ],
    },
  ]);
  return (
    <>
      <ApiProvider>
        <MyListProvider>
          <RouterProvider router={myRouter} />
        </MyListProvider>
      </ApiProvider>
    </>
  );
}

export default App;
