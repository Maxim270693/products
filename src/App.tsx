import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import ShowProducts from "./components/ShowProducts";
import CreateProduct from "./components/CreateProduct";
import EditingProduct from "./components/EditingProduct";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<ShowProducts/>}/>
          <Route path='/create' element={<CreateProduct/>}/>
          <Route path='/edit' element={<EditingProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
