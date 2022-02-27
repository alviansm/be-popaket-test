var express = require('express');
var router = express.Router();
var passport = require('passport');
var Logistic = require('./model');

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.post('/logistic', passport.authenticate('jwt', { session: false}), function(req, res) {
  try {
    var token = getToken(req.headers);
    var {destination_name, origin_name} = req.body;
    destination_name = destination_name.toUpperCase();
    origin_name = origin_name.toUpperCase();
    
    if (token) {
      var newLogistic = new Logistic({
          logistic_name: req.body.logistic_name,
          amount: req.body.amount,
          destination_name: destination_name,
          origin_name: origin_name,
          duration: req.body.duration
      });

      newLogistic.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Save courier failed.'});
        }
        res.json({success: true, msg: 'Successful created new courier.'});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  } catch (e) {
    return res.json({success: false, msg: e});
  }
});

router.get('/logistic', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Logistic.find(function (err, logs) {
      if (err) return next(err);
      res.json(logs);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/shipping', (req, res) => {
  try{
    let {origin_name, destination_name} = req.body;
    origin_name = origin_name.toUpperCase();
    destination_name = destination_name.toUpperCase();

    Logistic.find({$and: [
      {origin_name: origin_name}, {destination_name: destination_name}
    ]}, function(err, result) {
      if (err) return res.json({sucess: false, msg: "Oops! No data to be found"});

      if (result) {
        return res.json({sucess: true, result: result})
      }
    });
  } catch (e) {
    return res.json({success: false, msg: e});
  }

});

module.exports = router;
