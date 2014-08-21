module.exports = function(app){
	var ChatController = {
		index: function(req, res){
			console.log(req.query.sala);
			var params = {sala:req.query.sala};
			res.render('chat/index',params);
		}
	};
		return ChatController;
};