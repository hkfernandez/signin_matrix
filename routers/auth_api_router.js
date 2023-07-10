import express from "express";
const router = express.Router();
import { authController } from "";

router.route("/signUp").post(authController.signUpUserWithEmailandPassword);
router.route("/signIn").post(authController.signInUserWithEmailAndPassword);
router.route("/signOut").get(authController.signOutUser);
router.route("/checkState").get(authController.checkUserAuthState);

export const authApiRouter = router;
