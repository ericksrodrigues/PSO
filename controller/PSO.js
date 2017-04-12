const makeparticula = require("./particula");
const lodash = require("lodash");
const Q = require("q");

module.exports = function(particulas,c1,c2,m,fitness,w,min,max,analise){
	let gBest;
	let array_fitness = [];
	let array_media = [];
	let array_results = [];
	let p;
	let real_best = false;
	let real_gbest_position;
	let deferred = Q.defer();

	for (let j = 0; j < 1; j++){
		p = lodash.cloneDeep(particulas);
	for(let i = 0; i < m ; i++){
		p.forEach(function(particula,indice){
			//console.log("Posições",particula.position);
			if(i == 0 && indice == 0){
				gBest = lodash.cloneDeep(particula.position);
				if(analise == "a3c")
					real_gbest_position =lodash.cloneDeep(particula.position);
			}
			if(!particula.best){
				particula.best = lodash.cloneDeep(particula.position);

				if(fitness(particula.best) < fitness(gBest)){
					gBest = lodash.cloneDeep(particula.best);
					//console.log("SWITCH1");
				}
			}else if(fitness(particula.position) < fitness(particula.best)){
				particula.best = lodash.cloneDeep(particula.position);
				if(analise == "a3b"){
					if(i == 0){
						gBest = (fitness(particula.position) < fitness(particulas[indice - 1])) ? lodash.cloneDeep(particula.position) : lodash.cloneDeep(particulas[indice - 1].position);
					}
					else{
						let anterior = (indice == 0) ? particulas.length-1 : indice-1;
						let proximo = (indice == particulas.length-1) ? 0 : indice+1 
						gBest = (fitness(particulas[anterior].position) < fitness(particula.position)) ? lodash.cloneDeep(particulas[anterior].position) : lodash.cloneDeep(particula.position);
						gBest = (fitness(particulas[proximo].position) > fitness(particula.position)) ? lodash.cloneDeep(particula.position): lodash.cloneDeep(particulas[proximo].position);
					}
				}else if(analise == "a3c"){
					if(indice == 0){
						gBest = lodash.cloneDeep(real_gbest_position);
						if(fitness(particula.best) < fitness(gBest)){
							gBest = lodash.cloneDeep(particula.best);
						}
					}else{
						if(fitness(particulas[0].best) < fitness(particula.best))
							gBest = lodash.cloneDeep(particulas[i][0].best);
						else
							gBest = lodash.cloneDeep(particula.best);
					}
				}else{
					if(fitness(particula.best) < fitness(gBest)){
						gBest = lodash.cloneDeep(particula.best);
						//console.log("SWITCH2");
					}
				}
			}
			if(analise == "a1" || analise == "a2a" || analise == "a3a" || analise == "a3b" || analise == "a3c")
				particula.update_speed(c1,c2,w,gBest);
			else if(analise == "a2c" )
				particula.update_speed_clerc(c1,c2,lodash.cloneDeep(gBest));
			else if(analise == "a2b")
				particula.update_speed_dec(c1,c2,lodash.cloneDeep(gBest),i,m);
			particula.update_position();
			let f_gbest = fitness(gBest);
			if(!real_best || f_gbest < real_best){
				real_best = f_gbest;
				real_gbest_position = gBest;
			}
		});
		array_fitness.push(real_best);
		}
		array_results.push(lodash.clone(array_fitness));
		array_fitness = [];
		gBest = [];
		real_best = false;
		console.log(j);
	}
	for(let i = 0; i < array_results[0].length; i++){
		array_media.push(0);
	}
	for(let i = 0; i <array_results.length; i++){
		for(let j = 0; j < array_results[i].length; j++){
			array_media[j] += array_results[i][j];
		}
	}
	for(let i = 0; i < array_media.length; i++){
		array_media[i] = array_media[i] / 1;
	}
		deferred.resolve(array_media);

		return deferred.promise;
}