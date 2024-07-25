import { Button, Breadcrumb } from 'antd';
import { useContext } from 'react';
import { ProductContext } from '../../Contexts/ProductContext';
import { useLocation } from 'react-router-dom';
import '/src/css/description.css'

export const Redireccion = () => {
  const { setSelectedProduct, selectedProduct } = useContext(ProductContext);
  const location= useLocation();
  const category = location.pathname.split("/")[1];

  const handleClick = () => {
    setSelectedProduct(null); 
  }

  return (
    <div className="links">
      <Button className='back' onClick={handleClick}>Volver a resultados</Button>
      <Breadcrumb 
    items={[
      {title: <span>{category}</span>},
      {title: <span>{selectedProduct?.marca}</span>},
      {title: <span>{selectedProduct?.nombre}</span>},
    ]}
  />
    </div>
  );
};
