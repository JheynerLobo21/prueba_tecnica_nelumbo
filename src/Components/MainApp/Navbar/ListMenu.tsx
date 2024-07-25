import { Menu } from "antd";
import { listMenu } from "../../../Constants/Constants";
import { useNavigate } from "react-router-dom";
import "/src/App.css";
import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContext";
import { useFilter } from "../../../Contexts/FilterContext";

export const ListMenu = () => {
  const { resetProduct } = useContext(ProductContext);
  const { resetFilters } = useFilter();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
    resetFilters();
    resetProduct();
  };

  const items = listMenu.map((itemMenu, index) => {
    const path =
      itemMenu === "home" ? "/" : `/${itemMenu.replace(/\s+/g, "-")}`;
    return {
      key: index.toString(),
      label: (
        <div
          onClick={() => handleClick(path)}
          className={index === 0 ? "first-item-list" : "item-list"}
        >
          {itemMenu}
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
      style={{ flex: 1, minWidth: 0, textTransform: "capitalize", color:"blue"}}
    />
  );
};
