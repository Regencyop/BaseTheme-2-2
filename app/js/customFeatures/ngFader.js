(function () {
    'use strict';
    angular.module('OrderCloud-ngFader', [])
      .directive('ngFader', function($interval, $location) {

	  function link(scope){
		scope.setTime = 5000;
        scope.imageLink = 'https://www.four51.com/Themes/Custom/df7e2b71-6326-4da6-a24f-554d7d910faf/companyId/652629/';
		//List your images here. 
		scope.images = [{
			src: 'faderImages/image1.jpg',
			alt: 'Shoe Drop Webstore'
		}, {
			src: 'faderImages/image2.jpg',
			alt: 'Unparalleled Quality'
		}, {
			src: 'faderImages/image3.jpg',
			alt: 'Shoe Care & Repare for the modern world'
		}, {
			src: 'faderImages/image4.jpg',
			alt: 'Invest in your Shoes'
		}, {
			src: 'faderImages/image5.jpg',
			alt: 'Unmatched Quality'
		}];
		
		//Pagination dots - gets number of images
        scope.numberOfImages = scope.images.length;
        scope.dots = function(num) {
          return new Array(num);   
        };

        //Pagination - click on dots and change image
        scope.selectedImage = 0;
        scope.setSelected = function (idx) {
          scope.stopSlider();
          scope.selectedImage = idx;
        };

        //Slideshow controls
        scope.sliderBack = function() {
          scope.stopSlider();
          scope.selectedImage === 0 ? scope.selectedImage = scope.numberOfImages - 1 : scope.selectedImage--;
        };

        scope.sliderForward = function() {
          scope.stopSlider();
          scope.autoSlider();
        };

        scope.autoSlider = function (){
          scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
        };

        scope.stopSlider = function() {
          $interval.cancel(scope.intervalPromise);
          scope.activePause = true;
          scope.activeStart = false;
        };

        scope.toggleStartStop = function() {
            if(scope.activeStart) {
                scope.stopSlider();
            } else {
                scope.startSlider();
            }
        };
        
        scope.startSlider = function(){
          scope.intervalPromise = $interval(scope.autoSlider, scope.setTime);
          scope.activeStart = true;
          scope.activePause = false;
        };
        scope.startSlider();

        scope.show = function(idx){
        	if (scope.selectedImage==idx) {
        		return "show";
        	}
        };
        

	}

	  return {
	    restrict: 'E',
	    scope: false,
	    template: '<div class="ng-fader">'+
			'<ul class="faderImages">' + 
				'<li ng-repeat="image in images" ng-click="toggleStartStop()" ng-swipe-right="sliderBack()" ng-swipe-left="sliderForward()"><img data-ng-src="{{imageLink}}{{image.src}}" data-ng-alt="{{image.alt}}" ng-class="show($index)"/></li>' + 
			'</ul>' + 
			'<div class="ng-fader-pagination">' + 
				'<ul>' + 
					'<li ng-repeat="i in dots(numberOfImages) track by $index" ng-class="{current: selectedImage==$index}" ng-click="setSelected($index)"></li>' + 
				'</ul>' + 
			'</div>' + 
		'</div>',
		link: link
	  };
      });

}());
