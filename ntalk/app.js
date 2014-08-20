const KEY  = 'ntalk.sid', SECRET = 'ntalk';

var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require('express-session');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
var app = express();
var server = require('http').Server(app);
var sio = require('socket.io');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

load('models').then('controllers').then('routes').into(app);

app.use(error.notFound);
app.use(error.serverError);

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Ntalk no ar.");
});


var io = sio.listen(server);

io.sockets.on('connection', function (client) {
 client.on('send-server', function (data) {
      console.log("recebiii uuhuuu");
      var msg = "<b>" + data.nome +": </b>" +data.msg.replace("<br>","") +"<br>";
      client.emit('send-client',msg);
      client.broadcast.emit('send-client',msg);
  });
});