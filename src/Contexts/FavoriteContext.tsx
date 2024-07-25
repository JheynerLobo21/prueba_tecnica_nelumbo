import React, { createContext, useState, ReactNode, useContext } from 'react';

interface FavoritesContextProps {
  favoriteProducts: Set<number>;
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favoriteProducts: new Set(),
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Set<number>>(new Set());

  const addFavorite = (productId: number) => {
    setFavoriteProducts(prevFavorites => new Set(prevFavorites).add(productId));
  };

  const removeFavorite = (productId: number) => {
    setFavoriteProducts(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(productId);
      return newFavorites;
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavoriteProducts(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteProducts, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
