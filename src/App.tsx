// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ProductProvider } from '../src/Contexts/ProductContext';
import { ProductCatalogShop } from './pages/MainApp/ProductCatalogShop';
import { Home } from './pages/MainApp/Home';
import { FilterProvider } from './Contexts/FilterContext';
import { FavoritesProvider } from './Contexts/FavoriteContext';
import { CategoryProvider } from './Contexts/CategoryContext';

function App() {
  return (
    <>
      <ProductProvider>
      <FilterProvider>
      <FavoritesProvider>
      <CategoryProvider>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<ProductCatalogShop />} />
       </Routes>
      </CategoryProvider>
      </FavoritesProvider>
      </FilterProvider>
      </ProductProvider>
    </>
  );
}

export default App;
