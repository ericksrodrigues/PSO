const controller = require("../controller/controller");

module.exports = function(app){
	app.get("/",function(req,res){
		res.send("OK");
	});

	app.get("/a1", function(req,res){
		controller.a1(res);
		//console.log(_rotated([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));	
	});

	app.get("/a2", function(req,res){
		controller.a2(res);
	});
}

function _sphere(position){
	var retorno =0;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i];
	}
	return retorno;
}