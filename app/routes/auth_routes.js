const router = require("express").Router();
const authController = require("../controller/auth_controller");

router
  .route("/auth/signUp")
  .post(authController.signUpUserWithEmailandPassword);
router
  .route("/auth/signIn")
  .post(authController.signInUserWithEmailAndPassword);
router.route("/auth/signOut").get(authController.signOutUser);

module.exports = router;
