//********************************************************************
//The Dialogue Story Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is used to give a character object a speech bubble. The
//speed bubble is drawn by using a div, but there is some drawing on
//the canvas as well.
//INPUT---------------------------------------------------------------
//character: A character object
//script: A JSON object with entries with the following elemengs
//**startPos: 
//**endPos: 
//**text: 
//div: The id of the div which will hold the dialogue of the character
//canvas: An HTML canvas element the experience story takes place on
function DialogueStory(character, dialogueScript, div){

	this.script = new Array();
	this.script = dialogueScript.slice(0);
	this.character = character;

	this.bubbleDiv = $("#" + div);
	this.bubbleOffsetX = 30;
	this.bubbleOffsetY = 60;
	this.curText = null;



	//ANIMATE
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  This function calls both the read and speak
	//functions. It should be the only function
	//that needs to be called by the main program
	this.animate = function(){
		this.read();
		this.bubbleDiv.css({visibility : 'hidden'});
		if(this.curText)
			this.speak();
	}



	//READ
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  Read the script and add the text the character
	//is supposed to say at that moment. If a line
	//is found, save it in the curText variable.
	this.read = function(){

		for(var i = 0; i < this.script.length; i++){
			if(this.script[i].startPos <= this.character.storyPos && this.character.storyPos <= this.script[i].endPos){
				this.curText = this.script[i].text;
				return;
			} else {
				this.curText = null;
			}
		}
	}



	//SPEAK
	//************************************************
	//DESCRIPTION-------------------------------------
	//  This function finds the top left hand
	//corner of the speech bubble and then passes
	//those positions to both drawLineToSpeechBubble
	//and drawSpeechBubble functions
	this.speak = function(){
		var bubbleDisplayLeft = this.character.head.x + this.bubbleOffsetX - this.character.head.bobbleX;
		var bubbleDisplayTop = this.character.head.y - this.character.head.bobbleY - this.bubbleOffsetY - this.bubbleDiv.height();

		this.drawLineToSpeechBubble(bubbleDisplayLeft, bubbleDisplayTop);
		this.drawSpeechBubble(bubbleDisplayLeft, bubbleDisplayTop);
	}



	//DRAW SPEECH BUBBLE
	//********************************************
	//DESCRIPTION---------------------------------
	//  This function adds the text in the curText
	//variable to the p tag in the bubbleDiv and
	//then makes it visible.
	//INPUT---------------------------------------
	//bubbleDisplayLeft: The horizontal position
	//  of the bubble which displays the text.
	//bubbleDisplayTop: The position of the top
	//  of the bubble which displays the text.
	this.drawSpeechBubble = function(bubbleDisplayLeft, bubbleDisplayTop){

		//Update the CSS for the bubble
		this.bubbleDiv.find('p').text(this.curText);
		this.bubbleDiv.css({
			top : bubbleDisplayTop + "px",
			left : bubbleDisplayLeft + "px"
		})
		this.bubbleDiv.css({visibility : "visible"});
	}



	//DRAW LINE TO SPEECH BUBBLE
	//********************************************
	//DESCRIPTION---------------------------------
	//  This function draws a line to the speech
	//bubble from the character.
	//INPUT---------------------------------------
	//bubbleDisplayLeft: The horizontal position
	//  of the bubble which displays the text.
	//bubbleDisplayTop: The position of the top
	//  of the bubble which displays the text.
	this.drawLineToSpeechBubble = function(bubbleDisplayLeft, bubbleDisplayTop){
		var lineOffsetX = this.character.head.image.width/2 + 20;
		var lineOffsetY = -30;

		//Draw a line from the character to the text bubble
		var xLineDisplayStart = this.character.head.x + Math.cos(-this.character.head.rotation * Math.PI / 180) * lineOffsetX;
		var yLineDisplayStart = this.character.head.y + Math.sin(-this.character.head.rotation * Math.PI / 180) * lineOffsetY;

		this.character.ctx.save();
		this.character.ctx.strokeStyle = "rgba(255,255,255,1)";
		this.character.ctx.fillStyle = "rgba(255,255,255,1)";
		this.character.ctx.beginPath();
		this.character.ctx.moveTo(
			xLineDisplayStart,
			yLineDisplayStart);
		this.character.ctx.lineTo(
			bubbleDisplayLeft + this.bubbleDiv.width() - lineOffsetX,
			bubbleDisplayTop + this.bubbleDiv.height() + lineOffsetY);
		this.character.ctx.lineTo(
			bubbleDisplayLeft + this.bubbleDiv.width() - lineOffsetX - 20,
			bubbleDisplayTop + this.bubbleDiv.height() + lineOffsetY);
		this.character.ctx.lineTo(xLineDisplayStart, yLineDisplayStart);
		this.character.ctx.stroke();
		this.character.ctx.fill();
		this.character.ctx.restore();
	}

}