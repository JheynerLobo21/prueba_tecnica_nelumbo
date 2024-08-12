import React, { createContext, useState, ReactNode } from 'react';
import { AdaptedProduct } from '../types/InterfacesProducts';

interface ProductContextProps {
  selectedProduct: AdaptedProduct | null;
  setSelectedProduct: (product: AdaptedProduct | null, precioFinal?: number | null, precioMensual?: number | null, precioSemanal?: number | null) => void;
  precioFinal: number | null;
  precioMensual: number | null;
  precioSemanal: number | null;
  allProducts: AdaptedProduct[];
  setAllProducts: (products: AdaptedProduct[]) => void;
  getRelatedProducts: (category: string) => AdaptedProduct[];
  resetProduct: () => void;
}

export const ProductContext = createContext<ProductContextProps>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  precioFinal: null,
  precioMensual: null,
  precioSemanal: null,
  allProducts: [],
  setAllProducts: () => {},
  getRelatedProducts: () => [],
  resetProduct: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProductState] = useState<AdaptedProduct | null>(null);
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);
  const [precioMensual, setPrecioMensual] = useState<number | null>(null);
  const [precioSemanal, setPrecioSemanal] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<AdaptedProduct[]>([]);

  const resetProduct = () => {
    setSelectedProductState(null);
    setPrecioFinal(null);
    setPrecioMensual(null);
    setPrecioSemanal(null);
  };

  const setSelectedProduct = (product: AdaptedProduct | null, precioFinal: number | null = null, precioMensual: number | null = null, precioSemanal: number | null = null) => {
    setSelectedProductState(product);
    setPrecioFinal(precioFinal);
    setPrecioMensual(precioMensual);
    setPrecioSemanal(precioSemanal);
  };

  const getRelatedProducts = (category: string) => {
    return allProducts.filter(product => product.tipo === category);
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, precioFinal, precioMensual, precioSemanal, allProducts, setAllProducts, getRelatedProducts, resetProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
