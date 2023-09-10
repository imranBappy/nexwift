const { Schema, model } = require("mongoose");

// create a contact mode there will be name, email, topic, message, metting type google meet or  zoom

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is require!"],
      lowercase: true,
      trim: true,
    },
    topic: {
      type: String,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is require!"],
      trim: true,
    },
    mettingType: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);
module.exports = Contact;
