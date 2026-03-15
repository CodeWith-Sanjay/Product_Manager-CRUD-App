import React, { useState } from 'react'
import './App.css'

import ProductForm from './components/ProductForm.jsx'
import ProductList from './components/ProductList.jsx'


function App() {

  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className='App'>
      <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct}/>
      <ProductList setEditingProduct={setEditingProduct} />
    </div>
  )
}

export default App
