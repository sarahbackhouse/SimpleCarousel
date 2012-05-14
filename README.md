#Simple Carousel#

Semantic. Fluid. Vanilla javascript.

Based on a nice semantic list, a responsive site needs a carousel that responds too and if the carousel is the only javascript element on the page, why add a library?

[Demo.](http://sweetbee.github.com/SimpleCarousel/)

##Default values##

###startAt (int)###
Which slide to start at, detaults to 1.

###autoPlay (boolean)###
Whether to autoplay the carousel, defaults to false.

###duration (int)###
The number of seconds between animations, defaults to 8.

###generateNavigation (boolean)###
Whether to generate next/previous navigation, defaults to true.

###generatePagination (boolean)###
whether to generate page navigation, defaults to true.

###generatePause (boolean)###
Whether to generate pause/play navigation, defaults to true.

###beforeStart (function)###
The function called before each animation, defaults to empty function.

###afterEnd (function)###
The function called after each animation, defaults to empty function.

##Example HTML##

	<div class="carousel" id="carousel">
  		<div class="frame">
    		<ul class="items">
      			<li>...</li>
      			<li>...</li>
      			<li>...</li>
   	 		</ul>
  		</div>
	</div>

##Example CSS##

	.carousel .frame { 
	  position: relative;
	  overflow: hidden; 
	  width: 80%; 
	}
	.carousel .items { 
	  list-style: none; 
	  margin: 0; 
	  overflow: hidden; 
	  padding: 0; 
	}
	.carousel .items > li { 
	  box-sizing: border-box; 
	  padding: 0; 
	}

##Example Javascript##

	<script src="carousel.js"></script>
	<script>
	  new Carousel({
	    carousel: document.getElementById('carousel')
	  });
	</script>

##Works with##

* Google Chrome
* Firefox
* Safari - desktop, iPhone and iPad
* Blackberry 5, 6 & 7
* Opera
* Opera Mobile

Created by [Sarah Backhouse](http://lund.tumblr.com/). 

If you have any questions or feedback you can use the [GitHub project page](https://github.com/sweetbee/SimpleCarousel). Simple Carousel is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.html).