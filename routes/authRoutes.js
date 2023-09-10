const {
  singinPostController,
  signupController,
  resetController,
  resetRequestController,
  signupGetController,
  signinGetController,
} = require("../controllers/authControllers.js");
const { isUnAuthenticated } = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.post("/signin", isUnAuthenticated, singinPostController);
router.post("/signup", isUnAuthenticated, signupController);

router.get("/signup", signupGetController);
router.get("/signin", signinGetController);

router.post("/reset", resetRequestController);
router.post("/reset/:userId/:token", resetController);

module.exports = router;
