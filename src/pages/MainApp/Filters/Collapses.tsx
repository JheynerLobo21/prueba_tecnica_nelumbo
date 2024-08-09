import type { CollapseProps } from "antd";
import { Collapse, Rate } from "antd";
//import { Checkbrand } from "./Checkbrand";
import { RangePrices } from "./RangePrices";
import { useFilter } from "../../../Contexts/FilterContext";

const RateFilter = () => {
  const { selectedStars, setSelectedStars } = useFilter();

  const handleChange = (value: number) => {
    setSelectedStars(value);
  };

  return (
    <Rate allowHalf defaultValue={selectedStars || 0} onChange={handleChange} />
  );
};

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Marcas",
    //children: <Checkbrand />,
    showArrow: false,
  },
  {
    key: "2",
    label: "Precio",
    children: <RangePrices />,
    showArrow: false,
  },
  {
    key: "3",
    label: "Reviews",
    children: <RateFilter />,
    showArrow: false,
  },
];

export const Collapses = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange} items={items} style={{color:"#013E9B"}}/>
  );
};
