var express = require('express');
var router = express.Router();
var Tweet = require('../models/Tweet');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conetics Lab' });
});

module.exports = router;
