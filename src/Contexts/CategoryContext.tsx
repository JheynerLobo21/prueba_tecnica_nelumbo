import React, { createContext, ReactNode, useState, useContext } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryContextType {
  categories: Category[] | null;
  setCategories: (categories: Category[] | null) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories debe ser usado dentro de un CategoryProvider');
  }
  return context;
};
