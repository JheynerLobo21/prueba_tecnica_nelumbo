import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, FloatButton, Space } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Product, products } from '../../../Constants/Constants';
import { Categorias } from '../../../Constants/Constants';
import '/src/css/main-page.css';
import { DetailsProduct } from './DetailsProduct';
import { useFilter } from '../../../Contexts/FilterContext';
import { ProductContext } from '../../../Contexts/ProductContext';
import { useFavorites } from '../../../Contexts/FavoriteContext'; 

export const Products: React.FC = () => {
  const { setSelectedProduct, selectedProduct } = useContext(ProductContext);
  const { order, selectedBrands, minPrice, maxPrice, selectedStars, searchName, category } = useFilter();
  const location = useLocation();
  const { favoriteProducts, toggleFavorite } = useFavorites();

  const currentCategory = category === 'todas' ? location.pathname.split('/')[1] : category;
  const productos: Product[] = products[currentCategory as keyof Categorias] || [];

  const calculateFinalPrice = (producto: Product): number => {
    const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ""));
    const promocionNumerica = producto.promocion || 0;
    return promocionNumerica !== 0
      ? precioNumerico * (100 - promocionNumerica) / 100
      : precioNumerico;
  };

  const sortProducts = (products: Product[]): Product[] => {
    if (order === 'reviews') {
      return products.sort((a, b) => b.reviews - a.reviews);
    }
    if (order === 'precio') {
      return products.sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b));
    }
    return products;
  };

  const handleClickDescription = (producto: Product) => {
    const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ""));
    const promocionNumerica = producto.promocion || 0;
    const precioFinal = promocionNumerica !== 0
      ? precioNumerico * (100 - promocionNumerica) / 100
      : precioNumerico;
    const precioMensual = precioFinal * 0.15;
    const precioSemanal = Math.round((precioFinal * 0.15) / 4);

    setSelectedProduct(producto, precioFinal, precioMensual, precioSemanal);
  };

  const filteredProducts = productos
    .filter(producto => selectedBrands.length === 0 || selectedBrands.includes(producto.marca))
    .filter(producto => selectedStars === 0 || producto.reviews === selectedStars || selectedStars === null)
    .filter(producto => {
      const precioFinal = calculateFinalPrice(producto);
      return precioFinal >= minPrice && precioFinal <= maxPrice;
    })
    .filter(producto => searchName === '' || producto.nombre.toLowerCase().includes(searchName.toLowerCase()));

  // Filtra productos favoritos solo si la opción de favoritos está seleccionada
  const productsToDisplay = order === 'favoritos'
    ? filteredProducts.filter(producto => favoriteProducts.has(producto.id))
    : filteredProducts;

  const sortedProducts = sortProducts(productsToDisplay)
    .filter(producto => selectedProduct === null || (producto.marca === selectedProduct?.marca && producto.nombre !== selectedProduct?.nombre));

  return (
    <div>
      {sortedProducts.length > 0 ? (
        <ul className="list-of-products">
          {sortedProducts.map((producto: Product, index: number) => {
            const precioFinal = calculateFinalPrice(producto);
            const precioMensual = precioFinal * 0.15;
            const precioSemanal = Math.round((precioFinal * 0.15) / 4);

            const productoConDetalles = {
              ...producto,
              precioFinal,
              precioMensual,
              precioSemanal
            };

            const isFavorite = favoriteProducts.has(producto.id);

            return (
              <li key={index} className="item-product">
                <Space>
                  {isFavorite ? 
                    <HeartFilled
                      className={`favorite ${isFavorite ? 'favorite-active' : ''}`}
                      onClick={() => toggleFavorite(producto.id)}
                      style={{ fontSize: "28px", color: "skyblue" }}
                    />
                    :
                    <HeartOutlined
                      className='favorite'
                      onClick={() => toggleFavorite(producto.id)}
                      style={{ fontSize: "28px" }}
                    />
                  }
                </Space>
                <Card
                  hoverable
                  cover={<img alt="example" style={{ height: "250px" }} src={producto.images[0]} onClick={() => handleClickDescription(producto)} />}
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
        <h3 style={{ textAlign: "center", color: "red" }}>No hay productos para ese filtrado</h3>
      )}
    </div>
  );
};
