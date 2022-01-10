import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import ShowProducts from "./components/showProducts/ShowProducts";
import CreateProduct from "./components/createProduct/CreateProduct";
import EditingProduct from "./components/EditingProduct";
import Product from "./components/pdoduct/Product";

function App() {
  return (
    <div className="App">
        <nav className="wrapper">
            <NavLink className="wrapper_item" to={'/'}><li>Products</li></NavLink>
            <NavLink className="wrapper_item" to={'/create'}><li>Create</li></NavLink>
            <NavLink className="wrapper_item" to={'/edit'}><li>Edit</li></NavLink>
        </nav>
      <Routes>
          <Route path='/' element={<ShowProducts/>}/>
          <Route path='/create' element={<CreateProduct/>}/>
          <Route path='/edit' element={<EditingProduct/>}/>
          <Route path={'/product/:id'} element={<Product/>}/>
          <Route path="*" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
