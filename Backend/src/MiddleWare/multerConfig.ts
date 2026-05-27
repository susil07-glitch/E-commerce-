import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb:any) => {

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only JPEG, PNG, and JPG files are allowed"));
      return
    }  
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
