import { Router } from "express";
import { verifyJwt } from "../middleware/user.middlerware.js";
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
router.route("/edit").post(
   verifyJwt,
   upload.fields([
      {
         name: "avatar",
         maxCount: 1,
      },
   ]),
   editEmployee
);

router.route("/delete").post(verifyJwt, deleteEmployee);
router.route("/info").post(verifyJwt, employee);
router.route("/find").post(verifyJwt, Findemployees);
router.route("/list").get(verifyJwt, allEmployee);

export default router;
