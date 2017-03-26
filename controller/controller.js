const q = require('q');
const PSO = require("./PSO");

exports.a1 = function(res){
	const c1 = 2.05,
		c2 = 2.05,
		m = 10000,
		w = 0.8,
		min = -10,
		max = 10;
	q.spread([PSO(c1,c2,m,_sphere,w,min,max),PSO(c1,c2,m,_rotated,w,min,max),PSO(c1,c2,m,_rosenbrock,w,min,max)],function(sphere,rotated,rosenbrock){
		console.log(_rosenbrock([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]));	
		res.render("a1",{
			"sphere": sphere,
			"rotated": rotated,
			"rosenbrock": rosenbrock
		});

	});
}


function _sphere(position){
	var retorno =0;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i];
	}
	return retorno;
}

function _rotated(position){
	var retorno = 10 * 30;
	for(var i = 0; i < 30; i++){
		retorno += position[i]*position[i] - 10*Math.cos(Math.PI*position[i]);
	}
	return retorno;
}

function _rosenbrock(x){
	var retorno = 0;
	for(var i = 0; i < 29; i++){
		retorno += 100*(x[i+1] - x[i] * x[i])*(x[i+1] - x[i] * x[i]) + (x[i] - 1)*(x[i] - 1);
	}
	return retorno;
}