//*************************************************************
//The Book Class
//*************************************************************
//**DESCRIPTION----------------------------------------------
//**  This is a class for books which roll across the screen.
//**INPUT----------------------------------------------------
//**floor: The y value at which the book bounces off the ground
//**canvas: A canvas element the character will be drawn on
function Book(floor, canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.image = 0;
	this.floorOffset = floor;
	this.floor = this.canvas.getContext('2d').canvas.height - floor;

	this.gravity = 0.05;
	this.minStartSpeedX = 2.5;
	this.maxStartSpeedX = 5;
	this.minStartSpeedY = 3;
	this.maxStartSpeedY = 6;
	this.minStartRotationSpeed = 2;
	this.maxStartRotationSpeed = 5;
	this.maxStartX = 500;
	this.minStartX = 300;
	this.maxStartY = -100;
	this.minStartY = this.floor - 200;

	this.x = this.canvas.width;// + (Math.random() * (this.maxStartX - this.minStartX) + this.minStartX);
	this.y = Math.random() * (this.maxStartY - this.minStartY) + this.minStartY;
	this.rotation = Math.random() * 360;

	this.speedX = -1 * (Math.random() * (this.maxStartSpeedX - this.minStartSpeedX) + this.minStartSpeedX);
	this.speedY = Math.random() * (this.maxStartSpeedY - this.minStartSpeedY) + this.minStartSpeedY;
	this.rotationSpeed = -1 * (Math.random() * (this.maxStartRotationSpeed - this.minStartRotationSpeed) + this.minStartRotationSpeed);

	//ANIMATE BOOK
	//*********************************************************
	//DESCRIPTION----------------------------------------------
	//  This function runs the update and draw functions to
	//animate the book and make it appear to be rolling.
	this.animate = function(){
		this.update();
		this.draw();
	}


	//RESET BOOK
	//**********************************************************
	//DESCRIPTION-----------------------------------------------
	//  Resets the books to their original starting positions so
	//that the user can see the animation again.
	this.reset = function(){

		this.x = this.canvas.width + (Math.random() * (this.maxStartX - this.minStartX) + this.minStartX);
		this.y = Math.random() * (this.maxStartY - this.minStartY) + this.minStartY;
		this.rotation = Math.random() * 360;

		this.speedX = -1 * (Math.random() * (this.maxStartSpeedX - this.minStartSpeedX) + this.minStartSpeedX);
		this.speedY = Math.random() * (this.maxStartSpeedY - this.minStartSpeedY) + this.minStartSpeedY;
		this.rotationSpeed = -1 * (Math.random() * (this.maxStartRotationSpeed - this.minStartRotationSpeed) + this.minStartRotationSpeed);
	}



	//UPDATE BOOK
	//**********************************************************
	//DESCRIPTION-----------------------------------------------
	//  Moves and rotates the book. Also, if the book is below
	//the 'floor', this function changes the direction of the
	//book to make it appear to have bounced.
	this.update = function(){
		this.x += this.speedX;
		this.y += this.speedY;
		this.speedY += this.gravity;
		this.rotation += this.rotationSpeed;
		this.floor = this.canvas.height + this.floorOffset;

		//Bounce the book off the floor
		if(this.y >= this.floor){
			if(this.speedY > 0)
				this.speedY *= -0.75;
			this.rotationSpeed = this.speedX
		}


	}

	//DRAW BOOK
	//***********************************************************
	//DESCRIPTION------------------------------------------------
	//  Draws the book at its proper position and rotation on
	//the HTML5 canvas.
	this.draw = function(){

		this.ctx.save();
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(this.rotation * (Math.PI/180));
			this.ctx.drawImage(this.image, -this.image.width/2, -this.image.height/2);
		this.ctx.restore();

	}

}