Box = function(x,y) {

        var life = this.life = 0
        var exploded = this.exploded = false;
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