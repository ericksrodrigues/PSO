module.exports = function(position, speed){
	return {
		"position" : position,
		"speed" : speed,
		r1:1,
		r2:1,
		best: false,
		update_speed : function(c1,c2,w,gbest){

			for(let i = 0; i < 30 ; i++){
				this.speed[i] = w*this.speed[i] + Math.random()*c1*(this.best[i] - this.position[i]) + Math.random()*c2*(gbest[i] - this.position[i]);
			}
		},
		update_position : function(){
			console.log(this.speed);
			for(let i = 0; i < 30 ; i++){
				this.position[i] = this.position[i] + this.speed[i];
			}
		}
	};
}