function Carousel (settings) {
	this.carousel = settings.carousel;
	
	this.ops = {};
	this.ops.place = (settings.startAt === undefined ? 1 : settings.startAt);
	this.ops.autoPlay = (settings.autoPlay === undefined ? false: settings.autoPlay);
	this.ops.duration = (settings.duration === undefined ? 8 : settings.duration);
	this.ops.generateNavigation	= (settings.generateNavigation === undefined ? true : settings.generateNavigation);
	this.ops.generatePagination	= (settings.generatePagination === undefined ? true : settings.generatePagination);
	this.ops.generatePause = (settings.generatePause === undefined ? true : settings.generatePause);
	this.ops.beforeStart = (settings.beforeStart === undefined ? function(){} : settings.beforeStart);
	this.ops.afterEnd = (settings.afterEnd === undefined ? function(){} : settings.afterEnd);
	
	this.ops.paginationUl = settings.paginationUl;
	this.ops.animating = false;
	this.ops.timer = null;
	this.ops.aniDuration= 500;
	this.ul = this.carousel.getElementsByTagName('ul')[0];
    this.items = [];
    
	this.generateItems();
	this.clone();
	this.navigation();
	this.style();
	if (this.ops.autoPlay) {
		this.play();	
	}
}

Carousel.prototype.generateItems = function () {
	this.items = [];
    var nodes = this.ul.childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].tagName === "LI") {
            this.items.push(nodes[i]);
		}
	}
};

Carousel.prototype.clone = function () {		
	
	var node1 = this.items[0].cloneNode(true),
	node2 = this.items[this.items.length - 1].cloneNode(true);
	
	this.items[0].parentNode.insertBefore(node2, this.items[0]);		
	this.items[0].parentNode.appendChild(node1);

	this.generateItems();
};

Carousel.prototype.navigation = function () {

	var p = this;
	
	if (this.ops.generateNavigation || this.ops.generatePause || this.ops.generatePagination) {
		var d = document.createElement('div');
		this.carousel.appendChild(d);
		d.className = 'navigation';
	}

	if (this.ops.generateNavigation) {
		var a =  document.createElement('a');
		d.appendChild(a);
		a.href = '#';
		a.innerHTML = '&larr;';
		a.className = 'back';
		a.onclick = function() { p.back(); return false; };
	
		var a = document.createElement('a');
		d.appendChild(a);
		a.href = '#';
		a.innerHTML = '&rarr;';
		a.className = 'next';
		a.onclick = function () { p.next(); return false; };
	}
	
	if (this.ops.generatePause) {
		var a =  document.createElement('a');
		d.appendChild(a);
		a.href = '#';
		a.innerHTML = '◼';
		a.className = 'pause';
		a.onclick = function() {
			if (this.innerHTML == '◼') {
				this.innerHTML = '▶';
				p.ops.autoPlay = false;
				p.pause();			
			}
			else {
				this.innerHTML = '◼';
				p.ops.autoPlay = true;
				p.next();			
			}
			return false; 
		};
		
	}
	
	if (this.ops.generatePagination) { 
		var ul = document.createElement('ul');
		ul.className = 'pagination';
		this.ops.paginationUl = ul;

		d.appendChild(ul);
		
		for (var i = 1; i < this.items.length-1; i++) {
			
			var li = document.createElement('li');
			var a = document.createElement('a');
			li.appendChild(a);
			
			a.href = '#';
			a.innerHTML = i;
			
			if (i == this.ops.place) {
				li.className = 'selected';
				a.className = 'goto selected';
			}
			else {
				a.className = 'goto';
			}
			a.onclick = function () { p.goto(parseInt(this.innerHTML)); return false; };
			
			ul.appendChild(li);
		}
	}
	else if (this.ops.paginationUl) {
		var active = this.ops.paginationUl.getElementsByTagName('li');		
		for (var i = 1; i < this.items.length-1; i++) {
			var a = active[i-1].getElementsByTagName('a')[0];
			a.className = 'goto';
			if (i == this.ops.place) {
				active[i-1].className = 'selected';
				a.className = a.className +' selected';
			}
			a.onclick = function (slide) { return function() { p.goto(slide); return false; }  }(i);
		}
	}
};

