//********************************************************************
//The Headwear Story Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is used to give a character object different pieces
//of headwear as they progress through a script.
//INPUT---------------------------------------------------------------
//character: A character object
//script: A JSON object with entries with the following elemengs
//**headwear: A Headwear object that will be worn
//**startPos: The position at which the headwear is put on
//**endPos: The position at which the headwear is taken off
function HeadwearStory(character, headwearScript){
	this.character = character;

	//Setup the canvas
	this.canvas = this.character.canvas;
	this.ctx = this.canvas.getContext("2d");

	//Set up the script
	this.script = new Array();
	this.script = headwearScript.slice(0);

	//Load the headwear for each script item
	for(var i = 0; i < this.script.length; i++){
		this.script[i].headwear = new Headwear(this.character);
		this.script[i].headwear.image = new Image();
		this.script[i].headwear.image.src = "images/animation/character/headwear/" + this.script[i].headwearFile;
		this.script[i].headwear.offsetX = this.script[i].headwearOffsetX;
		this.script[i].headwear.offsetY = this.script[i].headwearOffsetY;
		this.script[i].headwear.character = this.character;
		this.script[i].headwear.x = this.character.head.x;
		this.script[i].headwear.y = this.character.head.y;
	}

	this.curHeadwear = [];



	//ANIMATE
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  This function calls both the read and draw
	//messages function. It should be the only function
	//that needs to be called by the main program
	this.animate = function(){
		this.read();
		this.updateHeadwear();
		this.drawHeadwear();
	}


	//READ
	//*****************************************************
	//DESCRIPTION------------------------------------------
	//  Checks to see if the character should be wearing
	//headwear based on their storyPos. This also updates
	//the headwear's 'wearing' variable and manages the
	//'curHeadwear' array.
	//NOTE-------------------------------------------------
	//  Before headwear is removed to the 'curHeadwear'
	//array, its 'wearing' variables is set to 'false' and
	//it will move off screen (via its 'update' method).
	//The headwear should only be removed from the
	//'curHeadwear' array once it is off screen.
	this.read = function(){
		//Add to the curHeadwear array
		for(var i = 0; i < this.script.length; i++){
			if(this.script[i].startPos <= this.character.storyPos && this.character.storyPos <= this.script[i].endPos){
				this.curHeadwear.push(this.script[i]);
				this.curHeadwear[this.curHeadwear.length - 1].headwear.wearing = true;
				this.curHeadwear[this.curHeadwear.length - 1].headwear.offscreenX = this.offscreenX = Math.floor(Math.random() * 1000) - 500;
				this.curHeadwear[this.curHeadwear.length - 1].headwear.offscreenY = this.offscreenY = Math.floor(Math.random() * 500) - 450;
				this.script.splice(i, 1);
				i--;
			}
		}
		for(var i = 0; i < this.curHeadwear.length; i++){
			if((this.curHeadwear[i].startPos > this.character.storyPos) || (this.curHeadwear[i].endPos < this.character.storyPos)){
				this.curHeadwear[i].headwear.wearing = false;
				//If the headwear is off screen, move it back to the script array
				if(this.curHeadwear[i].headwear.onScreen == false){
					this.script.push(this.curHeadwear[i]);
					this.curHeadwear.splice(i,1);
					i--;
				}
			} else {
				this.curHeadwear[i].headwear.wearing = true;
			}
		}
	}



	//UPDATE HEADWEAR
	//*****************************************************
	//DESCRIPTION------------------------------------------
	//  Updates the position of all of the headwear in the
	//curHeadwear array.
	this.updateHeadwear = function(){
		for(var i = 0; i < this.curHeadwear.length; i++){
			this.curHeadwear[i].headwear.update();
		}
	}


	//DRAW HEADWEAR
	//*****************************************************
	//DESCRIPTION------------------------------------------
	//  Draws all of the headwear in the curHeadwear array.
	this.drawHeadwear = function(){
		for(var i = 0; i < this.curHeadwear.length; i++){
			this.curHeadwear[i].headwear.draw();
		}

	}



}