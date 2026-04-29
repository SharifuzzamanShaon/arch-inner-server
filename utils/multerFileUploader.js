import multer from "multer";
const filePath = "./assets";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const originalname = file.originalname.replace(/\s+/g, "_").split(".")[0];
    const fileName =
      originalname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1];
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg" ||
    file.mimetype.split("/")[1] === "webp"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file format, Only png, jpg, jpeg, webp are allowed"),
      false
    );
  }
};
const upload = multer({
  storage,
  limits: {
    // max 2mb message
    fileSize: 1024 * 1024 * 2,
  },

  fileFilter,
});
export default upload;
