
var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Profile user")
    res.send("You are in the user profile")
});

router.post('/signup', function(req, res, next) {
    console.log("Logging in")
    res.send("Please sign up")
});

module.exports = router;