var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('I was here')
  const sess = req.session;
  if (sess.username && sess.password) {
      if (sess.username) {
        console.log({sess})
        res.sendFile('index.html', {
          root: path.join(__dirname, '../public')
        })
      } else {
          res.sendFile('login.html', {
            root: path.join(__dirname, '../public')
          })
      }
  } else {
    res.sendFile('login.html', {
      root: path.join(__dirname, '../public')
    })
  }
});

module.exports = router;
