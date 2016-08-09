//********************************************************************
//The Experience Message Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is a single message that is shown on the screen
//INPUT---------------------------------------------------------------
//text: The main text of the message
//abilitiesArray: An array of abilities increased by the experience
//x: The starting x position of the message
//y: The starting y position of the message
//canvas: The canvas element the message will be drawn on
//speed: The speed at which the message moves (positive is down)
function ExperienceMessage(role, traitsArray, skillsArray, x, y, canvas, speed){
	this.roleSpace = 30; //Space taken up by the role of each message
	this.traitSpace = 20; //Space taken up by each trait
	this.skillSpace = 20; //Space taken up by each skill
	this.onScreen = true;
	this.x = x;
	this.y = y;

	//Setup the canvas
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	//Setup the message
	this.role = role;
	this.traits = new Array();
	if(traitsArray){
		this.traits = traitsArray.slice(0);
	} else {
		this.traits = [];
	}
	this.skills = new Array();
	this.skills = skillsArray.slice();
	this.speed = speed;
	this.onScreen = true;
	this.roleColor = baseColor;
	this.traitColor = flairColor;
	this.skillColor = flairColor;

	//Get where the message ends
	this.endingX = this.x;
	this.endingY = this.y + this.roleSpace + this.traits.length * this.traitSpace + this.skills.length * this.skillSpace;


	//UPDATE
	//********************************************
	//DESCRIPTION---------------------------------
	//  This updates the position of each message
	//and the position at which it ends
	this.update = function(){
		if(this.endingY < this.canvas.height)
			this.speed *= 1.015;
		this.y += this.speed;
		this.endingY += this.speed;
		if(this.endingY < 0)
			this.onScreen = false;
	}



	//DRAW
	//********************************************
	//DESCRIPTION---------------------------------
	//  This draws each message on the canvas. It
	//draws both the main role and the traits.
	this.draw = function(){
		this.ctx.save();
		
		//Write the role of the message
		this.ctx.fillStyle = this.roleColor;
		this.ctx.textBaseline = "bottom";
		this.ctx.textAlign = "start";
		this.ctx.font = "bold 30px 'Exo 2'";
		this.ctx.fillText(this.role, this.x, this.y);
		this.ctx.restore();
		

		//Write each trait of the message
		if(typeof this.traits !== undefined){
			for(i = 0; i < this.traits.length; i++){
				this.ctx.save();
				this.ctx.font = "20px 'Exo 2'";
				this.ctx.fillStyle = this.traitColor;
				this.ctx.fillText(
					this.traits[i],
					this.x,
					this.y + this.roleSpace + i * this.traitSpace
				);
				this.ctx.restore();
			}
		}

		//Write each skill of the message
		if(typeof this.skills !== undefined){
			for(i = 0; i < this.skills.length; i++){
				if(typeof this.traits !== undefined){
					yPos = this.y + this.roleSpace + i * this.skillSpace + this.traits.length * this.traitSpace;
				}else{
					yPos = this.y + this.roleSpace + i * this.skillSpace;
				}
				this.ctx.save();
				this.ctx.font = "20px 'Exo 2'";
				this.ctx.fillStyle = this.skillColor;
				this.ctx.fillText(
					this.skills[i],
					this.x,
					yPos
				);
				this.ctx.restore();
			}
		}
	}




}