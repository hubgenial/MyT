const config = require('./config.json');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://' + config.mqttserver);

var Bot = require('slackbots');
var settings = {
    token: config.slackkey,
    name: 'Porteiro do HubGenial'
};
var bot = new Bot(settings);

client.on('connect', function() {
  client.subscribe(config.mqtttopic);
});

client.on('message', function(topic, message) {
  bot.postMessageToChannel('porteiro_iot', message.toString());
});
