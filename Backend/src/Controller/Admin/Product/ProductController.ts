import { Request, Response } from "express";
import Product from "./ProductModel";
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend";

export const createProduct = async (req: Request, res: Response) => {
  console.log((req as AuthRequest).user);

  try {
    const {
      Name,
      Description,
      Price,
      Category,
      ProductStockQty,
      ProductStatus,
    } = req.body;

    if (
      !Name ||
      !Description ||
      Price === undefined ||
      !Category ||
      ProductStockQty === undefined ||
      !ProductStatus
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newProduct = await Product.create({
      ProductName: Name,
      Description,
      Price: Number(Price),
      Category,
      ProductStockQty: Number(ProductStockQty),
      ProductStatus,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.messsage || "Server error",
    });
  }
};
