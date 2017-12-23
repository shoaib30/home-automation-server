var express = require('express');
var router = express.Router();

var mqtt = require('mqtt');

var MQTT_TOPIC = process.env.MQTT_TOPIC;
var MQTT_ADDR = process.env.MQTT_ADDR;
var MQTT_PORT = process.env.MQTT_PORT;


var client = mqtt.connect(MQTT_ADDR, {
  port: MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  connectTimeout: 1000,
  debug: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Trigger");
  client.publish(MQTT_TOPIC, 'Hello mqtt');
  res.send("Triggered");
});

//connecting to topic
client.on('connect', function () {
  console.log("Connected to MQTT BROKER");
});

module.exports = router;

