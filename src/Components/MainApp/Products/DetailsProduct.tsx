import { Product } from '../../../Constants/Constants';
import { Rate, Button } from 'antd';
import '/src/css/main-page.css';
import { useContext, useState } from 'react';
import { ModalProduct } from '../modal/ModalProduct';
import { ProductContext } from '../../../Contexts/ProductContext';

interface DetailsProductProps {
  producto: Product & { precioFinal: number; precioMensual: number; precioSemanal: number };
}

export const DetailsProduct: React.FC<DetailsProductProps> = ({ producto }) => {
  const { setSelectedProduct } = useContext(ProductContext);

  const [openModal, setOpenModal] = useState(false);

  const { nombre, reviews, promocion = 0, precioFinal, precioMensual, precioSemanal } = producto;

  const handleClickModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickDescription = () => {
    setSelectedProduct(producto, precioFinal, precioMensual, precioSemanal);
  };

  const precioOriginal = promocion !== 0 ? (precioFinal * (100 + promocion) / 100).toFixed(2) : undefined;

  return (
    <div className='details-product'>
      <div className="name-price-week">
        <span className='name-product' onClick={handleClickDescription}>{nombre}</span>
        <Rate allowHalf defaultValue={reviews} disabled style={{ marginBottom: "10px", fontSize: "16px" }} />
        <span className='price-desc'>{`$${precioSemanal} p/semana`}</span>
        <span className='price-desc'>{`o $${precioMensual} p/mes`}</span>
      </div>
      <div className='price-want'>
        <h1 className='price-final'>${precioFinal}</h1>
        {precioOriginal && <label className='price-total'>{`$${precioOriginal}`}</label>}
        <Button className='btn-i-want' onClick={handleClickModal}>Lo Quiero</Button>
      </div>
      { openModal &&
       <ModalProduct producto={producto} precioFinal={precioFinal} precioSemanal={precioSemanal} onClose={handleCloseModal} />
      }
    </div>
  );
};
