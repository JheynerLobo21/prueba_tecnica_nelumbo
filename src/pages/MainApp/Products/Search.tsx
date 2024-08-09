import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '/src/css/main-page.css';
import { useFilter } from '../../../Contexts/FilterContext';
import { useCategories } from '../../../Contexts/CategoryContext';

const { Option } = Select;

export const Search = () => {
  const { setSearchName, setCategory } = useFilter();
  const { categories } = useCategories();
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategoryValue] = useState('todas');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
    <Select value={category} onChange={handleCategoryChange} className='slt-search'>
      <Option value="todas">Todas las categorías</Option>
      {categories?.map(cat => (
        <Option key={cat.id} value={cat.name}>{cat.name}</Option>
      ))}
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
