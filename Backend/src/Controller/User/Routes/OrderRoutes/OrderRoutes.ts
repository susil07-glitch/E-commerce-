
import express from 'express';
import { createOrder, getMyOrders } from '../../Order/orderController';
import isAuthenticated from '../../../../MiddleWare/isAuthenticated';


const orderRoutes=express.Router();

orderRoutes.route("/order/create").post(isAuthenticated,createOrder)
orderRoutes.route("/order/myorders").get(isAuthenticated,getMyOrders)


export default orderRoutes; 
