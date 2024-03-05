import { Router } from "express";
import { verifyJwt } from "../middleware/user.middlerware.js";
import { ApiError } from "../utils/ApiError.js";
import {
   createEmployee,
   deleteEmployee,
   editEmployee,
   employee,
   allEmployee,
   Findemployees,
} from "../controllers/employee.controller.js";
import { upload } from "../middleware/multer.middlerware.js";

const router = Router();

router.route("/create").post(
   verifyJwt,
   upload.fields([
      {
         name: "avatar",
         maxCount: 1,
      },
   ]),
   createEmployee
);
router.route("/edit/:id").post(
   verifyJwt,
   upload.fields([
      {
         name: "avatar",
         maxCount: 1,
      },
   ]),
   editEmployee
);

router.route("/edit/:id").delete(verifyJwt, deleteEmployee);
router.route("/info").post(verifyJwt, employee);
router.route("/find").post(verifyJwt, Findemployees);
router.route("/list").get(verifyJwt, allEmployee);


router.use((err, req, res, next) => {
   if (err instanceof ApiError) {
      res.status(err.statusCode).json({
         success: false,
         message: err.message,
         errors: err.errors,
      });
   } else {
      console.error(err);
      res.status(500).json({
         success: false,
         message: err.message,
      });
   }
});

export default router;
