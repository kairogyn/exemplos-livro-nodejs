module.exports = function(app){
    var contatos = app.controllers.contatos;
    app.get('/contatos', contatos.index);
    app.get('/contato/:id', contatos.show);
    app.post('/contato', contatos.create);
    app.get('/contato/:id/editar', contatos.editar);
    app.put('/contato/:id', contatos.editar);
    app.delete('/contato/:id', contatos.destroy);

    
};


