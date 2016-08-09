//Show helpful information for debugging
const DEBUG_ANIMATION = true;

//Global Variables 
var curScrollPos = 0;
var prevScrollPos = 0;
var curSpeed = 0;
var speedMod = 100;
var speedDegredation = 0.99;

var canvas = document.getElementById("story");
var ctx = canvas.getContext("2d");

var foregroundSpeed = 0.3;
var foregroundMod = 0;
var foregroundEdge = "NONE";

var xpColor = "rgba(20,9,122,1)";
var xpColor2 = "rgba(198,92,23,1)";
var xpColor3 = "rgba(19,71,12,1)";

var mousePos = {
	x:0,
	y:0
};

//***************
//Make the images

//Grass
var grass = new Image();
grass.src = 'images/animation/grass/grass.png';

//Set up the main character
var char = new Character(canvas);
char.loadCharacter(mainCharacterPositions, 'images/animation/character/main');


var mainCharacterExperienceStory = new ExperienceStory(char, mainCharacterExperience, canvas);
var mainCharacterDialogueStory = new DialogueStory(char, mainCharacterDialogue, "word-bubble");
var mainCharacterGestureStory = new GestureStory(char, mainCharacterGesture, characterGestures);
var mainCharacterEventStory = new EventStory(char, mainCharacterEvents, canvas);
var mainCharacterHeadwearStory = new HeadwearStory(char, mainCharacterHeadwear);

//Set up the background animation
var backgroundObjects = loadGroundPlaneImages(background);
var backgroundBase = 430;
var backgroundSpeedMod = 0.25;

//Set up the middleground back animation
var middlegroundBackObjects = loadGroundPlaneImages(middlegroundBack);
var middlegroundBackBase = 430;
var middlegroundBackSpeedMod = 0.39;

//Set up the middleground front animation
var middlegroundFrontObjects = loadGroundPlaneImages(middlegroundFront);
var middlegroundFrontBase = 430;
var middlegroundFrontSpeedMod = 0.41;

//Set up the foreground animation
var foregroundObjects = loadGroundPlaneImages(foreground);
var foregroundBase = 500;
var foregroundSpeedMod = 1.2;

canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

window.onload=function(){

	//Once the loading is finished, display the elements
	$('#creative, #logical').css({
		display : 'block'
	});

	$('#loading').css({
		display : 'none'
	});


	curScrollPos = $(window).scrollTop();

	$(window).scroll(function(){
		prevScrollPos = curScrollPos;
		curScrollPos = $(window).scrollTop();
		curSpeed = Math.abs(curScrollPos - prevScrollPos) * speedMod;
		if(curSpeed > 500)
			curSpeed = 500;


		//Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//*******************
		//Draw the background
		ctx.save();
		ctx.beginPath();
		ctx.rect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = "rgba(160,217,255,1)";
		ctx.fill();
		ctx.restore();

		//**********************
		//Draw background objects
		drawGroundPlane(backgroundObjects, backgroundSpeedMod, backgroundBase, curScrollPos, canvas);

		//**********************
		//Draw middleground back objects
		drawGroundPlane(middlegroundBackObjects, middlegroundBackSpeedMod, middlegroundBackBase, curScrollPos, canvas);

		//******************
		//Draw the character
		char.animate(curScrollPos, mousePos);
		mainCharacterHeadwearStory.animate();

		mainCharacterEventStory.animate();

		//**********************
		//Draw middleground front objects
		drawGroundPlane(middlegroundFrontObjects, middlegroundFrontSpeedMod, middlegroundFrontBase, curScrollPos, canvas);

		//**************
		//Draw the grass
		foregroundMod = curScrollPos*foregroundSpeed % grass.width;

		//If we can see the end, draw more grass
		if(foregroundMod > grass.width - canvas.width)
			ctx.drawImage(grass, -(foregroundMod-grass.width)-1, canvas.height-grass.height);
		ctx.drawImage(grass, -foregroundMod, canvas.height-grass.height);


		//**********************
		//Draw foreground objects
		drawGroundPlane(foregroundObjects, foregroundSpeedMod, foregroundBase, curScrollPos, canvas);


		//***********************************
		//Update the main character's stories
		mainCharacterGestureStory.animate();
		mainCharacterExperienceStory.animate();
		mainCharacterDialogueStory.animate();

		//Draw the scroll location
		ctx.fillText("Pos: " + curScrollPos + ", XP: " + char.xp, 10,canvas.height - 50);
	})

	window.setInterval(function(){

		//Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//*******************
		//Draw the background
		ctx.save();
		ctx.beginPath();
		ctx.rect(0,0,canvas.width, canvas.height);
		ctx.fillStyle = "rgba(160,217,255,1)";
		ctx.fill();
		ctx.restore();

		//**********************
		//Draw background objects
		drawGroundPlane(backgroundObjects, backgroundSpeedMod, backgroundBase, curScrollPos, canvas);


		//**********************
		//Draw middleground back objects
		drawGroundPlane(middlegroundBackObjects, middlegroundBackSpeedMod, middlegroundBackBase, curScrollPos, canvas);

  		//Redraw the character
		char.animate(curScrollPos, mousePos);
		mainCharacterHeadwearStory.animate();

		mainCharacterEventStory.animate();

		//**********************
		//Draw foreground objects
		drawGroundPlane(middlegroundFrontObjects, middlegroundFrontSpeedMod, middlegroundFrontBase, curScrollPos, canvas);

		//**************
		//Draw the grass
		foregroundMod = curScrollPos*foregroundSpeed % grass.width;
		//If we can see the end, draw more grass
		if(foregroundMod > grass.width - canvas.width)
			ctx.drawImage(grass, -(foregroundMod-grass.width)-1, canvas.height-grass.height);
		ctx.drawImage(grass, -foregroundMod, canvas.height-grass.height);

		//Adjust the speed
		if(curSpeed > 500)
			curSpeed = 500;
		if(curSpeed > 0.0001){
			curSpeed *= speedDegredation;
		} else {
			curSpeed = 0;
		}


		//**********************
		//Draw foreground objects
		drawGroundPlane(foregroundObjects, foregroundSpeedMod, foregroundBase, curScrollPos, canvas);

		//**********************
		//Update the word bubble
		//giveDialogue(char, curScrollPos, mainCharacterDialogue, "word-bubble");

		//***********************************
		//Update the main character's stories
		mainCharacterGestureStory.animate();
		mainCharacterExperienceStory.animate();
		mainCharacterDialogueStory.animate();

		//Draw the scroll location
		ctx.fillText("Pos: " + curScrollPos + ", XP: " + char.xp, 10,canvas.height - 50);
	}, 10);



}