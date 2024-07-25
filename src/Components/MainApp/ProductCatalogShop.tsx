import { Navbar } from "./Navbar/Navbar";
import { ListMenu } from "./Navbar/ListMenu";
import { MainProducts } from "./MainProducts";
import "/src/App.css";
import { Footer } from "./Footer/Footer";
import { useContext } from "react";
import { ProductContext } from "../../Contexts/ProductContext";
import { DescriptionProduct } from "../DetalleProducto/DescriptionProduct";
export const ProductCatalogShop = () => {
  const { selectedProduct } = useContext(ProductContext);
  console.log(selectedProduct);
  return (
    <main className="products">
      <Navbar />
      <ListMenu />
      <div>{!selectedProduct ? <MainProducts /> : <DescriptionProduct />}</div>
      <Footer />
    </main>
  );
};
