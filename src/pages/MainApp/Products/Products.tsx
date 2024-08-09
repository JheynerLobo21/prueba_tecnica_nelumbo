import React, { useContext, useEffect, useState } from "react";
import { Card, FloatButton, Space } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFavorites } from "../../../Contexts/FavoriteContext";
import { getProducts } from "../../../services/products";
import "/src/css/main-page.css";
import { DetailsProduct } from "./DetailsProduct";
import { AdaptedProduct, Product } from "../../../Utils/types/InterfacesProducts";
import { useFilter } from "../../../Contexts/FilterContext";
import { useCategories } from "../../../Contexts/CategoryContext";

export const Products: React.FC = () => {
  const pathName = window.location.pathname.split("/")[1];
  const { setSelectedProduct, selectedProduct } = useContext(ProductContext);
  const { categories } = useCategories();
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const [adaptedProducts, setAdaptedProducts] = useState<AdaptedProduct[]>([]);
  const { minPrice, maxPrice, selectedStars, order, searchName, category } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
        try {
          let products: Product[] = [];
            categories?.map(async (category) => {
                if (category.name === pathName) {
                  if (minPrice !== null && maxPrice !== null) {
                    products = await getProducts(category.id, minPrice, maxPrice);
                } else{
                  products = await getProducts(category.id, null, null);
                  }
                    const adaptedProducts: AdaptedProduct[] = products.map((product) => ({
                        ...product,
                        marcas: "marcaPrueba",
                        tipo: "tipoPrueba",
                        reviews: Math.round(Math.random() * 5),
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
                        precioSemanal: 10,
                        precioMensual: 15,
                    }));
                    setAdaptedProducts(
                        adaptedProducts.filter(
                            (product) => product.category.name === pathName.replace("-", " ")
                        )
                    );
                }
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    fetchData();
}, [pathName, minPrice, maxPrice]);

  const filteredProducts = adaptedProducts
    .filter(
      (producto) =>
        selectedStars === 0 ||
        producto.reviews === selectedStars ||
        selectedStars === null
    )
    .filter(
      (producto) =>
        searchName === "" ||
        category==="todas"?
        producto.title.toLowerCase().includes(searchName.toLowerCase())
        :
        producto.title.toLowerCase().includes(searchName.toLowerCase()) && producto.category.name===category
    );

  const sortProducts = (products: AdaptedProduct[]): AdaptedProduct[] => {
    let sorted = products;

    if (order === "reviews") {
      sorted = products.sort((a, b) => b.reviews - a.reviews);
    } else if (order === "precio") {
      sorted = products.sort((a, b) => a.price - b.price);
    }

    if (order === "favoritos") {
      sorted = sorted.filter((product) => favoriteProducts.has(product.id));
    }
    if(selectedProduct!=null){
      sorted= sorted.filter((producto) => producto.nombre !== selectedProduct?.title)
    }

    return sorted;
  };

  const sortedProducts = sortProducts(filteredProducts);

  const handleClickDescription = (adaptedProduct: AdaptedProduct) => {
    const promocionNumerica = adaptedProduct.promocion || 0;
    const precioFinal =
      promocionNumerica !== 0
        ? (adaptedProduct.price * (100 - promocionNumerica)) / 100
        : adaptedProduct.price;
    const precioMensual = precioFinal * 0.15;
    const precioSemanal = Math.round((precioFinal * 0.15) / 4);

    setSelectedProduct(
      adaptedProduct,
      precioFinal,
      precioMensual,
      precioSemanal
    );
  };

  return (
    <div>
      {sortedProducts.length > 0 ? (
        <ul className="list-of-products">
          {sortedProducts.map((product, index: number) => {
            const isFavorite = favoriteProducts.has(product.id);

            return (
              <li key={index} className="item-product">
                <Space>
                  {isFavorite ? (
                    <HeartFilled
                      className={`favorite ${
                        isFavorite ? "favorite-active" : ""
                      }`}
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
                      alt={product.title}
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
                  <DetailsProduct producto={product} />
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
