var thrift = require('node-thrift');

var Publicar = require('./gen-nodejs/Publicar.js'),
    ttypes = require('./gen-nodejs/twit_types');

var usuarios = {};

var server = thrift.createServer(Publicar, {
  guardar: function(tw, success) {
    console.log("ingreso el usuario :", tw.usuario);
    usuarios[tw.id] = tw;
    console.log("y su casaca es dice: "+tw.casaca);
    success();
  },

});

server.listen(9090);
