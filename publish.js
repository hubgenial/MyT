const config = require('./config.json')
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://' + config.mqttserver)

client.publish(config.mqtttopic, "oi1")
client.publish(config.mqtttopic, "oi2")
client.publish(config.mqtttopic, "oi3")
client.publish(config.mqtttopic, "oi4")

client.end()
