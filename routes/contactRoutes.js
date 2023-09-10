const { constactController } = require("../controllers/contactControllers.js");

const router = require("express").Router();

router.post("/", constactController);

module.exports = router;
