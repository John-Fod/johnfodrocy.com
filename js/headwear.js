//*************************************************************
//The Headwear Class
//*************************************************************
//**  DESCRIPTION----------------------------------------------
//**  INPUT----------------------------------------------------
//**  character: 
//**  canvas: A canvas element the character will be drawn on
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
	//INPUT----------------------------------------------------
	this.animate = function(){
		this.update();
		this.draw();
	}



	//UPDATE HEADWEAR
	//**********************************************************
	//DESCRIPTION-----------------------------------------------
	//INPUT-----------------------------------------------------
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

	this.draw = function(){

		this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(this.character.head.rotation * (Math.PI/180));
			this.ctx.drawImage(this.image, -this.image.width/2 + this.offsetX, -this.image.height/2 + this.offsetY);
		this.ctx.restore();

	}

}