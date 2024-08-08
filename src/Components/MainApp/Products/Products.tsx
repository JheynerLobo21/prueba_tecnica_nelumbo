/*
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, FloatButton, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Product, products } from "../../../Constants/Constants";
import { Categorias } from "../../../Constants/Constants";
import "/src/css/main-page.css";
import { DetailsProduct } from "./DetailsProduct";
import { useFilter } from "../../../Contexts/FilterContext";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFavorites } from "../../../Contexts/FavoriteContext";
import { getProducts } from "../../../services/products";

interface Products {
  id: number;
  title: string;
  price: number;
  desription: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  marcas: string,
  tipo: string,
  reviews: number,
  fabricante: string,
  peso: string,
  dimensiones:string,
  pais:string,
  numeroModelo:number,
  color: string,
  material: string,
  piezas:number,
  caracteristicasEspeciales: string,
  componentesIncluidos: string,
  promocion:number,
  precio: number
  category: Category;
}

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}


export const Products: React.FC = () => {
  const { setSelectedProduct, selectedProduct } = useContext(ProductContext);
  const {
    order,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedStars,
    searchName,
    category,
  } = useFilter();
  const location = useLocation();
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const [listProducts, setListProducts] = useState<Products[]>([]);
  const [updatedProducts, setUpdateProducts] = useState<Products[]>([]);

  const currentCategory =
    category === "todas" ? location.pathname.split("/")[1] : category;
  const productos: Product[] =
    products[currentCategory as keyof Categorias] || [];

  const calculateFinalPrice = (producto: Product): number => {
    const precioNumerico = parseFloat(
      producto.precio.replace(/[^0-9.-]+/g, "")
    );
    const promocionNumerica = producto.promocion || 0;
    return promocionNumerica !== 0
      ? (precioNumerico * (100 - promocionNumerica)) / 100
      : precioNumerico;
  };

  const sortProducts = (products: Product[]): Product[] => {
    if (order === "reviews") {
      return products.sort((a, b) => b.reviews - a.reviews);
    }
    if (order === "precio") {
      return products.sort(
        (a, b) => calculateFinalPrice(a) - calculateFinalPrice(b)
      );
    }
    return products;
  };

  const handleClickDescription = (updatedProducts: Product) => {
    const precioNumerico = parseFloat(
      updatedProducts.precio.replace(/[^0-9.-]+/g, "")
    );
    const promocionNumerica = updatedProducts.promocion || 0;
    const precioFinal =
      promocionNumerica !== 0
        ? (precioNumerico * (100 - promocionNumerica)) / 100
        : precioNumerico;
    const precioMensual = precioFinal * 0.15;
    const precioSemanal = Math.round((precioFinal * 0.15) / 4);

    setSelectedProduct(updatedProducts, precioFinal, precioMensual, precioSemanal);
  };

  const filteredProducts = productos
    .filter(
      (producto) =>
        selectedBrands.length === 0 || selectedBrands.includes(producto.marca)
    )
    .filter(
      (producto) =>
        selectedStars === 0 ||
        producto.reviews === selectedStars ||
        selectedStars === null
    )
    .filter((producto) => {
      const precioFinal = calculateFinalPrice(producto);
      return precioFinal >= minPrice && precioFinal <= maxPrice;
    })
    .filter(
      (producto) =>
        searchName === "" ||
        producto.nombre.toLowerCase().includes(searchName.toLowerCase())
    );

  const productsToDisplay =
    order === "favoritos"
      ? filteredProducts.filter((updatedProducts) => favoriteProducts.has(updatedProducts.id))
      : filteredProducts;

  const sortedProducts = sortProducts(productsToDisplay).filter(
    (producto) =>
      selectedProduct === null ||
      (producto.marca === selectedProduct?.marca &&
        producto.nombre !== selectedProduct?.nombre)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setListProducts(await getProducts());
      } catch (error) {
        console.error("Error fetching getUser:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AdaptedProducts = listProducts.map((product) => {
          return {
            ...product,
            marcas: "marcaPrueba",
            tipo: "tipopPrueba",
            reviews: 3.5,
            fabricante:"Samsung Electronics",
            peso: "150 gr",
            dimensiones:"16 x 8 x 0.7 cm",
            pais:"Corea del sur",
            numeroModelo:264722,
            color:"gris",
            material:"Silicona plástica",
            piezas:4,
            caracteristicasEspeciales:"Resistencia al agua",
            componentesIncluidos:"Manual de usuario, cargador, audífonos",
            promocion:40,
            precio: 4000
          };
        });
        setUpdateProducts(AdaptedProducts);
        console.log(updatedProducts);
      } catch (error) {
        console.error("Error fetching getUser:", error);
      }
    };

    fetchData();
  }, [listProducts]);

  return (
    <div>
      {sortedProducts.length > 0 ? (
        <ul className="list-of-products">
          {sortedProducts.map((producto, index: number) => {
            const precioFinal = calculateFinalPrice(producto);
            const precioMensual = precioFinal * 0.15;
            const precioSemanal = Math.round((precioFinal * 0.15) / 4);

            const productoConDetalles = {
              ...producto,
              precioFinal,
              precioMensual,
              precioSemanal,
            };

            const isFavorite = favoriteProducts.has(producto.id);

            return (
              <li key={index} className="item-product">
                <Space>
                  {isFavorite ? (
                    <HeartFilled
                      className={`favorite ${
                        isFavorite ? "favorite-active" : ""
                      }`}
                      onClick={() => toggleFavorite(producto.id)}
                      style={{ fontSize: "28px", color: "skyblue" }}
                    />
                  ) : (
                    <HeartOutlined
                      className="favorite"
                      onClick={() => toggleFavorite(producto.id)}
                      style={{ fontSize: "28px" }}
                    />
                  )}
                </Space>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      style={{ height: "250px" }}
                      src={producto.images[0]}
                      onClick={() => handleClickDescription(producto)}
                    />
                  }
                >
                  {producto.promocion !== 0 && (
                    <FloatButton
                      className="floating-button"
                      icon={`${producto.promocion}%`}
                    />
                  )}
                  <DetailsProduct producto={productoConDetalles} />
                </Card>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 style={{ textAlign: "center", color: "red" }}>
          No hay productos para ese filtrado
        </h3>
      )}
    </div>
  );
};
*/

