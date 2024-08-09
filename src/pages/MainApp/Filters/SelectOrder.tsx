import { Select } from "antd";
import { useFilter } from "../../../Contexts/FilterContext";
import "/src/css/filters.css";
import { useEffect } from "react";


export const SelectOrder = () => {
  const pathname= window.location.pathname.split("/")[1];
  const { setOrder } = useFilter();

  const handleChange = (value: "" | "reviews" | "precio" | "favoritos") => {
    setOrder(value);
  };
  useEffect(() => {
    setOrder("");
  }, [pathname])
  

  return (
    <div className="optionOrder">
      <Select
        placeholder="Seleccione..."
        onChange={handleChange}
        style={{ width: "100%" }}
        options={[
          { value: "", label: "Seleccione..." },
          { value: "reviews", label: "Mejores Reviews" },
          { value: "precio", label: "Precios Bajos" },
          { value: "favoritos", label: "Favoritos" },
        ]}
      />
    </div>
  );
};
