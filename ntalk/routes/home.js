module.exports = function(app){
    console.log("passei pelo routes");
    var home = app.controllers.home;
    
    app.get('/', home.index);
};


