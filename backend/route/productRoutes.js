import express from 'express';
import { deleteProduct, getAllProducts, getProductById, postProduct, updateProduct } from '../controller/productController.js';

const productRoutes = express.Router();

productRoutes.get('/products', getAllProducts);
productRoutes.get('/products/:id', getProductById);
productRoutes.post('/products', postProduct);
productRoutes.put('/products/:id', updateProduct);
productRoutes.delete('/products/:id', deleteProduct);

export default productRoutes