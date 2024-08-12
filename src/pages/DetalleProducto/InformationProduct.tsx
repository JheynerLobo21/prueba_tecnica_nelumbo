import React from 'react';
import { AdaptedProduct } from '../../types/InterfacesProducts';
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
            <img 
              className='imgs-products-description' 
              src={image} 
              alt={`Product image ${index + 1}`}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src =
                  "https://media.istockphoto.com/id/1128826884/es/vector/ning%C3%BAn-s%C3%ADmbolo-de-vector-de-imagen-falta-icono-disponible-no-hay-galer%C3%ADa-para-este-momento.jpg?s=612x612&w=0&k=20&c=9vnjI4XI3XQC0VHfuDePO7vNJE7WDM8uzQmZJ1SnQgk=";
              }} />
          </div>
        ))}
      </div>
    </div>
  );
};
