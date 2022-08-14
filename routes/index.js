var express = require('express');
var router = express.Router();
const path = require('path');

const publicRootConfig = {
  root: path.join(__dirname, '../public')
}

router.get("/", function (req, res, next) {
  const sess = req.session;
  if (sess.user) {
    res.sendFile("index.html", publicRootConfig);
  } else {
    res.sendFile("login.html", publicRootConfig);
  }
});

router.get('/login', (req, res) => {
  res.sendFile('login.html', publicRootConfig)
});
router.get('/register', (req, res) => {
  res.sendFile('register.html', publicRootConfig)
})

module.exports = router;
