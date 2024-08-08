import React, { createContext, useState, ReactNode, useContext } from 'react';

interface FilterContextType {
  order: string;
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  selectedStars: number | null;
  searchName: string;
  category: string;
  setOrder: (order: string) => void;
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setSelectedStars: (stars: number | null) => void;
  setSearchName: (name: string) => void;
  setCategory: (category: string) => void;
  resetFilters: () => void;
  
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]); 
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [searchName, setSearchName] = useState<string>('');
  const [category, setCategory] = useState<string>('todas');

  const resetFilters = () => {
    setOrder('');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(Infinity);
    setSelectedStars(null);
    setSearchName('');
    setCategory('todas');
  };

  return (
    <FilterContext.Provider
      value={{
        order,
        selectedBrands,
        minPrice,
        maxPrice,
        selectedStars,
        searchName,
        category,
        setOrder,
        setSelectedBrands,
        setMinPrice,
        setMaxPrice,
        setSelectedStars,
        setSearchName,
        setCategory,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
