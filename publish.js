var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.publish('newMyT', "oi1")
client.publish('newMyT', "oi2")
client.publish('newMyT', "oi3")
client.publish('newMyT', "oi4")

client.end()
