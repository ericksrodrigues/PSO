const makeparticula = require("./particula");

module.exports = function(particulas,c1,c2,m,fitness,w,min,max,analise){
		
	let gBest;
	let array_fitness = [];
	let p = particulas.slice();

	
	for(let i = 0; i < m ; i++){
		p.forEach(function(particula,indice){
			//console.log("Posições",particula.position);
			if(i == 0 && indice == 0)
				gBest = particula.position.slice();
			if(!particula.best){
				particula.best = particula.position.slice();

				if(fitness(particula.best) < fitness(gBest)){
					gBest = particula.best.slice();
					//console.log("SWITCH1");
				}
			}else if(fitness(particula.position) < fitness(particula.best)){
				particula.best = particula.position.slice();

				if(fitness(particula.best) < fitness(gBest)){
					gBest = particula.best.slice();
					//console.log("SWITCH2");
				}
			}
			if(analise == "a1" || analise == "a2a")
				particula.update_speed(c1,c2,w,gBest);
			else if(analise == "a2c")
				particula.update_speed_clerc(c1,c2,gBest.slice());
			else if(analise == "a2b")
				particula.update_speed_dec(c1,c2,gBest.slice(),i,m);
			particula.update_position();

			
		});
		array_fitness.push(fitness(gBest));
		//console.log("iteracao: ", i, "fitness", fitness(gBest));
	}

	return array_fitness;
}