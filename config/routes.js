module.exports = function(app){
	app.get("/",function(req,res){
		res.send("OK");
	});

	app.get("/teste", function(req,res){
		require("./../controller/PSO")(2.05,2.05,1000,_sphere);
	});
}

function _sphere(position){
	var retorno =0;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i];
	}
	return retorno;
}