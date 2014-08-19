var express = require("express");
var load = require("express-load");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require('express-session');
var methodOverride = require('method-override');
var error = require('./middlewares/error');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


load('models').then('controllers').then('routes').into(app);

io.sockets.on('connection', function (client)
{
    console.log("passei pela io.sockets.on");
    client.on('send-server',function (data){
        console.log("passei pela send-server");
        var msg = "<b>" +data.nome + ":</b>" +data.msg + "<br>";
        client.emit('send-client',msg);
        client.broadcast.emit('send-client',msg);
    });
});

app.use(error.notFound);
app.use(error.serverError);

app.listen(process.env.PORT, function () {
    console.log("Ntalk no ar.");
});
