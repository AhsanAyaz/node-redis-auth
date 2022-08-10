var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get("/", function (req, res, next) {
  const sess = req.session;
  if (sess.user) {
    res.sendFile("index.html", {
      root: path.join(__dirname, "../public"),
    });
  } else {
    res.sendFile("login.html", {
      root: path.join(__dirname, "../public"),
    });
  }
});

module.exports = router;
