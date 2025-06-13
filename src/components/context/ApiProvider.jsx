import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [apiKey] = useState("7aa23606c359a33c51bf4a2545102c40");
  const [baseUrl] = useState("https://api.themoviedb.org/3");

  return (
    <ApiContext.Provider value={{ apiKey, baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};
