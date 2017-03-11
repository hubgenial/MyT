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
  // verifica que estão citando o porteiro
  if (data.type === 'message' && data.text.startsWith('<@U4A8AN27P>')) {
    // verifica se pediram para listar os registrados
    if(data.text.match(/(quem (está|esta|ta) ((cadastrado)|(listado)|(registrado)))\?/igm)){
      listaEmpresas();
    }else{
      var found = data.text.match('<.*> [Oo] ([0-9]) é [oa] (.*)');
      console.log(found);
      empresas[found[1]] = found[2];
      console.log(empresas);
    }
  }
});

client.on('connect', function() {
  client.subscribe(config.mqtttopic);
});

client.on('message', function(topic, message) {
  // verifica se a empresa esta cadastrada
  if((empresas[message.toString()]) != undefined){
    // console.log(empresas[message.toString()] + ' vem abrir o portão.');
    // comentar abaixo para evitar o flood no canal durante o desenvolvimento
    bot.postMessageToChannel('porteiro_iot', empresas[message.toString()] + ' vem abrir o portão.');
  }else{
    // TODO tratar de enviar um feedback a quem esta chamando avisando
    //  que houve erro
    console.log('Nao encontrado, tente outro');
  }
});

function listaEmpresas(){
  console.log(empresas);
  var txt = "";
  if(Object.keys(empresas).length === 0){
    txt = 'no momento não existem cadastros.';
  }else{
    for (var key in empresas) {
      if (empresas.hasOwnProperty(key)) {
        txt += key + " -> " + empresas[key] + "\n";
      }
    }
  }
  bot.postMessageToChannel('porteiro_iot', txt);
}
