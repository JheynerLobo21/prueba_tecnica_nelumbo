import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "/src/App.css";
import { useContext, useEffect } from "react";
import { getCategories } from "../../helpers/fetchPetitions";
import { ProductContext } from "../../Contexts/ProductContext";
import { useFilter } from "../../Contexts/FilterContext";
import { useCategories } from "../../Contexts/CategoryContext";
import { Category } from "../../types/InterfacesProducts";


export const ListMenu: React.FC = () => {
  const { resetProduct } = useContext(ProductContext);
  const { resetFilters } = useFilter();
  const { categories, setCategories } = useCategories();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    resetFilters();
    resetProduct();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories();
        const uniqueCategories = Array.from(
          new Set(fetchedCategories.map((category: Category) => category.name))
        ).map((name) =>
          fetchedCategories.find((category: Category) => category.name === name)
        ).filter((category): category is Category => category !== undefined);
      
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching getUser:", error);
      }
      
    };

    fetchData();
  }, [setCategories]);

  const items = categories?.map((category, index) => {
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
      defaultSelectedKeys={["0"]}
      items={items}
      style={{ flex: 1, minWidth: 0, textTransform: "capitalize", color: "blue", flexWrap:"wrap"}}
    />
  );
};
