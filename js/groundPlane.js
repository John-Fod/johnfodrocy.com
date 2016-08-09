function loadGroundPlaneImages(gArray = []){
	var i = 0;
	for(i = 0; i < gArray.length; i++){
		gArray[i].image = new Image();
		gArray[i].image.src = "images/animation/objects/" + gArray[i].folderName + "/" + gArray[i].fileName;
	}
	return gArray;
}


function drawGroundPlane(gArray, speedMod, groundBase, camPos, canvas){
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

		/*
		if(
			camPos > gArray[i].startPos && 
			-(gArray[i].image.width) < canvas.width - speedMod * (camPos - gArray[i].startPos)
		){
			var imageX = canvas.width - speedMod * (camPos - gArray[i].startPos);
			var imageY = canvas.height - gArray[i].image.height + gArray[i].offsetY;
			ctx.drawImage(gArray[i].image, imageX, imageY);
		}
		*/
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