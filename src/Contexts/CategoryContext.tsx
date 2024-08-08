import React, { createContext, ReactNode, useState } from 'react';

interface Category {
  id: number;
  name: string;
  imagen: string;
  creationAt: string;
  updatedAt: string;
}

interface CategoryContextType {
  categories: Category[] | null;
  setCategories: (categories: Category[] | null) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>({
  categories: null,
  setCategories:()=>{}
});

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};