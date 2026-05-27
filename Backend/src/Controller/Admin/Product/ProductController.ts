import { Request, Response } from "express";
import Product from "./ProductModel";
import { AuthRequest } from "../../../types/RequestExtend/userRequestExtend";

export const createProduct = async (req: Request, res: Response) => {
  



  try {
    const Image =req.file
    console.log(req.file);

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
      ProductImage: Image ? Image.originalname : undefined, // Save the file path of the uploaded image
      CreatedBy: (req as AuthRequest).user._id, // Assuming you have user authentication and the user ID is available in the request
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
