import multer from "multer";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./public/temp");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const imageFilter = function (req, file, cb) {
   const allowedTypes = ["image/jpeg", "image/png"];
   if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
   } else {
      cb(new Error("Only jpeg/png files are allowed!"), false);
   }
};

export const upload = multer({
   storage,
   fileFilter: imageFilter,
});
