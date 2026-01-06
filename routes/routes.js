import express from 'express';
import verifyToken from '../middleware/auth.js';
import { addProduct, adminUpdatedata, getAllProductForAdmin, getUserData, login, productDelete, userLogout, userSignUp } from '../controller/main.controller.js';



const router = express.Router();

router.post('/login', login)

router.get('/admin/users', verifyToken, getUserData)

router.put('/admin/update/:id', verifyToken, adminUpdatedata)

router.get('/admin/product', verifyToken, getAllProductForAdmin);

router.post('/user/signup', userSignUp)

router.post('/user/product', verifyToken, addProduct)

router.post('/user/logout', userLogout)

router.delete('/userProduct/delete/:id', verifyToken, productDelete)

export default router;