import { useState, useEffect } from "react";
import { useFilter } from "../../../Contexts/FilterContext";
import "/src/css/filters.css";

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
      <input
        type="number"
        className="min-price"
        placeholder="Min Price"
        onChange={handleMinPriceChange}
      />
      <span>-</span>
      <input
        type="number"
        className="max-price"
        placeholder="Max Price"
        onChange={handleMaxPriceChange}
      />
    </div>
  );
};
