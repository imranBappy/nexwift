const { homeController } = require("../controllers/homeController.js");

const router = require("express").Router();
router.get("/", homeController);

module.exports = router;
