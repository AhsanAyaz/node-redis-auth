const path = require('path');
const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  console.log('I was here')
  res.sendFile('login.html', {
    root: path.join(__dirname, '../public'),
  });
});

router.post("/login", (req, res) => {
  const sess = req.session;
  const { username, password } = req.body
  sess.username = username
  sess.password = password
  // add username and password validation logic here if you want.If user is authenticated send the response as success
  res.end("success")
});

router.get("/me", (req, res) => {
  const sess = req.session;
  res.status(200).json({
    username: sess.username
  })
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/auth/login")
  });
});

module.exports = router;
