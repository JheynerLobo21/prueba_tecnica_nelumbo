import { useState, useEffect } from "react";
import { useFilter } from "../../../Contexts/FilterContext";
import "/src/css/filters.css";
import { Input } from "antd";

export const RangePrices = () => {
  const { setMinPrice, setMaxPrice } = useFilter();
  const [minPrice, setLocalMinPrice] = useState<number | null>(null);
  const [maxPrice, setLocalMaxPrice] = useState<number | null>(null);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLocalMinPrice(isNaN(value) ? null : value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLocalMaxPrice(isNaN(value) ? null : value);
  };

  useEffect(() => {
    if (minPrice !== null && maxPrice !== null && minPrice < maxPrice) {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    }
  }, [minPrice, maxPrice, setMinPrice, setMaxPrice]);

  return (
    <div className="range-prices">
      <Input placeholder="100" 
        type="number"
        className="min-price"
        onChange={handleMinPriceChange}/>
    
      <span>-</span>
      <Input placeholder="500" 
        type="number"
        className="max-price"
        onChange={handleMaxPriceChange}/>
      
    </div>
  );
};
