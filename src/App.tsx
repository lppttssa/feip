import React from 'react';
import './App.scss';
import {HomePage} from "./pages/HomePage/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import {CartPage} from "./pages/ShoppingCartPage/CartPage";
import {CartContextComponent} from "./context/shopping-cart/Context";

function App() {
  return (
    <div className="App">
      <CartContextComponent>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />}/>
          </Routes>
        </Router>
      </CartContextComponent>
    </div>
  );
}

export default App;
