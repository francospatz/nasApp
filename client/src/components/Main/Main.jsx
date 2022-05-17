import React from 'react';
import Home from './Home';
import Landigs from "./Landings";
import Neas from "./Neas";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const { isAuthenticated } = useAuth0();
  return <main className='main'>
    <Routes>
      <Route element={<Home/>} path='/'></Route>
      <Route element={<Landigs/>} path='/Landings'></Route>
      <Route element={<Neas/>} path='/Neas'></Route>
      {isAuthenticated ? <Route element={<Cart/>} path='/Cart'></Route> : ""}
      {isAuthenticated ? <Route element={<Checkout/>} path='/Checkout'></Route> : ""}
      
    </Routes>
  </main>;
};

export default Main;
