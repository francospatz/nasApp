import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import { CartContext } from './context/cartContext';

function App() {
  const [cart, setCart] = useState([]);
  const currentCart = cart;
  
  const localCart = () => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")))
    } 
  }

  const addProduct = (product) => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")))
    }

    if (!currentCart.includes(product)) {
      currentCart.push(product);
      setCart(currentCart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(currentCart))
    } else {
      currentCart.splice(currentCart.indexOf(product), 1);
      setCart(currentCart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(currentCart))
    }
    console.log(cart)
  }

  const value = {
    addProduct,
    localCart,
    setCart,
    cart
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <CartContext.Provider value={value}>
        <Main />
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
