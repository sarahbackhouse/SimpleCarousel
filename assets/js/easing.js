Carousel.prototype.easeInQuad = function(pos){
	return Math.pow(pos, 2);
}

Carousel.prototype.easeOutQuad = function(pos){
	return -(Math.pow((pos-1), 2) -1);
}

Carousel.prototype.easeInOutQuad = function(pos){
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
    return -0.5 * ((pos-=2)*pos - 2); 
}

Carousel.prototype.easeInCubic = function(pos){
	return Math.pow(pos, 3);
}

Carousel.prototype.easeOutCubic = function(pos){
	return (Math.pow((pos-1), 3) +1);
}

Carousel.prototype.easeInOutCubic = function(pos){
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
    return 0.5 * (Math.pow((pos-2),3) + 2); 	
}

Carousel.prototype.easeInQuart = function(pos){
	return Math.pow(pos, 4);
}

Carousel.prototype.easeOutQuart = function(pos){
	return -(Math.pow((pos-1), 4) -1)
}

Carousel.prototype.easeInOutQuart = function(pos){
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
    return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2); 
}

Carousel.prototype.easeInQuint = function(pos){
	return Math.pow(pos, 5);
}

Carousel.prototype.easeOutQuint = function(pos){
	return (Math.pow((pos-1), 5) +1);
}

Carousel.prototype.easeInOutQuint = function(pos){
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
    return 0.5 * (Math.pow((pos-2),5) + 2); 	
}

Carousel.prototype.easeInSine = function(pos){
	return -Math.cos(pos * (Math.PI/2)) + 1;
}

Carousel.prototype.easeOutSine = function(pos){
	return Math.sin(pos * (Math.PI/2));
}

Carousel.prototype.easeInOutSine = function(pos){
	return (-.5 * (Math.cos(Math.PI*pos) -1));
}

Carousel.prototype.easeInExpo = function(pos){
	return (pos==0) ? 0 : Math.pow(2, 10 * (pos - 1));
}

Carousel.prototype.easeOutExpo = function(pos){
	return (pos==1) ? 1 : -Math.pow(2, -10 * pos) + 1;
}

Carousel.prototype.easeInOutExpo = function(pos){
	if(pos==0) return 0;
	if(pos==1) return 1;
	if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
	return 0.5 * (-Math.pow(2, -10 * --pos) + 2);	
}

Carousel.prototype.easeInCirc = function(pos){
	return -(Math.sqrt(1 - (pos*pos)) - 1);
}

Carousel.prototype.easeOutCirc = function(pos){
	return Math.sqrt(1 - Math.pow((pos-1), 2))
}

Carousel.prototype.easeInOutCirc = function(pos){
	if((pos/=0.5) < 1) return -0.5 * (Math.sqrt(1 - pos*pos) - 1);
	return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);	
}

Carousel.prototype.easeOutBounce = function(pos){
	if ((pos) < (1/2.75)) {
		return (7.5625*pos*pos);
	} else if (pos < (2/2.75)) {
		return (7.5625*(pos-=(1.5/2.75))*pos + .75);
	} else if (pos < (2.5/2.75)) {
		return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
	} else {
		return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
	}
}

Carousel.prototype.easeInBack = function(pos){
	var s = 1.70158;	
	return (pos)*pos*((s+1)*pos - s);
}

Carousel.prototype.easeOutBack = function(pos){
	var s = 1.70158;	
	return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
}
Carousel.prototype.easeInOutBack = function(pos){
	var s = 0.70158;	
	if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
	return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
}