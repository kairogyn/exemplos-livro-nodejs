var express = require("express"), load = require("express-load"), app=express();

app.set('view', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


load('models').then('controllers').then('routes').into(app);

app.listen(process.env.PORT, function () {
    console.log("Ntalk no ar.");
});
