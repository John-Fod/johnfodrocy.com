//************************************************************
//**  GROUND PLANE
//**  This file holds some functions to draw the ground planes
//**    as well as the arrays that hold the information for
//**    the ground planes which are to be drawn.





//LOAD GROUND PLANE IMAGES
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Loads the ground plane images so they are ready to go
//as soon as they need to be drawn.
//INPUT--------------------------------------------------
//gArray: An array that will hold the ground planes.
//NOTE---------------------------------------------------
//  The position of the folder that holds all of the
//ground plane images is hard coded.
//  To be of any use, this function needs to take an
//already set-up array of ground images as its argument.
function loadGroundPlaneImages(gArray = []){
	var i = 0;
	for(i = 0; i < gArray.length; i++){
		gArray[i].image = new Image();
		gArray[i].image.src = "images/animation/objects/" + gArray[i].folderName + "/" + gArray[i].fileName;
	}
	return gArray;
}


//DRAW GROUND PLANE
//***********************************************************
//DESCRIPTION------------------------------------------------
//  Draws the ground plane images as they need to be drawn.
//INPUT------------------------------------------------------
//gArray: An array of ground plane objects with the following
//  values
//  **startPos: The position they will start at.
//  **folderName: The name of the folder the artwork is in.
//  **offsetY: Used to set the y position relative to the
//      bottom of the canvas
//  **image: This should be set to null, it will be loaded
//      when the array is passed to the
//      loadGroundPlaneImages() function.
//speedMod: This determines how fast the ground plane will
//  move along the screen.
//camPos: The position of the 'camera' or scroll.
//canvas: The canvas the ground plane is to be drawn on.
function drawGroundPlane(gArray, speedMod, camPos, canvas){
	var ctx = canvas.getContext("2d");

	for(i = 0; i < gArray.length; i++){
		var imageX = speedMod * (gArray[i].startPos - camPos);
		if(
			imageX < canvas.width &&
			imageX + gArray[i].image.width > 0
		){
			var imageY = canvas.height - gArray[i].image.height + gArray[i].offsetY;
			ctx.drawImage(gArray[i].image, imageX, imageY);
		}
	}
}

//************************
//Middleground Back Images
//**Behind the character
var middlegroundBack = [
	{
		startPos : 1200,
		folderName : "signs",
		fileName : "sign-forward-backward.png",
		offsetY : -35,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "kaminariMon.png",
		offsetY : -35,
		startPos : 3000,
		image : null
	},
	{
		folderName : "misc",
		fileName : "lantern.png",
		offsetY : -35,
		startPos : 4250,
		image : null
	},
	{
		folderName : "trees",
		fileName : "cherryTreeFull.png",
		offsetY : -35,
		startPos : 6200,
		image : null
	},
	{
		folderName : "trees",
		fileName : "cherryTreeFull.png",
		offsetY : -35,
		startPos : 7200,
		image : null
	},
	{
		folderName : "trees",
		fileName : "cherryTreeFull.png",
		offsetY : -35,
		startPos : 8200,
		image : null
	},
	{
		folderName : "misc",
		fileName : "computer.png",
		offsetY : -35,
		startPos : 10000,
		image : null
	}
];



//***************************
//Middleground Front Images
//**In front of the character
var middlegroundFront = [
	{
		folderName : "misc",
		fileName : "lantern.png",
		offsetY : -35,
		startPos : 4500,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "osu-pilar.png",
		offsetY : -35,
		startPos : 12000,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "osu-pilar.png",
		offsetY : -35,
		startPos : 13500,
		image : null
	}

];



//*****************
//Background Images
var background = [
	{
		folderName : "mountains",
		fileName : "fuji.png",
		offsetY : -40,
		startPos : 2500,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "NTTBuilding.png",
		offsetY : -40,
		startPos : 5200,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "school.png",
		offsetY : -5,
		startPos : 6500,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "osu-building.png",
		offsetY : -40,
		startPos : 12000,
		image : null
	},
	{
		folderName : "buildings",
		fileName : "MichiganCapitalBuilding.png",
		offsetY : -10,
		startPos : 19000,
		image : null
	}
];


//************************
//Foreground Images
//**In front of everything
var foreground = [
	{
		folderName : "trees",
		fileName : "CherryTreeFront.png",
		offsetY : 0,
		startPos : 2500,
		image : null
	},
	{
		folderName : "misc",
		fileName : "RubyRockRuby.png",
		offsetY : 0,
		startPos : 9200,
		image : null
	}
];