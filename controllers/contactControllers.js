const Contact = require("../models/Contact");
const sendEmail = require("../utils/sentEmail");

exports.constactController = async (req, res, next) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await newContact.save();

    // codingjedi048@gmail.com
    sendEmail("codingjedi048@gmail.com", req.body);
    res.status(200).json({ message: "Seccessfully Message send" });
  } catch (error) {
    next(error);
  }
};
