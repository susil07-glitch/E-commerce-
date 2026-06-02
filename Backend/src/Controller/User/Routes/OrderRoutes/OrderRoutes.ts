
import express from 'express';
import { cancelMyOrder, createOrder, getMyOrders, updateMyOrder } from '../../Order/orderController';
import isAuthenticated from '../../../../MiddleWare/isAuthenticated';


const orderRoutes=express.Router();

orderRoutes.route("/order/create").post(isAuthenticated,createOrder)
orderRoutes.route("/order/myorders").get(isAuthenticated,getMyOrders)
orderRoutes.route("/order/updateOrder").patch(isAuthenticated,updateMyOrder)
orderRoutes.route("/order/cancelOrder").patch(isAuthenticated,cancelMyOrder)




export default orderRoutes; 
