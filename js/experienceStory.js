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
function ExperienceStory(character, experienceScript, canvas){
	this.textSpace = 30;
	this.attributeSpace = 20;

	//Setup the canvas
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.script = new Array();
	this.script = experienceScript.slice(0);
	this.character = character;

	this.curMessages = [];
	this.curParticles = [];



	//ANIMATE
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  This function calls both the read and draw
	//messages function. It should be the only function
	//that needs to be called by the main program
	this.animate = function(){
		this.read();
		this.drawExperienceBar();
		this.drawMessages();
		this.drawParticles();
	}



	//READ
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  Read the script and add any messages that
	//the character needs to get to the messages array.
	this.read = function(){

		for(var i = 0; i < this.script.length; i++){
			if(this.script[i].storyPos < this.character.storyPos){
				this.addMessage(this.script[i]);
				this.addParticles(this.script[i]);
				this.addStats(this.script[i]);
				this.script.splice(i, 1);
			}
		}
	}



	//DRAW MESSAGES
	//********************************************
	//DESCRIPTION--------------------------------
	//  Draws the messages in the correct location
	//and update their positions. Finally, delete
	//any messages that have left the screen
	this.drawMessages = function(){
		for(var i = 0; i < this.curMessages.length; i++){
			this.curMessages[i].update();
			this.curMessages[i].draw();
			if(this.curMessages[i].onScreen == false)
				this.curMessages.splice(i,1);
		}
	}


	this.drawParticles = function(){
		for(var i = 0; i < this.curParticles.length; i++){
			this.curParticles[i].update(this.character);
			if(this.curParticles[i].particles.length == 0){
				this.curParticles.splice(i,1);
			}else{
				this.curParticles[i].draw();
			}
		}
	}



	//ADD MESSAGE
	//************************************************************
	//DESCRIPTION-------------------------------------------------
	//  Adds a message to the messages array.
	//This function also calculates the correct
	//starting position of the new message
	//INPUT-------------------------------------------------------
	//message: A message from the script
	//**pos: The position at which the message should be given
	//**xp: The amount of xp the script item is worth
	//**role: The primary role of the message
	//**traits[]: Array of strings that represent the traits
	//**  gained from the experience
	this.addMessage = function(message){
		var offsetX = 80;
		var offsetY = 30;
		var newMessage = new ExperienceMessage(
			message.role,
			message.traits,
			message.skills,
			this.character.x + offsetX,
			this.character.head.y + offsetY,
			this.character.canvas,
			-1
		);
		//If there are already messages, move the start position down
		if(this.curMessages.length > 0){
			//Only change the start position if we need to
			if(this.curMessages[this.curMessages.length-1].endingY > this.character.head.y){
				newMessage.y = this.curMessages[this.curMessages.length-1].endingY + offsetY;
				newMessage.endingY = newMessage.y + newMessage.roleSpace + newMessage.traits.length * newMessage.traitSpace + newMessage.skills.length * newMessage.skillSpace;
			}
		}
		this.curMessages.push(newMessage);
	}


	//ADD PARTICLES
	//**************************************************************
	//DESCRIPTION---------------------------------------------------
	//  Adds a set of Experience Particles to the curParticles array
	//INPUT---------------------------------------------------------
	//message: A message from the script
	//**pos: The position at which the message should be given
	//**xp: The amount of xp the script item is worth
	//**text: The primary text of the message
	//**traits[]: Array of strings that represent the traits
	//**  gained from the experience
	//NOTE----------------------------------------------------------
	//  Only the xp from the message passed to the method will
	//be used
	this.addParticles = function(message){
		var offsetX = 20;
		var offsetY = -30;
		var newParticles = new ExperienceParticles(
			this.character.x + offsetX,
			this.character.y + offsetY,
			message.xp,
			this.character.canvas
		);
		this.curParticles.push(newParticles);
	}









	this.addStats = function(message){

		//Add the role if you need to
		var roleExists = false;
		$("#roles ul li").each(function(i) {
			if ($(this).text() == message.role){
				$(this).addClass('gained');
					$(this).css("color", flairColor);
				roleExists = true;
			}
		})
		if(roleExists == false){
			$("#roles ul").append("<li class='gained'>" + message.role + "</li>");
		} else {

		}
		//Add to traits
		if(typeof message.traits !== 'undefined'){
			for(var i = 0; i < message.traits.length; i++){
				var traitExists = false;
				$("#traits ul li").each(function() {
					if($(this).text() == message.traits[i]){
						$(this).addClass("gained");
						$(this).css("color", flairColor);
						traitExists = true;
					}
				})
				if(traitExists == false){
					$("#traits ul").append("<li class='gained'>" + message.traits[i] + "</li>");
				}
				
			}
		}
		//Add to skills
		for(var i = 0; i < message.skills.length; i++){
			var skillExists = false;
			$("#skills ul li").each(function() {
				//The character already has the skill
				if($(this).text().search(message.skills[i]) >= 0){
					var newLevel = parseInt($(this).children('sup').text().slice(5)) + 1;
					$(this).addClass('gained');
					$(this).css("color", flairColor);
					$(this).children('sup').text("lvl. " + newLevel);
					skillExists = true;
				}
			})
			if(skillExists == false){
				$("#skills ul").append("<li class='gained'>" + message.skills[i] + "<sup>lvl. 1</sup></li>");
			} else { 
			}
			
		}

		//Fade and remove the 'gained' class from all elements gained
		$(".gained").each(function(){
			$(this).animate({
				color: "black"
			}, 3500, function() {
				$(this).removeClass("gained");
 			});
		})
	}










	this.drawExperienceBar = function(offsetX=15, offsetY=35){

		//Setup the XP bar
		var xpMax = 2000; //Arbitrary maximum amount of XP
		var xpBarOffsetX = 38;
		var xpBarOffsetY = -27;
		var xpBarWidth = this.character.canvas.width * 0.55;
		var xpBarHeight = 30;
		var xpBarLineWidth = 3;
		var xpBarFillWidth = (this.character.xp * xpBarWidth) / xpMax;

		//***************
		//Draw the XP bar
		this.character.ctx.save();

		//Draw the XP text
		this.character.ctx.textAlign="start";
		this.character.ctx.font="30px 'Exo 2'";
		this.character.ctx.fillText("XP", offsetX, offsetY);
		this.character.ctx.strokeStyle = "rgba(0,0,0,1)";
		//Draw the amount of experience
		this.character.ctx.fillStyle = baseColor.getTransparentRGBA(0.6);
		this.character.ctx.fillRect(
			offsetX + xpBarOffsetX,
			offsetY + xpBarOffsetY,
			xpBarFillWidth,
			xpBarHeight);
		//Draw the outline of the box
		this.character.ctx.strokeRect(
			offsetX + xpBarOffsetX,
			offsetY + xpBarOffsetY,
			xpBarWidth,
			xpBarHeight);
		this.character.ctx.restore();

	}

}