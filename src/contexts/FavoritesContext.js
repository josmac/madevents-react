import React, { useState, createContext, useContext } from "react";

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesContextProvider = ({ children }) => {
  const [favoritesData, setFavoritesData] = useState(null);

  const value = { favoritesData, setFavoritesData };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
