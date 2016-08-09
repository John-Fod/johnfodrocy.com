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


	//positionCanvas("story");
	//positionElement("stats");
	resizeCanvas("story", "creative");
	resizeElement("stats", "creative");

	//Function to keep the story element fixed after the user
	//scrolls down
	$(window).scroll(function(){
		cameraPos = $(window).scrollTop();
		//positionCanvas("story");
		//positionElement("stats");
	});


	$(window).resize(function(){
		resizeCanvas("story", "creative");
		resizeElement("stats", "creative");
	});
})


window.onload=function(){
	$('#creative, #logical').css({
		display : 'block'
	});

	$('#loading').css({
		display : 'none'
	});
}


//Make a string in the form of an RGBA value transparent
//**Preconditions: The string must be an RGBA value with
//**  the transparency set to 1 or 0 like 'RGBA(255,255,255,1)'
//**Postconditions: A string with an updated value for the 
//**  opacity will be returned
String.prototype.getTransparentRGBA = function (opacity){
	return this.substring(0, xpColor.length - 2) + opacity.toString() + ")";
}

//Get the position of the mouse
//***Code credit to
//***html5canvastutorials.com
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function resizeCanvas(canvasID, columnID){
		$("#story")[0].getContext('2d').canvas.width = window.innerWidth;
		$("#story")[0].getContext('2d').canvas.height = window.innerHeight;

}

function resizeElement(elementID, columnID){
	var element = $("#" + elementID);
	var column = $("#" + columnID);
		element.width($('body').width());
}


function positionCanvas(canvasID){


	var scrollTop = 467;
	var newTopMargin = 50;
	var storyCTX = $('#' + canvasID)[0].getContext('2d');

	if($(window).scrollTop() >= scrollTop){
		//newTopMargin = $(window).scrollTop() - (50+465);
		$('#story').css({
			position : 'fixed',
			top : '0px',
			left : '0px',
			width : $("body").width()
		});
		$('#word-bubble, #second-word-bubble').css({
			display : 'block',
			position : 'fixed',
			top : '35px',
			left : '77px'
		})
	}
	if($(window).scrollTop() < scrollTop){
		$('#' + canvasID).css({
			position : 'relative',
			top : '0px',
			left : '0px',
			width : $("body").width()
		});
		$('#word-bubble, #second-word-bubble').css({
			display : 'none'
		})
	}
	var curY = $(window).scrollTop();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillText(curY + "-" + newTopMargin,10,20);

}


function positionElement(elementID){


	var scrollTop = 467;
	var newTopMargin = 50;

	if($(window).scrollTop() >= scrollTop){
		//newTopMargin = $(window).scrollTop() - (50+465);
		$('#'+elementID).css({
			position : 'fixed',
			top : '495px',
			left : '63px'
		});
	}
	if($(window).scrollTop() < scrollTop){
		$('#' + elementID).css({
			position : 'relative',
			top : '0px',
			left : '0px'
		});
	}

}
