export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  export interface AdaptedProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    marcas: string;
    tipo: string;
    reviews: number;
    fabricante: string;
    peso: string;
    dimensiones: string;
    pais: string;
    numeroModelo: number;
    color: string;
    material: string;
    piezas: number;
    caracteristicasEspeciales: string;
    componentesIncluidos: string;
    promocion: number;
    nombre: string,
    descripcion: string,
    precio: string;
    category: Category;
    precioFinal: number;
    precioMensual: number;
    precioSemanal: number;
  }

  export interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
  }
