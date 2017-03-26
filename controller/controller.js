const q = require('q');
const PSO = require("./PSO");
const makeparticula = require("./particula");

exports.a1 = function(res){
	const c1 = 2.05,
		c2 = 2.05,
		m = 10000,
		w = 0.2,
		min = -5,
		max = 5;
	let particulas = [];
	let particulas2 = [];
	let particulas3 = [];
	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	 	particulas2.push(makeparticula(_position(min,max),_speed()));
	 	particulas3.push(makeparticula(_position(min,max),_speed()));
	}

	//console.log("inicio",particulas);
	q.spread([PSO(particulas.slice(),c1,c2,m,_sphere,w,min,max,"a1"),PSO(particulas2.slice(),c1,c2,m,_rotated,w,min,max,"a1"),PSO(particulas3.slice(),c1,c2,m,_rosenbrock,w,min,max,"a1")],function(sphere,rotated,rosenbrock){
		console.log(_rosenbrock([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]));	
		//console.log("fim", particulas);
		res.render("a1",{
			"sphere": sphere,
			"rotated": rotated,
			"rosenbrock": rosenbrock
		});

	});
}

exports.a2 = function(res){
	const c1 = 2.05,
		c2 = 2.05,
		m = 10000,
		w = 0.8,
		min = -5,
		max = 5;
	let particulas = [];
	let pa
	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	}
	q.spread([_a2_sphere(c1,c2,m,w,min,max),_a2_rotated(c1,c2,m,w,min,max),_a2_rosenbrock(c1,c2,m,w,min,max)], function(sphere,rotated,rosenbrock){
			res.render("a2",{
			"sphere" : sphere,
			"rotated": rotated,
			"rosenbrock": rosenbrock
		})
	});

}

_a2_sphere = function(c1,c2,m,w,min,max){
	let particulas = [];
	let particulas2 = [];
	let particulas3 = [];

	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	 	particulas2.push(makeparticula(particulas[i].position.slice(),_speed()));
	 	particulas3.push(makeparticula(particulas[i].position.slice(),_speed()));
	}
	return q.spread([PSO(particulas.slice(),c1,c2,m,_sphere,w,min,max,"a2a"),PSO(particulas2.slice(),c1,c2,m,_sphere,w,min,max,"a2b"),PSO(particulas3.slice(),c1,c2,m,_sphere,w,min,max,"a2c")],function(r1,r2,r3){
		//console.log("R1",r1,"R2",r2,"R3",r3);
		return [r1,r2,r3];
	});
}

_a2_rotated = function(c1,c2,m,w,min,max){
	let particulas = [];
	let particulas2 = [];
	let particulas3 = [];

	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	 	particulas2.push(makeparticula(particulas[i].position.slice(),_speed()));
	 	particulas3.push(makeparticula(particulas[i].position.slice(),_speed()));
	}
	return q.spread([PSO(particulas.slice(),c1,c2,m,_rotated,w,min,max,"a2a"),PSO(particulas2.slice(),c1,c2,m,_rotated,w,min,max,"a2b"),PSO(particulas3.slice(),c1,c2,m,_rotated,w,min,max,"a2c")],function(r1,r2,r3){
		return [r1,r2,r3];
	});
}

_a2_rosenbrock = function(c1,c2,m,w,min,max){
	let particulas = [];
	let particulas2 = [];
	let particulas3 = [];

	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	 	particulas2.push(makeparticula(particulas[i].position.slice(),_speed()));
	 	particulas3.push(makeparticula(particulas[i].position.slice(),_speed()));
	}
	return q.spread([PSO(particulas.slice(),c1,c2,m,_rosenbrock,w,min,max,"a2a"),PSO(particulas2.slice(),c1,c2,m,_rosenbrock,w,min,max,"a2b"),PSO(particulas3.slice(),c1,c2,m,_rosenbrock,w,min,max,"a2c")],function(r1,r2,r3){
		return [r1,r2,r3];
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

function _position(min,max){
	let position = [];
	for(let i = 0; i < 30; i++){
		position.push(getRandomInt(min,max));
	}
	return position;
}

function _speed(){
	let speed = [];
	for(let i = 0; i < 30; i++){
		speed.push(0);
	}
	return speed.slice();	
}

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min) + Math.random();
}