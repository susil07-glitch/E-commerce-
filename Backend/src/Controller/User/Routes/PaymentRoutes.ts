import express from 'express';
import isAuthenticated from '../../../MiddleWare/isAuthenticated';
import { initilizeKhalti } from '../Payment/PaymentKhalti';



const paymentRoutes=express.Router();

paymentRoutes.route("/order/create").post(isAuthenticated,initilizeKhalti)





export default paymentRoutes ;

