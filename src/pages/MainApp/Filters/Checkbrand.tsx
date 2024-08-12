import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFilter } from "../../../Contexts/FilterContext";
import { ProductContext } from "../../../Contexts/ProductContext";
import "/src/css/filters.css";

export const Checkbrand = () => {
  const location = useLocation();
  const [brands, setBrands] = useState<string[]>([]);
  const { selectedBrands, setSelectedBrands } = useFilter();
  const { allProducts } = useContext(ProductContext);
  console.log(allProducts)

  useEffect(() => {
    const categoryName = location.pathname.split("/")[1].replace("-", " ");
    
    const filteredProducts = allProducts.filter(
      (product) => product.category.name === categoryName
    );
    const uniqueBrands = [
      ...new Set(filteredProducts.map((producto) => producto.marcas)),
    ];

    setBrands(uniqueBrands);
    console.log(brands);
  }, [location.pathname, allProducts]);

  const handleChange = (e: CheckboxChangeEvent) => {
    const brand = e.target.value as string;
    setSelectedBrands((prevBrands: string[]) => {
      if (e.target.checked) {
        return [...prevBrands, brand];
      } else {
        return prevBrands.filter((b) => b !== brand);
      }
    });
  };

  return (
    <div className="checks">
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

