Box = function(x,y) {


	var pos = this.pos = new Vector2(x,y);  
	var boxImg = new Image();
	boxImg.onload = function() {
        console.log("Image has loaded");
	};
	boxImg.src = 'images/bg_wall2.png';
	
	var canvas = this.canvas = document.createElement("canvas"); 
	
	canvas.width = 60; 
	canvas.height = 60;
	canvas.style = "display:block; position:absolute; background-color:'#ff0000';"; 
	canvas.style.webkitTransformOrigin = canvas.style.MozTransformOrigin = canvas.style.OTransformOrigin = canvas.style.transformOrigin = "30px 30px"; 
	
	var c = canvas.getContext( '2d' );
	this.c = c;  

	

	// c = canvas context
	this.draw = function() {		
		
		c.clearRect(0,0,60,60); 
		c.fillStyle = "rgba(255,255,255,0.5)";
		//c.fillRect(0,0,60,60); 
		c.save();
		c.translate(30, 30); 
		c.drawImage(boxImg, -15, -15);
		 

		
		c.restore();
		
		var posx = Math.round(pos.x-30); 
		var posy = Math.round(pos.y-30); 
		
		var styleStr = "translate3d("+posx+"px, "+posy+"px, 0px) rotate("+this.angle+"deg)"; 
		canvas.style.webkitTransform = canvas.style.MozTransform = canvas.style.OTransform = canvas.style.transform = styleStr; 
		//console.log(styleStr); 
		
		
	};


}; 