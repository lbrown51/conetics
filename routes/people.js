var express = require('express');
var router = express.Router();
var models = require('../models/datamodel')
var json = require('json3');
/* GET users listing. */
router.get('/people', function(req, res, next) {
  models.Person.find({}, function(err, persons){
    res.json(persons);
  });

});

router.post('/person', function(req, res, next){
  person = new models.Person(req.body)
  person.save(function (err){
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted Person!');
    }
  });
});

router.post('/remperson', function(req, res, next){
    models.Person.remove({ name: req.body.selected }, function (err){
      if (err) {
        console.log(err);
      } else {
        console.log('Removed '+req.body.selected);
      }
    })
});

router.post('/updperson', function(req, res, next){
  models.Person.update({ _id : req.body.id }, { $set: req.body },
  function (err, person){
    if (err) {
      console.log(err);
    } else {
      console.log('Edited '+JSON.stringify(person));
    }
  })
});

module.exports = router;
