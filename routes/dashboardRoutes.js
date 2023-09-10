const {
  dashboardGetController,
} = require("../controllers/dashboardController.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");
// const { isAuthenticated } = require("../middlewares/authMiddleware.js");

const router = require("express").Router();

router.get("/", isAuthenticated, dashboardGetController);
// router.post("/");

module.exports = router;
