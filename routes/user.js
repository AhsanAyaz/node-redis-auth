const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
/* GET login page. */
router.get("/login", function (req, res, next) {
  res.sendFile("login.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.get("/register", function (req, res, next) {
  res.sendFile("register.html", {
    root: path.join(__dirname, "../public"),
  });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  user.save((err, doc) => {
    if (err) {
      let message = "Could not register user";
      switch (err.code) {
        case 11000:
          message = "User already exists";
          break;
      }
      return res.status(400).json({
        message,
      });
    }
    const user = {
      ...doc.toJSON(),
    };
    delete user.password;
    req.session.user = user;
    res.json({
      user,
    });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }
  const match = user.comparePassword(password);
  if (!match) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  } else {
    const sessionUser = {
      ...user.toJSON(),
    };
    delete sessionUser.password;
    req.session.user = sessionUser;
    res.json({
      user: sessionUser,
    });
  }
});

router.get("/me", async (req, res) => {
  const { username } = req.session.user;
  const user = await User.findOne({ username });
  res.status(200).json(user);
});

router.post("/language", async (req, res) => {});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
