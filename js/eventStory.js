//********************************************************************
//The Experience Story Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is used to give a character object experience based on 
//how far the user has scrolled down. It gives both a message which
//is displayed and moves upwards and a particle effect which adds to
//the experience bar.
//INPUT---------------------------------------------------------------
//character: A character object
//script: A JSON object with entries with the following elemengs
//**pos: The position at which the script item should be executed
//**xp: The amount of xp the script item is worth
//**message: The primary text to show for the script item
//**attributes[]: Attributes increaded by the experience
//canvas: An HTML canvas element the experience story takes place on
function EventStory(character, eventScript, canvas){

	//Setup the canvas
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.script = new Array();
	this.script = eventScript.slice(0);
	this.character = character;

	this.curEvents = [];



	//ANIMATE
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  This function calls both the read and draw
	//messages function. It should be the only function
	//that needs to be called by the main program
	this.animate = function(){
		this.read();
		this.runEvents();
	}


	//READ
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  Read the script and add any messages that
	//the character needs to get to the messages array.
	this.read = function(){

		for(var i = 0; i < this.script.length; i++){
			if(this.character.storyPos > this.script[i].startPos  && this.character.storyPos < this.script[i].startPos + 400){
				this.script[i].startTime = new Date().getTime();
				this.script[i].endTime = this.script[i].startTime + this.script[i].length;
				this.script[i].reset();
				this.curEvents.push(this.script[i]);
				this.script.splice(i, 1);
			}
		}
	}

	this.runEvents = function(){
		for(var i = 0; i < this.curEvents.length; i++){
			this.curEvents[i].animation();
			if(new Date().getTime() > this.curEvents[i].endTime){
				this.curEvents[i].reset();
				this.script.push(this.curEvents[i]);
				this.curEvents.splice(i,1);
				i--;
			}
		}

	}

}
