import React, {useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import { deleteProduct, fetchProducts } from '../slices/productSlice';
import Loader from './Loader.jsx';

//Display all products
const ProductList = ({setEditingProduct}) => {

  const dispatch = useDispatch();

  const {products, loading, error} = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  if(loading) {
    return (
      <div style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
      </div>
    )
  }

  if(error) {
    return (
      <p style={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        Error: {error}
      </p>
    )
  } 

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
  }

  const handleProductUpdate = (product) => {
    setEditingProduct(product)
  }

  return (
    <div className='my-4 container-fluid'>
      <Table className='w-100' striped bordered hover responsive>
      <thead>
        <tr>
          <th className='text-primary'>#</th>
          <th className='text-primary'>Product</th>
          <th className='text-primary'>Price (in $)</th>
          <th className='text-primary'>Category</th>
          <th className='text-primary'>Actions</th>
        </tr>
      </thead>
      <tbody>

        {products?.map((product, index) => (
        <tr key={product._id} >
          <td>{index + 1}</td>
          <td>{product?.name}</td>
          <td>{product?.price}</td>
          <td>{product?.category}</td>
          <td className='d-flex flex-column flex-md-row'>
            <Button variant='primary' className='me-1 mb-1' onClick={() => handleProductUpdate(product)}>Edit</Button>
            <Button variant='danger' onClick={() => handleProductDelete(product?._id)}>Delete</Button>
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default ProductList
