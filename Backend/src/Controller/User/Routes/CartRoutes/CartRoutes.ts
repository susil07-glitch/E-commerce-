

import express from 'express';
import isAuthenticated from '../../../../MiddleWare/isAuthenticated';
import { addToCart } from '../../Cart/CartController';

const cartRoutes=express.Router()

cartRoutes.route("/cart/:productId").post( isAuthenticated, addToCart)


export default cartRoutes;

