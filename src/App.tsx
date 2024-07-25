// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ProductProvider } from '../src/Contexts/ProductContext';
import { ProductCatalogShop } from './Components/MainApp/ProductCatalogShop';
import { Home } from './Components/MainApp/Home';
import { FilterProvider } from './Contexts/FilterContext';
import { FavoritesProvider } from './Contexts/FavoriteContext';

function App() {
  return (
    <>
    <ProductProvider>
    <FilterProvider>
      <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<ProductCatalogShop />} />
      </Routes>
      </FavoritesProvider>
      </FilterProvider>
      </ProductProvider>
    </>
  );
}

export default App;