Carousel.prototype.updateNavigation = function () {
	var links = this.ops.paginationUl.getElementsByTagName('li');
	
	for (var i = 0; i < links.length; i++) {	
		var a = links[i].getElementsByTagName('a')[0];
		if (i + 1 == this.ops.place) {
			links[i].className = 'selected';
			a.className = 'goto selected';
		}
		else {
			links[i].className = '';
			a.className = 'goto';
		}
	}
};

Carousel.prototype.style = function () {

    if (100 % this.items.length !== 0) {
        if (this.items.length < 10) {
            var lis = 10
        } 
        else {
            var lis = 25
        }
    } 
    else {
        var lis = this.items.length
    }
    
    this.itemWidth = parseFloat(100 / lis);
   
    for (var b = 0; b < this.items.length; b++) {

 		this.items[b].style.width = this.itemWidth + "%";

        this.items[b].style.display = "block";
        this.items[b].style.overflow = "hidden"
    }
    
    var ul = this.carousel.getElementsByTagName("ul")[0];
    ul.style.width = lis * 100 + "%";
    ul.style.left = "-" + 100 * this.ops.place + "%";
    ul.style.position = "relative"

};
	
Carousel.prototype.animate = function (elem, from, to, duration, beforeStart, afterFinish) {
	
	var fps = 32,
	interval = 1000 / fps,
	step = 0,
	totalStep = duration/interval,
	change = to - from,
	p = this;
	
	elem.style.left = from + '%';

	function animate () {
		
		if (step < totalStep) {
			step++;
		}
		
		var percentComplete = (step/totalStep),
			newValue = change * p.ease(percentComplete);
							
		elem.style.left = (from + newValue) + '%';
		
		if (step < totalStep) {
			setTimeout(animate, interval);
		}
		else {
			elem.style.left = to + '%';
			afterFinish();
		}
	}
	
	beforeStart();
	setTimeout(animate, interval);
};

Carousel.prototype.next = function () {			
	var p = this;

	if (!this.ops.animating) {
					
		this.ops.place = this.ops.place + 1;
		var ul = this.carousel.getElementsByTagName('ul')[0];
		
		this.animate(
			ul, 
			parseFloat(ul.style.left),
			'-'+ (this.ops.place * 100),
			this.ops.aniDuration,
			function () { 
				p.ops.beforeStart();
				p.ops.animating = true; 
				p.pause();
			},
			function () { 
				p.ops.animating = false; 
				if (p.ops.place == p.items.length - 1) {
					p.ops.place = 1;
					ul.style.left = '-'+ (p.ops.place * 100) +'%';
				}
				if (p.ops.autoPlay) {
					p.play();
				}
				p.updateNavigation();
				p.ops.afterEnd();
			}
		);
	}
	
	return false;
};

Carousel.prototype.back = function () {
	
	var p = this;

	if (!this.ops.animating) {
		this.ops.place = this.ops.place - 1;
		var ul = this.carousel.getElementsByTagName('ul')[0];
		
		this.animate(
			ul, 
			parseFloat(ul.style.left),
			'-'+ (this.ops.place * 100),
			this.ops.aniDuration,
			function () { 
				p.ops.beforeStart();
				p.ops.animating = true; 
				p.pause();
			},
			function () { 
				p.ops.animating = false;
										
				if (p.ops.place == 0) {
					p.ops.place = p.items.length -2;
					ul.style.left = '-'+ (p.ops.place * 100) +'%';
				}
				if (p.ops.autoPlay) {
					p.play();
				}
				p.updateNavigation();
				p.ops.afterEnd();
			}
		);
	}
	
	return false;
};

Carousel.prototype.goto = function (i) {

	if (i != this.ops.place) {
		if (i > this.ops.place) {
			this.ops.place = i - 1;
			this.next();
		}
		else {
			this.ops.place = i + 1;
			this.back();
		}
	}
	return false;
};

Carousel.prototype.periodicallyUpdate = function () {
	this.next();
};

Carousel.prototype.play = function () {
	var a = this;
    this.ops.timer = setTimeout(function () {
        a.periodicallyUpdate();
    }, a.ops.duration*1000);	
};

Carousel.prototype.pause = function () {
	clearTimeout(this.ops.timer);
};

Carousel.prototype.ease = function(pos){
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
    return -0.5 * ((pos-=2)*pos - 2); 
};