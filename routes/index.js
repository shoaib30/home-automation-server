var express = require('express');
var router = express.Router();

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost', {
  "username": "iotUser",
  "password": "H@ck3r1O1"
})

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Trigger")
  client.publish('test', 'Hello mqtt')
  res.send("Triggered")
});

module.exports = router;

