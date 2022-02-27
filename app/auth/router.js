var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var User = require('./model');
var bcrypt = require('bcrypt');
var passport = require('passport');
const { SECRET_KEY } = require('../config');

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

router.post('/signup', async (req, res) => {
  const {username, name, password, msisdn} = req.body;
  let errors = [];

  try {
    // validate form
    if (!username || !name || !password || !msisdn) {
      errors.push("Please insert all input fields")
    }

    // validate username
    User.find({username: username}, function(err, user) {
      if (err) {
        res.json({success: false, msg: "Error occured while querying database"})
      }
      if (user) {
        errors.push(`${user} is registered`)
      }
    });
    User.find({msisdn: msisdn}, function(err, user) {
      if (err) {
        res.json({success: false, msg: "Error occured while querying database"})
      }
      if (user) {
        errors.push(`${user} is registered`)
      }
    });

    let pattern = /^62/;
    let check_pattern = pattern.test(msisdn);
    if (check_pattern == false) {
      errors.push("Start msisdn with 62");
    }

    if (errors.length == 0) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username,
        name,
        msisdn,
        password: hashedPassword
      });
      newUser.save().then(res.json({success:true, msg:"New user registered", info: errors}))
    } else {
      res.json({success: false, message: errors})
    }
  } catch (e) {
    res.json({success: false, msg: e})
  }

});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token      
          var token = jwt.sign(user.toJSON(), SECRET_KEY, {expiresIn: 604800});
          User.findByIdAndUpdate(user._id, {$push: {token: token}});
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/signout', passport.authenticate('jwt', { session: false}), function(req, res) {
  req.logOut();
  res.json({success: true, msg: 'Sign out successfully.'});
});

router.get('/me', passport.authenticate('jwt', { session: false}), function(req, res) {
  var user_jwt = req.body.jwt;
  var token = getToken(req.headers);
  if (token == user_jwt) {
    res.json(req.user);
  } else {
    return res.status(403).send({
      success: false,
      msg: "Unauthorized"
    })
  }
});

module.exports = router;
