import { createContext, useState, useEffect, useContext } from "react";

export const MyListContext = createContext();

export const useMyList = () => useContext(MyListContext);

export const MyListProvider = ({ children }) => {
  // 
  const [myList, setMyList] = useState(() => {
    try {
      const saved = localStorage.getItem("myMovieList");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse myMovieList:", err);
      return [];
    }
  });

  //
  useEffect(() => {
    try {
      localStorage.setItem("myMovieList", JSON.stringify(myList));
    } catch (err) {
      console.error("Failed to save myMovieList:", err);
    }
  }, [myList]);

  // 3) add movie
  const addToList = (movie) =>
    setMyList((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );

  // 4) remove
  const removeFromList = (movieId) =>
    setMyList((prev) => prev.filter((movie) => movie.id !== movieId));

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </MyListContext.Provider>
  );
};
