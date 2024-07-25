import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '/src/css/main-page.css';
import { useFilter } from '../../../Contexts/FilterContext'; // Asegúrate de importar tu contexto de filtro

const { Option } = Select;

export const Search = () => {
  const { setSearchName, setCategory } = useFilter(); // Añade setSearchName y setCategory a tu contexto
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategoryValue] = useState('todas');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchName(e.target.value); // Actualiza el valor de búsqueda en el contexto
  };

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
    setCategory(value); // Actualiza la categoría en el contexto
  };

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const selectAfter = (
    <Select value={category} onChange={handleCategoryChange} style={{ width: 120 }}>
      <Option value="todas">Todas</Option>
      <Option value="celulares">Celulares</Option>
      <Option value="computadores">Computadores</Option>
      <Option value="motocicletas">Motocicletas</Option>
    </Select>
  );

  return (
    <div className='search'>
      <Input
        prefix={prefix}
        addonAfter={selectAfter}
        placeholder='Buscar producto'
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};
