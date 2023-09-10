const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const sendEmail = require("../utils/sentEmail");
var jwt = require("jsonwebtoken");
const Token = require("../models/Token");

exports.signupGetController = async (req, res, next) => {
  try {
    res.render("pages/signup", {
      title: "Create a new account",
      error: {},
      value: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.signinGetController = async (req, res, next) => {
  try {
    res.render("pages/signin", {
      title: "Create a new account",
      error: {},
      value: {},
    });
  } catch (error) {
    next(error);
  }
};

exports.signupController = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    password = password.trim();
    email = email.trim();
    const user = await Auth.findOne({ email: email });
    if (user) {
      return res.status(500).json({ message: "User Already Exist!" });
    }

    if (password.length < 5) return res.json({ message: "Min length 5" });
    password = await bcrypt.hash(password, 10);
    const newUser = new Auth({ ...req.body, password });
    await newUser.save();
    sendEmail(email, name);
    const token = jwt.sign(
      {
        data: { _id: newUser._id, name: newUser.name, url: newUser.url },
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      isAuthintication: true,
      data: newUser,
      accessToken: token,
    });

  } catch (error) {
    next(error);
  }
};

exports.singinPostController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        isAuthintication: false,
        message: "Account is not exit",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    delete user.password;
    if (!match) {
      return res.json({
        isAuthintication: false,
        message: "Password is waring",
      });
    }

    const token = jwt.sign(
      {
        data: { _id: user._id, name: user.name, url: user.url },
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log(req?.session);

    res.json({
      data: {
        _id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateController = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const user = await Auth.findById(req.user._id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        isAuthintication: false,
        message: "Password is waring",
      });
    }
    if (newPassword.length < 5) return res.json({ message: "Min length 5" });
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await Auth.findByIdAndUpdate(req.user._id, {
      password: hashPassword,
    });
    res.json({ message: "Password is update" });
  } catch (error) {
    next(error);
  }
};

exports.resetRequestController = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log({ email });
    // find user
    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        isAuthintication: false,
        message: "Account is not exit",
      });
    }
    // create token
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    // await bcrypt.hash(password, 10);
    const link = `${process.env.BASE_URL}/auth/reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    next(error);
  }
};

exports.resetController = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    console.log({
      userId,
      token,
      password: req.body.password,
    });
    const { password } = req.body;
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({
        isAuthintication: false,
        message: "Account is not exit",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.json({
        isAuthintication: false,
        message: "Password is waring",
      });
    }

    const savedToken = await Token.findOne({ userId: user._id });
    if (!savedToken) {
      return res.status(400).json({
        isAuthintication: false,
        message: "Invalid token",
      });
    }
    if (savedToken.token !== token) {
      return res.status(400).json({
        isAuthintication: false,
        message: "Invalid token",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword;
    await user.save();
    await savedToken.deleteOne({
      userId: user._id,
    });
    res.json({ message: "Password is update" });
  } catch (error) {
    next(error);
  }
};
