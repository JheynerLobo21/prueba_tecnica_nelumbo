import { useContext, useEffect, useState } from "react";
import { Card, FloatButton } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFavorites } from "../../../Contexts/FavoriteContext";
import { getProducts } from "../../../helpers/fetchPetitions";
import "/src/css/main-page.css";
import { DetailsProduct } from "./DetailsProduct";
import { AdaptedProduct, Product, Category } from "../../../types/InterfacesProducts";
import { useFilter } from "../../../Contexts/FilterContext";
import { useCategories } from "../../../Contexts/CategoryContext";

interface Props {
  cantidad: number | null;
}

const adaptProduct = (product: Product, category: Category): AdaptedProduct => {
  const promocionNumerica = Math.round(Math.random() *100); 
  const precioFinal = product.price - (product.price * promocionNumerica) / 100;

  return {
    ...product,
    nombre: product.title,
    descripcion: product.description,
    category: category,
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
    promocion: promocionNumerica,
    precioFinal: precioFinal,
    precioMensual: Math.round(precioFinal * 0.15),
    precioSemanal: Math.round((precioFinal * 0.15) / 4),
    precio:"4000"
  };
};

export const Products = ({ cantidad }: Props) => {
  const pathName = window.location.pathname.split("/")[1];
  const { setSelectedProduct, selectedProduct, setAllProducts } = useContext(ProductContext);
  const { categories } = useCategories();
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const [adaptedProducts, setAdaptedProducts] = useState<AdaptedProduct[]>([]);
  const { minPrice, maxPrice, selectedStars, order, searchName, category } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let products: Product[] = [];

        for (const category of categories || []) {
          if (category.name === pathName) {
            if (minPrice !== null && maxPrice !== null && minPrice < maxPrice) {
              products = await getProducts(category.id, minPrice, maxPrice);
            } else {
              products = await getProducts(category.id, null, null);
            }

            const adaptedProducts: AdaptedProduct[] = products.map((product) =>
              adaptProduct(product, category)
            );

            setAdaptedProducts(
              adaptedProducts.filter(
                (product) => product.category.name === pathName.replace("-", " ")
              )
            );
            setAllProducts(adaptedProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [pathName, minPrice, maxPrice, categories, setAllProducts]);

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
        category === "todas"
          ? producto.title.toLowerCase().includes(searchName.toLowerCase())
          : producto.title.toLowerCase().includes(searchName.toLowerCase()) &&
            producto.category.name === category
    )
    .filter(
      (producto) =>
        (minPrice === null || producto.price >= minPrice) &&
        (maxPrice === null || producto.price <= maxPrice)
    );

  const sortProducts = (products: AdaptedProduct[]): AdaptedProduct[] => {
    let sorted = [...products];

    if (order === "reviews") {
      sorted = sorted.sort((a, b) => b.reviews - a.reviews);
    } else if (order === "precio") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }

    if (order === "favoritos") {
      sorted = sorted.filter((product) => favoriteProducts.has(product.id));
    }
    if (selectedProduct != null) {
      sorted = sorted.filter((producto) => producto.nombre !== selectedProduct?.title);
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
    <div className="list-products">
      {sortedProducts.length > 0 ? (
        <ul className={`list-of-products ${cantidad ? "list-products-sold" : ""}`}>
          {sortedProducts
            .slice(0, cantidad != null ? cantidad : sortedProducts.length)
            .map((product, index: number) => {
              const isFavorite = favoriteProducts.has(product.id);
              return (
                <li key={index} className="item-product">
                  {isFavorite ? (
                    <HeartFilled
                      className="favorite-active"
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
                  <Card
                    className="img-product-card"
                    hoverable
                    cover={
                    <img alt="example" 
                    src={product.images[0]} 
                    style={{height:"350px"}}
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src =
                        "https://media.istockphoto.com/id/1128826884/es/vector/ning%C3%BAn-s%C3%ADmbolo-de-vector-de-imagen-falta-icono-disponible-no-hay-galer%C3%ADa-para-este-momento.jpg?s=612x612&w=0&k=20&c=9vnjI4XI3XQC0VHfuDePO7vNJE7WDM8uzQmZJ1SnQgk=";}}
                    />}
                    onClick={() => handleClickDescription(product)}
                  >
                    <FloatButton
                        className="floating-button"
                        icon={`${product.promocion}%`}
                        style={{ textAlign: 'center' }}
                      />
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
