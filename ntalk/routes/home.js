module.exports = function(app){
    console.log("passei pelo routes");
    var home = app.controllers.home;
    
    app.get('/', home.index);
    app.post('/entrar',home.login);
    app.get('/sair',home.logout);
    
};


