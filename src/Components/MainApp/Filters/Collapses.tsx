// Collapses.tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, Rate } from 'antd';
import { Checkbrand } from './Checkbrand';
import { RangePrices } from './RangePrices';
import { useFilter } from '../../../Contexts/FilterContext';

const RateFilter: React.FC = () => {
  const { selectedStars, setSelectedStars } = useFilter();

  const handleChange = (value: number) => {
    setSelectedStars(value);
  };

  return (
    <Rate
      allowHalf
      defaultValue={selectedStars || 0}
      onChange={handleChange}
    />
  );
};

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Marcas',
    children: <Checkbrand />,
    showArrow: false,
  },
  {
    key: '2',
    label: 'Precio',
    children: <RangePrices />,
    showArrow: false,
  },
  {
    key: '3',
    label: 'Reviews',
    children: <RateFilter />,
    showArrow: false,
  },
];


export const Collapses: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />;
};
