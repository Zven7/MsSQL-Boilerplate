import { Router } from 'express';

import { getProducts, createProduct, getProductById, deleteProduct, getTotalProducts, updateProduct } from '../controllers/products.controller';

const router = Router();


router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.get('/products/count', getTotalProducts)

router.post('/products', createProduct)

router.delete('/products/:id', deleteProduct)

router.put('/products/:id', updateProduct)



export default router;