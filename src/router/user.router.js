import { Router } from "express";
import { loginUser, logoutUser, registeruser, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/user.middlerware.js";

const router = Router()

router.route("/register").post(registeruser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJwt ,logoutUser)
router.route("/user").get(verifyJwt ,getCurrentUser)


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

export default router