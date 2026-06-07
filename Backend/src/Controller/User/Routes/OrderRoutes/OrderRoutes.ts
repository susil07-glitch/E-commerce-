
import express from 'express';
import { cancelMyOrder, createOrder, getMyOrders, updateMyOrder } from '../../Order/orderController';
import isAuthenticated from '../../../../MiddleWare/isAuthenticated';


const orderRoutes=express.Router();

orderRoutes.route("/create/:id").post(isAuthenticated,createOrder)
orderRoutes.route("/myorders").get(isAuthenticated,getMyOrders)
orderRoutes.route("/updateOrder").patch(isAuthenticated,updateMyOrder)
orderRoutes.route("/cancelOrder").patch(isAuthenticated,cancelMyOrder)




export default orderRoutes; 
