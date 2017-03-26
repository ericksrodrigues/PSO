module.exports = function(position, speed){
	return {
		"position" : position.slice(),
		"speed" : speed.slice(),
		best: false,
		update_speed : function(c1,c2,w,gbest){

			for(let i = 0; i < 30 ; i++){
				this.speed[i] = w*this.speed[i] + Math.random()*c1*(this.best[i] - this.position[i]) + Math.random()*c2*(gbest[i] - this.position[i]);
				//console.log("SPEED: ", this.speed[i]);

			}
		},

		update_speed_clerc : function(c1,c2,gbest){
			for(let i = 0; i < 30 ; i++){
				this.speed[i] = 0.73*(this.speed[i] + Math.random()*c1*(this.best[i] - this.position[i]) + Math.random()*c2*(gbest[i] - this.position[i]));
			}
		},
		update_speed_dec : function(c1,c2,gbest,indice,m){
			let w = 0.9 - (0.5 * indice/m);
			//console.log("w ==>", w);
			for(let i = 0; i < 30 ; i++){
				this.speed[i] = w*this.speed[i] + Math.random()*c1*(this.best[i] - this.position[i]) + Math.random()*c2*(gbest[i] - this.position[i]);
				//console.log("SPEED: ", this.speed[i]);

			}

		},
		update_position : function(min,max){
			for(let i = 0; i < 30 ; i++){
				this.position[i] = this.position[i] + this.speed[i];
				
			}
		}

	};
}