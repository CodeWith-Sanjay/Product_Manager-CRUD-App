import React, {useEffect, useState} from 'react'

import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../slices/productSlice.js';
import {Form, Button} from 'react-bootstrap';

// Add and edit product
const ProductForm = ({editingProduct, setEditingProduct}) => {

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setProductData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if(editingProduct) {
      dispatch(updateProduct({id: editingProduct._id, productData}));
    } else {
      dispatch(addProduct(productData));
    }

    setProductData({
      name: '',
      description: '',
      price: 0,
      category: ''
    })
    setEditingProduct(null)
  }

  useEffect(() => {

    const fetchProductData = () => {
      if(editingProduct) (
        setProductData({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          category: editingProduct.category,
          id: editingProduct._id
        })
      )

    // if(editingProduct) {
    //   dispatch(updateProduct({editingProduct._id, editingProduct}));
    // }
    }

    fetchProductData();
  }, [editingProduct])
  return (
    <div className='border border-primary px-5 py-3 mx-2 mt-5'>
      <h1 className='text-primary display-7 mb-4'>{editingProduct ? 'Update Product' : 'Add Product'}</h1>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="ex. Laptop" value={productData.name} onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name='description' placeholder="ex. Laptop is a modern tech..." value={productData.description} onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price (in $)</Form.Label>
        <Form.Control type="number" name='price' placeholder="ex. $100" value={productData.price} onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" name='category' placeholder="ex. Technology" value={productData.category} onChange={handleInputChange}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleFormSubmit}>
        {editingProduct ? 'Update Product' : 'Add Product'}
      </Button>
    </Form>
    </div>
  )
}

export default ProductForm
