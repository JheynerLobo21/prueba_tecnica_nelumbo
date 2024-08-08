import { Products } from "./Products";
import { Search } from "./Search";
import "/src/css/main-page.css"
export const ListProducts = () => {

  return (
    <div className="content-product" style={{width: "70vw"}}>
      <Search />
      <Products/>
    </div>
  );
};
