import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AdaptedProduct } from '../types/InterfacesProducts'; 
import { getProducts } from '../helpers/fetchPetitions'; 

interface ProductContextProps {
  selectedProduct: AdaptedProduct | null;
  setSelectedProduct: (product: AdaptedProduct | null, precioFinal?: number | null, precioMensual?: number | null, precioSemanal?: number | null) => void;
  precioFinal: number | null;
  precioMensual: number | null;
  precioSemanal: number | null;
  allProducts: AdaptedProduct[];
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
  getRelatedProducts: () => [],
  resetProduct: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProductState] = useState<AdaptedProduct | null>(null);
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);
  const [precioMensual, setPrecioMensual] = useState<number | null>(null);
  const [precioSemanal, setPrecioSemanal] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<AdaptedProduct[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

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
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, precioFinal, precioMensual, precioSemanal, allProducts, getRelatedProducts, resetProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
