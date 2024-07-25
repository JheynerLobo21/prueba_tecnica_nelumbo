import { Select } from 'antd';
import { useFilter } from '../../../Contexts/FilterContext';
import '/src/css/filters.css';

export const SelectOrder = () => {
  const { setOrder } = useFilter();

  const handleChange = (value: '' | 'reviews' | 'precio' | 'favoritos') => {
    setOrder(value);
  };

  return (
    <div className='optionOrder'>
      <Select
        placeholder="Seleccione..."
        onChange={handleChange}
        style={{ width: "100%" }}
        options={[
          {value:'', label:'Seleccione...'},
          { value: 'reviews', label: 'Mejores Reviews' },
          { value: 'precio', label: 'Precios Bajos' },
          { value: 'favoritos', label: 'Favoritos' }
        ]}
      />
    </div>
  );
};
