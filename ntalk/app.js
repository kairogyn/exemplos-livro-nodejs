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
var cookie = cookieParser(SECRET);
var store = new expressSession.MemoryStore();
var mongoose = require("mongoose");
global.db = mongoose.connect('mongodb://kairogyn:a4k6y9h3@kahana.mongohq.com:10090/ntalk');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(expressSession({
   secret: SECRET,
   name:KEY,
   resave: true,
   saveUninitialized: true,
   store: store
    }));
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
io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('acesso negado'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

load('sockets').into(io);