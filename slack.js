const config = require('./config.json');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://' + config.mqttserver);

const empresas = {};

var Bot = require('slackbots');
var settings = {
    token: config.slackkey,
    name: 'Porteiro do HubGenial'
};
var bot = new Bot(settings);

bot.on('message', function(data) {
    if (data.type === 'message' && data.text.startsWith('<@U4A8AN27P>')) {
      var found = data.text.match('<.*> O ([0-9]) é [oa] (.*)');
      empresas[found[1]] = found[2];
    }
});

client.on('connect', function() {
  client.subscribe(config.mqtttopic);
});

client.on('message', function(topic, message) {
  // console.log(topic);
  // console.log(message.toString());
  // verifica se a empresa esta cadastrada
  if((empresas[message.toString()]) != undefined){
    // console.log(empresas[message.toString()] + ' vem abrir o portão.');
    // comentar abaixo para evitar o flood no canal durante o desenvolvimento
    bot.postMessageToChannel('porteiro_iot', empresas[message.toString()] + ' vem abrir o portão.');
  }else{
    // TODO tratar de enviar um feedback a quem esta chamando avisando q o erro
    console.log('Nao encontrado, tente outro');
  }
});
