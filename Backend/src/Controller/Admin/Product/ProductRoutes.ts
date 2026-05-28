import express from "express";

import isAuthenticated from "../../../MiddleWare/isAuthenticated";
import restrictTo from "../../../MiddleWare/RestrictTo";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  editProduct,
  singleProductFetched,
} from "./ProductController";
import upload from "../../../MiddleWare/multerConfig";

const Productroutes = express.Router();
// to crate product//

Productroutes.route("/create").post(
  isAuthenticated,
  restrictTo("admin"),
  upload.single("ProductImage"),
  createProduct,
);

// to delete//

Productroutes.route(`/delete/:id`).delete(
  isAuthenticated,
  restrictTo("admin"),
  upload.single("ProductImage"),
  deleteProduct,
);

// to featch all product data form the system  //

Productroutes.route(`/fetchProduct`).get(getAllProducts);

 // to edit product//

Productroutes.route(`/edit/:id`).patch(
  isAuthenticated,
  restrictTo("admin"),
  upload.single("ProductImage"),
  editProduct,
);
// to featch single product //


Productroutes.route("/singleProduct/:id").get(singleProductFetched);



export default Productroutes;
