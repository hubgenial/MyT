const config = require('./config.json')
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://' + config.mqttserver)

client.publish(config.mqtttopic, "Teste de comunicação.")

client.end()
