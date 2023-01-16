import React from 'react';
import './App.scss';
import {HomePage} from "./pages/HomePage/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import {CartPage} from "./pages/ShoppingCartPage/CartPage";
import {CartContextComponent} from "./context/shopping-cart/Context";
import {ProductPage} from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <div className="App">
      <CartContextComponent>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog/:id" element={<CatalogPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/product/:id" element={<ProductPage />}/>
          </Routes>
        </Router>
      </CartContextComponent>
    </div>
  );
}

export default App;