import React, { useContext, useEffect, useState } from "react";
import { Card, FloatButton, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFavorites } from "../../../Contexts/FavoriteContext";
import { getProducts } from "../../../services/products";
import "/src/css/main-page.css";
import { DetailsProduct } from "./DetailsProduct";
import { AdaptedProduct, Product } from "../../../types/InterfacesProducts";
import { useFilter } from "../../../Contexts/FilterContext";

export const Products: React.FC = () => {
  const pathName = window.location.pathname.split("/")[1];
  console.log(pathName);
  const { setSelectedProduct } = useContext(ProductContext);
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const [adaptedProducts, setAdaptedProducts] = useState<AdaptedProduct[]>([]);
  const { searchName} = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await getProducts();
        const adaptedProducts: AdaptedProduct[] = products.map((product) => ({
          ...product,
          marcas: "marcaPrueba",
          tipo: "tipoPrueba",
          reviews: 3.5,
          fabricante: "Samsung Electronics",
          peso: "150 gr",
          dimensiones: "16 x 8 x 0.7 cm",
          pais: "Corea del Sur",
          numeroModelo: 264722,
          color: "gris",
          material: "Silicona plástica",
          piezas: 4,
          caracteristicasEspeciales: "Resistencia al agua",
          componentesIncluidos: "Manual de usuario, cargador, audífonos",
          promocion: 40,
          precio: 4000,
          precioSemanal:10,
          precioMensual:15
        }));
        setAdaptedProducts(adaptedProducts.filter(product=>product.category.name===pathName.replace("-", " ")));
        console.log(adaptedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    console.log(adaptedProducts);
  }, [pathName]);

  const filteredProducts = adaptedProducts
    .filter(
      (producto) =>
        searchName === "" ||
        producto.nombre.toLowerCase().includes(searchName.toLowerCase())
    );


  const handleClickDescription = (adaptedProducts: Product) => {
    const promocionNumerica = adaptedProducts.promocion || 0;
    const precioFinal =
      promocionNumerica !== 0
        ? (adaptedProducts.price * (100 - promocionNumerica)) / 100
        : adaptedProducts.price;
    const precioMensual = precioFinal * 0.15;
    const precioSemanal = Math.round((precioFinal * 0.15) / 4);

    setSelectedProduct(adaptedProducts, precioFinal, precioMensual, precioSemanal);
  };

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <ul className="list-of-products">
          {adaptedProducts.map((product, index: number) => {
            const isFavorite = favoriteProducts.has(product.id);

            return (
              <li key={index} className="item-product">
                <Space>
                  {isFavorite ? (
                    <HeartFilled
                      className={`favorite ${isFavorite ? "favorite-active" : ""}`}
                      onClick={() => toggleFavorite(product.id)}
                      style={{ fontSize: "28px", color: "skyblue" }}
                    />
                  ) : (
                    <HeartOutlined
                      className="favorite"
                      onClick={() => toggleFavorite(product.id)}
                      style={{ fontSize: "28px" }}
                    />
                  )}
                </Space>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      style={{ height: "250px" }}
                      src={product.images[0]}
                      onClick={() => handleClickDescription(product)}
                    />
                  }
                >
                  {product.promocion !== 0 && (
                    <FloatButton
                      className="floating-button"
                      icon={`${product.promocion}%`}
                    />
                  )}
                  <DetailsProduct 
                    producto={product}/>
                </Card>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 style={{ textAlign: "center", color: "red" }}>
          No hay productos disponibles
        </h3>
      )}
    </div>
  );
};
