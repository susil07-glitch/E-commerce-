

import isAuthenticated from "../../../MiddleWare/isAuthenticated";
import restrictTo from "../../../MiddleWare/RestrictTo";
import { createProduct } from "./ProductController";


const express = require('express');

const Productroutes= express.Router();

// creating routes for product creation //

Productroutes.route('/create').post( isAuthenticated,restrictTo("admin"), createProduct);





 export default Productroutes;