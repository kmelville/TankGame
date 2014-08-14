Box = function(x,y) {

        var life = this.life = 0;
	var pos = this.pos = new Vector2(x,y);  
	this.angle = 0; 
	var vel = this.vel = new Vector2(0,0);
	var width = 32;
	var height = 32;
	var targetVel = this.targetVel = new Vector2(0,0);  
	var temp = new Vector2(0,0);
	var boxImg = new Image();
	boxImg.onload = function() {
        console.log("Image has loaded");
	};
	boxImg.src = 'images/bg_wall2.png';
	
	var canvas = this.canvas = document.createElement("canvas"); 
	
	canvas.width = 32; 
	canvas.height = 32;
	canvas.style = "display:block; position:absolute; background-color:'#ff0000';"; 
	canvas.style.webkitTransformOrigin = canvas.style.MozTransformOrigin = canvas.style.OTransformOrigin = canvas.style.transformOrigin = "30px 30px"; 
	
	
	var c = canvas.getContext( '2d' );
	this.c = c;  
        
	this.update = function() {
            //speed limit
            var maxSpeed = 10; 
            if(targetVel.isMagGreaterThan(maxSpeed)){
                    targetVel.normalise(); 
                    targetVel.multiplyEq(maxSpeed); 

            }
            if(!targetVel.equals(vel)) {

                    temp.copyFrom(targetVel); 
                    temp.minusEq(vel); 
                    if(temp.isMagGreaterThan(0.001)) 
                            temp.multiplyEq(0.3); 

                    vel.plusEq(temp); 

            } 
            pos.plusEq(vel);

            if(vel.isMagGreaterThan(0)) this.angle = vel.angle();

            //if(thrustSize>0) thrustSize--; 
            thrustSize = vel.magnitude();
	};
        
        this.destroy = function () {
                // draw a white background to clear canvas
                c.fillStyle = "#FFF";
                c.fillRect(0, 0, c.canvas.width, c.canvas.height);

                // update and draw particles
                for (var i=0; i<particles.length; i++)
                {
                        var particle = particles[i];

                        particle.update(30);
                        particle.draw(c);
                }
        };

        /* Array of particles (global variable)
        */
        var particles = [];

        /*
         * Basic Explosion, all particles move and shrink at the same speed.
         * 
         * Parameter : explosion center
         */
        this.createBasicExplosion = function (x, y)
        {
	// creating 4 particles that scatter at 0, 90, 180 and 270 degrees
	for (var angle=0; angle<360; angle+=90)
	{
		var particle = new Particle();

		// particle will start at explosion center
		particle.x = x;
		particle.y = y;

		particle.color = "#FF0000";

		var speed = 50.0;

		// velocity is rotated by "angle"
		particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
		particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

		// adding the newly created particle to the "particles" array
		particles.push(particle);
	}
};
        
        this.isEnabled = function() {
            if(this.life<0){
		return false; 
            } else {
                return true;
            }
        };
        
	// c = canvas context
	this.draw = function() {		
		
		c.clearRect(0,0,32,32); 
		c.fillStyle = "rgba(255,255,255,0.5)";
		//c.fillRect(0,0,60,60); 
		c.save();
		c.translate(16, 16); 
		c.drawImage(boxImg, -16, -16);
		 

		
		c.restore();
		
		var posx = Math.round(pos.x-16); 
		var posy = Math.round(pos.y-16); 
		
		var styleStr = "translate3d("+posx+"px, "+posy+"px, 0px) rotate("+this.angle+"deg)"; 
		canvas.style.webkitTransform = canvas.style.MozTransform = canvas.style.OTransform = canvas.style.transform = styleStr; 
		//console.log(styleStr); 
		
		
	};


}; 