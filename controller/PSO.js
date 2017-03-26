const makeparticula = require("./particula");

function _position(){
	let position = [];
	for(let i = -100; i < 100; i++){
		position.push(getRandomInt(-5,5));
	}
	return position;
}

function _speed(){
	let speed = [];
	for(let i = 0; i < 30; i++){
		speed.push(getRandomInt(0,2));
	}
	return speed;	
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(c1,c2,m,fitness){
		
	let gBest;
	let particulas = [];

	for(let i = 0; i < 30; i++){
	 	particulas.push(makeparticula(_position(),_speed()));
	}
	for(let i = 0; i < m ; i++){
		particulas.forEach(function(particula,indice){
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

			particula.update_speed(c1,c2,0.8,gBest);
			particula.update_position();
			
		});
		console.log("iteracao: ", i, "fitness", fitness(gBest));
	}
}