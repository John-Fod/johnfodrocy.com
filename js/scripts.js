/***************
/IMPORT FONT
***************/
WebFontConfig = {
	google: { families: [ 'Exo+2:400,900:latin' ] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

/**********************
/GLOBAL COLOR VARIABLES
***********************/
var baseColor = "rgba(14,2,194,1)";
var baseColorDark = "rgba(13,4,117,1)";
var flairColor = "rgba(235,103,23,1)";
var offColor = "rgba(81,189,66,1)";
var offColorDark = "rgba(32,143,16,1)";

/***************************************
/GLOBAL VARIABLE FOR THE CAMERA POSITION
***************************************/
var cameraPos = 0;




$(document).ready(function(){

	//Make sure the elements are the correct size
	resizeCanvas("story");
	resizeElement("stats");


	//Update the camera position as the user scrolls down
	$(window).scroll(function(){
		cameraPos = $(window).scrollTop();
	});

	//Resize the elements when the window is resized
	$(window).resize(function(){
		resizeCanvas("story");
		resizeElement("stats");
	});
})


//Remove the loading screen and show the content
window.onload=function(){
	$('#creative, #logical').css({
		display : 'block'
	});

	$('#loading').css({
		display : 'none'
	});
}



//GET TRANSPARENT RGBA
//*********************************************************
//DESCRIPTION----------------------------------------------
//  Returns a string that is formatted to be an RGBA color
//with the opacity level of the argument passed.
//INPUT----------------------------------------------------
//opacity[integer]: The new opacity of the RGBA
//NOTE-----------------------------------------------------
//  The original string must be an RGBA value with the
//transparency set to 1 or 0 like 'RGBA(255,255,255,1)'
String.prototype.getTransparentRGBA = function (opacity){
	return this.substring(0, xpColor.length - 2) + opacity.toString() + ")";
}


//GET MOUSE POSITION
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Gets the position on a canvas of the mouse and
//returns an element with its x and y positions.
//INPUT--------------------------------------------------
//canvas: The canvas to be used
//NOTE---------------------------------------------------
//  Code credit to html5canvastutorials.com
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}


//RESIZE CANVAS
//********************************************************
//DESCRIPTION---------------------------------------------
//  Resizes the canvas to match the width and height of
//the browser window
//INPUT---------------------------------------------------
//canvasID[string]: The id of the canvas to be resized
function resizeCanvas(canvasID){
		$("#story")[0].getContext('2d').canvas.width = window.innerWidth;
		$("#story")[0].getContext('2d').canvas.height = window.innerHeight;

}


//RESIZE ELEMENT
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Resizes an element to have the same width as the body
//of the HTML page
//INPUT--------------------------------------------------
//elementID[string]: The id of the element to resize
function resizeElement(elementID){
	var element = $("#" + elementID);
	element.width($('body').width());
}