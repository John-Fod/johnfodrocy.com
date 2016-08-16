//*************************************************************
//The Headwear Class
//*************************************************************
//**  DESCRIPTION----------------------------------------------
//**    Headwear that the a character is wearing. If the
//**  character 'takes the headwear off', then it flies off
//**  screen. If the character 'puts the headwear on', then it
//**  flies from offscreen and onto the head of the character.
//**  INPUT----------------------------------------------------
//**  character: The character who the headwear belongs to
function Headwear(character){
	this.character = character;

	this.canvas = character.canvas;
	this.ctx = this.canvas.getContext("2d");

	this.image = 0;

	this.wearing = true;
	this.onScreen = true;
	this.offscreenX = Math.floor(Math.random() * 1000) - 500;
	this.offscreenY = Math.floor(Math.random() * 500) - 450;
	this.offsetY = 0;
	this.offsetX = 0;
	this.rotation = 0;
	this.x = 0;
	this.y = 0;
	this.speedX = 15;
	this.speedY = 15;


	//ANIMATE HEADWEAR
	//*********************************************************
	//DESCRIPTION----------------------------------------------
	//  This animates the headwear by first updating it, and
	//then drawing it.
	this.animate = function(){
		this.update();
		this.draw();
	}



	//UPDATE HEADWEAR
	//**********************************************************
	//DESCRIPTION-----------------------------------------------
	//  Updates the position of the headwear.
	//NOTE------------------------------------------------------
	//  This also takes care of the headwear flying off screen
	//or on to the character's head.
	//  This does not update the rotation of the headwear, that
	//is handled in the draw function, as is based off the
	//rotation of the character's head.
	this.update = function(){

		if(this.wearing == true){
			this.onScreen = true;
			if(Math.abs(this.x - this.character.head.x) <= this.speedX)
				this.x = this.character.head.x;
			if(Math.abs(this.y - this.character.head.y) <= this.speedY)
				this.y = this.character.head.y;
			if(this.x < this.character.head.x)
				this.x += this.speedX;
			if(this.x > this.character.head.x)
				this.x -= this.speedX;
			if(this.y < this.character.head.y)
				this.y += this.speedY;
			if(this.y > this.character.head.y)
				this.y -= this.speedY;
		} else {
			if(this.x < this.offscreenX)
				this.x += this.speedX;
			if(this.x > this.offscreenX)
				this.x -= this.speedX;
			if(this.y < this.offscreenY)
				this.y += this.speedY;
			if(this.y > this.offscreenY)
				this.y -= this.speedY;
			if(Math.abs(this.x - this.offscreenX) <= this.speedX && Math.abs(this.y - this.offscreenY) <= this.speedY)
				this.onScreen = false;
		}
	}

	//DRAW HEADWEAR
	//*****************************************************
	//DESCRIPTION------------------------------------------
	//  Draws the headwear.
	//NOTE-------------------------------------------------
	//  This function uses the character's head's rotation
	//to draw the headwear at the correct angle.
	this.draw = function(){
		this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(this.character.head.rotation * (Math.PI/180));
			this.ctx.drawImage(this.image, -this.image.width/2 + this.offsetX, -this.image.height/2 + this.offsetY);
		this.ctx.restore();

	}

}