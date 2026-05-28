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
  

    cb(
      null,
      file.fieldname +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

export default upload;
