import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../../../Constants/Constants';
import { Categorias } from '../../../Constants/Constants';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFilter } from '../../../Contexts/FilterContext'; // Importar el contexto
import '/src/css/filters.css';

export const Checkbrand = () => {
  const location = useLocation();
  const [brands, setBrands] = useState<string[]>([]);
  const { selectedBrands, setSelectedBrands } = useFilter(); // Usar el contexto

  useEffect(() => {
    const category = location.pathname.split("/")[1] as keyof Categorias;
    const productos = products[category] || [];
    const uniqueBrands = [...new Set(productos.map(producto => producto.marca))];
    setBrands(uniqueBrands);
  }, [location.pathname]);

  const handleChange = (e: CheckboxChangeEvent) => {
    const brand = e.target.value as string;
    setSelectedBrands((prevBrands: string[]) => {
      if (e.target.checked) {
        return [...prevBrands, brand];
      } else {
        return prevBrands.filter(b => b !== brand);
      }
    });
  };

  return (
    <div className='checks'>
      {brands.map((brand, index) => (
        <Checkbox
          key={index}
          value={brand}
          checked={selectedBrands.includes(brand)}
          onChange={handleChange}
        >
          {brand}
        </Checkbox>
      ))}
    </div>
  );
};
