import React from 'react';
import { AdaptedProduct } from '../../Utils/types/InterfacesProducts';
import '/src/css/description.css'

interface InformationProductProps {
  selectedProduct: AdaptedProduct;
}

export const InformationProduct: React.FC<InformationProductProps> = ({ selectedProduct }) => {
  return (
    <div>
      <div className='imgs-test-description'>
        {selectedProduct?.images.map((image, index) => (
          <div className='catalog-img-description' key={index}>
            <img className='imgs-products-description' src={image} alt={`Product image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
