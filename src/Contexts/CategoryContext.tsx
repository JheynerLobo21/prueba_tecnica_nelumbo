import { createContext, ReactNode, useState } from "react";

interface Categories {
  id: number;
  name: string;
  imagen: string;
  creationAt: string;
  updatedAt: string;
}

interface CategoryContextType {
  categories: Categories[] | null;
  setCategories: (categories: Categories[]) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Categories[] | null>(null);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};