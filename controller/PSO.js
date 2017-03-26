const makeparticula = require("./particula");

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
	return speed;	
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(c1,c2,m,fitness,w,min,max){
		
	let gBest;
	let particulas = [];
	array_fitness = [];

	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(min,max),_speed()));
	}
	for(let i = 0; i < m ; i++){
		particulas.forEach(function(particula,indice){
			//console.log("Posições",particula.position);
			if(i == 0 && indice == 0)
				gBest = particula.position.slice();
			if(!particula.best){
				particula.best = particula.position.slice();

				if(fitness(particula.best) < fitness(gBest)){
					gBest = particula.best.slice();
					console.log("SWITCH1");
				}
			}else if(fitness(particula.position) < fitness(particula.best)){
				particula.best = particula.position.slice();

				if(fitness(particula.best) < fitness(gBest)){
					gBest = particula.best.slice();
					console.log("SWITCH2");
				}
			}

			particula.update_speed(c1,c2,w,gBest.slice());
			particula.update_position();
			
		});
		array_fitness.push(fitness(gBest));
		console.log("iteracao: ", i, "fitness", fitness(gBest));
	}

	return array_fitness;
}