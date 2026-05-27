import express from "express";

import isAuthenticated from "../../../MiddleWare/isAuthenticated";
import restrictTo from "../../../MiddleWare/RestrictTo";
import { createProduct } from "./ProductController";
import upload from "../../../MiddleWare/multerConfig";

const Productroutes = express.Router();

Productroutes.route("/create").post(
  isAuthenticated,
  restrictTo("admin"),
  upload.single("ProductImage"),
  createProduct
);

export default Productroutes;