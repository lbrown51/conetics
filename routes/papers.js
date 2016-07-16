var express = require('express');
var router = express.Router();
var models = require('../models/datamodel')
var json = require('json3');
/* GET users listing. */
router.get('/papers', function(req, res, next) {
  models.Paper.find({}, function(err, papers){
    res.json(papers);
  });

});

router.post('/paper', function(req, res, next){
  paper = new models.Paper(req.body)
  paper.save(function (err){
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted Paper!');
    }
  });
});

router.post('/rempaper', function(req, res, next){
    models.Paper.remove({ name: req.body.selected }, function (err){
      if (err) {
        console.log(err);
      } else {
        console.log('Removed '+req.body.name);
      }
    })
  });

router.post('/updpaper', function(req, res, next){
  models.Paper.update({ _id : req.body.id }, { $set: req.body },
  function (err, paper){
    if (err) {
      console.log(err);
    } else {
      console.log('Edited '+JSON.stringify(paper));
    }
  })
});

module.exports = router;
