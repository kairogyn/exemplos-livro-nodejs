module.exports = function(app){
	var ChatController = {
		index: function(req, res){
			var usuario = req.session.usuario;
			var params = {usuario: usuario};
			res.render('chat/index',params);
		}
	};
		return ChatController;
};