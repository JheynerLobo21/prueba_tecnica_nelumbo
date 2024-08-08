import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "/src/App.css";
import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../../services/products";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFilter } from "../../../Contexts/FilterContext";

interface Categories {
  id: number;
  name: string;
  imagen: string;
  creationAt: string;
  updatedAt: string;
}

export const ListMenu: React.FC = () => {
  const { resetProduct } = useContext(ProductContext);
  const { resetFilters } = useFilter();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);
  const handleClick = (path: string) => {
    navigate(path);
    resetFilters();
    resetProduct();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Error fetching getUser:", error);
      }
    };

    fetchData();
  }, []);


  const uniqueCategories = Array.from(new Set(categories.map(category => category.name)))
    .map(name => categories.find(category => category.name === name)!);

  const items = uniqueCategories.map((category, index) => {
    const path = category.name === "home" ? "/" : `/${category.name.replace(/\s+/g, "-")}`;
    return {
      key: index.toString(),
      label: (
        <div
          onClick={() => handleClick(path)}
          className={index === 0 ? "first-item-list" : "item-list"}
        >
          {category.name}
        </div>
      ),
    };
  });

  return (
    <Menu
      className="item-menu"
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      items={items}
      style={{ flex: 1, minWidth: 0, textTransform: "capitalize", color: "blue" }}
    />
  );
};
