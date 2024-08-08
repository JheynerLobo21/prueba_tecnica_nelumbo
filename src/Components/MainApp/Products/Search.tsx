import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '/src/css/main-page.css';
import { useFilter } from '../../../Contexts/FilterContext';

const { Option } = Select;

export const Search = () => {
  const { setSearchName, setCategory } = useFilter();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategoryValue] = useState('todas');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
    setSearchName(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
    setCategory(value);
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
    <Select value={category} onChange={handleCategoryChange}  className='slt-search'>
      <Option value="todas">Todas las categorias</Option>
      <Option value="celulares">Celulares</Option>
      <Option value="computadores">Computadores</Option>
      <Option value="motocicletas">Motocicletas</Option>
    </Select>
  );

  return (
    <div className='search'>
      <Input
       className='input-search'
        prefix={prefix}
        addonAfter={selectAfter}
        placeholder='Buscar producto'
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};
