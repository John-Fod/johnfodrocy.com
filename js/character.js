const DEBUG = false;

//*************************************************************
//The Character Class
//*************************************************************
//**DESCRIPTION----------------------------------------------
//**  This is a character that will appear on screen. It
//**will move its arms and legs and has a bobble head
//**effect.
//**INPUT----------------------------------------------------
//**canvas: A canvas element the character will be drawn on
//**NOTE-----------------------------------------------------
//**  The character must be loaded with the load character
//**function after it is created.
function Character(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.animationFolderPath = null;

	//Info about the character
	this.xp = 0;
	
	//The different parts of animation
	this.torso = [];
	this.head = [];
	this.innerEye = [];
	this.outerEye = [];
	this.innerArm = [];
	this.outerArm = [];
	this.innerLeg = [];
	this.outerLeg = [];

	//The position of the character
	this.gesture = false;
	this.storyPos = 0;
	this.x = 0;
	this.y = 0;
	this.originalX = 0;
	this.originalY = 0;
	this.moveSpeedX = 0;
	this.moveSpeedY = 0;
	this.momentumX = 0;
	this.momentumY = 0;
	this.momentumDegradation = 0.99;
	this.momentumMax = 500;
	this.swayX = 0;
	this.swayY = 0;
	this.swayRangeX = 0;
	this.swayRangeY = 0;
	this.swaySpeedX = 0;
	this.swaySpeedY = 0;

	//Basic stats of the character
	this.armRotationRange = 45;
	this.armRotationSpeed = 0.7;
	this.armRotationOffset = 0;
	this.armSetupSpeed = 5;
	//Torso
	this.torso = {
		x : this.x,
		y : this.y
	};
	//Head
	this.head = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		bobbleX : 0,
		bobbleY : 0,
		bobbleRangeX : 0,
		bobbleRangeY : 0,
		bobbleSpeedX : 0,
		bobbleSpeedY : 0,
		rotation : 0,
		rotationRange : 0,
		rotationSpeed : 0,
		axisX : 0,
		axisY : 0
	};
	//Eyes
	this.innerEye = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		rotation : 0
	};
	this.outerEye = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		rotation : 0
	};
	//Arms
	this.innerArm = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		axisX : 0,
		axisY : 0,
		rotation : 0,
		rotationOffset : 0,
		rotationRange : 0,
		rotationSpeed : 0,
		setupSpeed : 0
	};
	this.outerArm = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		axisX : 0,
		axisY : 0,
		rotation : 0,
		rotationOffset : 0,
		rotationRange : 0,
		rotationSpeed : 0,
		setupSpeed : 0
	};
	//Legs
	this.innerLeg = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		axisX : 0,
		axisY : 0,
		rotation : 0,
		rotationRange : 0,
		rotationSpeed : 0
	};
	this.outerLeg = {
		offsetX : 0,
		offsetY : 0,
		x : 0,
		y : 0,
		axisX : 0,
		axisY : 0,
		rotation : 0,
		rotationRange : 0,
		rotationSpeed : 0
	};


	//ANIMATE CHARACTER
	//*********************************************************
	//DESCRIPTION----------------------------------------------
	//  This function combines the update and draw functions
	//so it both draws and moves the character
	//INPUT----------------------------------------------------
	//storyPos: The position in the story of the character
	//eyeFocus: Where the character will be looking
	//movementX: The amount the character will move horizontally
	//movementY: The amount the character will move vertically
	this.animate = function(storyPos, eyeFocus, movementX = null, movementY = null){
		this.update(storyPos, movementX, movementY);
		this.draw(eyeFocus);
	}

	this.reset = function(fromLeft = false){
		if(fromLeft == true){
			this.x = this.canvas.width + 200;
		} else {
			this.x = -200;
		}
	}



	//UPDATE CHARACTER
	//**********************************************************
	//DESCRIPTION-----------------------------------------------
	//  This function updates the position of the character
	//and its body parts
	//INPUT-----------------------------------------------------
	//storyPos: The position in the story of the character
	//movementX: The amount the character will move horizontally
	//movementY: The amount the character will move vertically
	this.update = function(storyPos = null, movementX = null, movementY = null){

		this.y = this.canvas.height + this.baseY;
		
		//Get the movement speed x of the character
		if(storyPos !== null){
			this.moveSpeedX = storyPos - this.storyPos;
		} else {
			this.moveSpeedX = movementX;
		}
		
		//Get the momentum of the character
		if(Math.abs(this.momentumX) <= this.momentumMax){
			this.momentumX = (this.momentumX + this.moveSpeedX) * this.momentumDegradation;
		} else {
			var sign = this.momentumX ? this.momentumX > 0 ? 1 : -1 : 0;
			this.momentumX = this.momentumMax * sign;
		}
		if(Math.abs(this.momentumX) < 1)
			this.momentumX = 0;

		//Actually move the character if they need to be moved
		if(movementX !== null)
			this.x += movementX;
		if(movementY !== null)
			this.y += movementY;

		//Update the story position of the character
		this.storyPos = storyPos;
		//Update the body parts of the character
		this.updateTorso();
		this.updateHead();
		this.updateArms();
		this.updateLegs();
	}


	//DRAW CHARACTER
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function draws the character on
	//the canvas. It does not update the character
	//INPUT------------------------------------------
	//eyeFocus: This is where the charcter's eyes
	//  will be looking when it is drawn
	//NOTE-------------------------------------------
	//  The eyeFocus argument must return integers
	//for eyeFocus.x and eyeFocus.y
	this.draw = function(eyeFocus){

		//Inner arm
		this.ctx.save();
			this.ctx.translate(this.innerArm.axisX, this.innerArm.axisY);
			this.ctx.rotate(this.innerArm.rotation * (Math.PI/180));
			this.ctx.drawImage(this.innerArm.image, -(this.innerArm.image.width/2), 0);
		this.ctx.restore();

		//Inner leg
		this.ctx.save();
			this.ctx.translate(this.innerLeg.axisX, this.innerLeg.axisY);
			this.ctx.rotate(this.innerLeg.rotation * (Math.PI/180));
			if(this.goingLeft){
				this.ctx.drawImage(this.innerLeg.image, -(this.innerLeg.image.width * 0.75), 0);
			} else {
				this.ctx.drawImage(this.innerLeg.image, -(this.innerLeg.image.width/4), 0);
			}
		this.ctx.restore();

		//Outer leg
		this.ctx.save();
			this.ctx.translate(this.outerLeg.axisX, this.outerLeg.axisY);
			this.ctx.rotate(this.outerLeg.rotation * (Math.PI/180));
			if(this.goingLeft){
				this.ctx.drawImage(this.outerLeg.image, -(this.outerLeg.image.width * 0.75), 0);
			} else {
				this.ctx.drawImage(this.outerLeg.image, -(this.outerLeg.image.width/4), 0);
			}
		this.ctx.restore();
	
		//Draw the torso around the xCenter and yCenter
		this.ctx.drawImage(this.torso.image, this.torso.drawX, this.torso.drawY);

		//Draw the head, along with the eyes
		this.drawHead(eyeFocus);

		//Outer arm
		this.ctx.save();
			this.ctx.translate(this.outerArm.axisX, this.outerArm.axisY);
			this.ctx.rotate(this.outerArm.rotation * (Math.PI/180));
			this.ctx.drawImage(this.outerArm.image, -(this.outerArm.image.width/2), 0);
		this.ctx.restore();

		if(DEBUG == true)
			this.drawDebug();
	};



	//DRAW HEAD
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function draws the character's head
	//INPUT------------------------------------------
	//eyeFocus: This is where the charcter's eyes
	//  will be looking when it is drawn
	//NOTE-------------------------------------------
	//  The other body parts are drawn in the draw()
	//function. The head requires more lines of code
	//so it was given its own function.
	this.drawHead = function(eyeFocus){
		var eyeRotation = -Math.atan2(
			(this.head.x - eyeFocus.x),
			(this.head.y - eyeFocus.y)
		);

		//Draw the head	//Draw the head
		this.ctx.save();
			
			this.ctx.translate(this.head.x, this.head.y);
			this.ctx.rotate(this.head.rotation * (Math.PI/180));
			
			//Outer Eye
			this.ctx.save();
				this.ctx.translate(this.innerEye.offsetX, this.innerEye.offsetY);
				this.ctx.rotate(eyeRotation - (90 + this.head.rotation) * Math.PI/180);
				this.ctx.drawImage(this.innerEye.image, -this.innerEye.image.width/2, -this.innerEye.image.height/2);
			this.ctx.restore();
			this.ctx.drawImage(this.innerEye.glare,
				this.innerEye.offsetX - this.innerEye.glare.width/2,
				this.innerEye.offsetY - this.innerEye.glare.height/2
			);

			//Outer Eye
			this.ctx.save();
				this.ctx.translate(this.outerEye.offsetX, this.outerEye.offsetY);
				this.ctx.rotate(eyeRotation - (90 + this.head.rotation) * Math.PI/180);
				this.ctx.drawImage(this.outerEye.image, -this.outerEye.image.width/2, -this.outerEye.image.height/2);
			this.ctx.restore();
			this.ctx.drawImage(this.outerEye.glare,
				this.outerEye.offsetX - this.outerEye.glare.width/2,
				this.outerEye.offsetY - this.outerEye.glare.height/2
			);
			this.ctx.drawImage(this.head.image, -this.head.image.width/2, -this.head.image.height/2);

		this.ctx.restore();
	};




	//DRAW DEBUG
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function draws some useful information
	//on the canvas.
	this.drawDebug = function(){
			
		//Points in the body
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rect(this.torso.x -2, this.torso.y -2, 4, 4);
		this.ctx.rect(this.head.x - 2, this.head.y - 2, 4, 4);
		this.ctx.fillStyle = "rgba(255,255,0,1)";
		this.ctx.fill();
		this.ctx.restore();
		
		//The points where the eyes are to be drawn
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rect(this.innerEye.x -2, this.innerEye.y -2, 4, 4);
		this.ctx.rect(this.outerEye.x - 2, this.outerEye.y - 2, 4, 4);
		this.ctx.fillStyle = "rgba(0,255,0,1)";
		this.ctx.fill();
		this.ctx.restore();

		//Axis of arm
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rect(this.innerArm.axisX - 2, this.innerArm.axisY - 2, 4, 4);
		this.ctx.rect(this.outerArm.axisX - 2, this.outerArm.axisY - 2, 4, 4);
		this.ctx.rect(this.innerLeg.axisX - 2, this.innerLeg.axisY - 2, 4, 4);
		this.ctx.rect(this.outerLeg.axisX - 2, this.outerLeg.axisY - 2, 4, 4);
		this.ctx.fillStyle = "rgba(255,0,255,1)";
		this.ctx.fill();
		this.ctx.restore();

		//Head info
		this.ctx.strokeStyle = "rgba(255,255,0,1)";
		this.ctx.beginPath();
		this.ctx.moveTo(-this.head.image.width/2, 0);
		this.ctx.lineTo(this.head.image.width/2, 0);
		this.ctx.moveTo(0, -this.head.image.width/2);
		this.ctx.lineTo(0, this.head.image.width/2);
		this.ctx.stroke();
		this.ctx.strokeStyle= "rbga(0,0,0,1)";

		//Text Info
		this.ctx.fillText("Torso: " + this.torso.x + "," + this.torso.y,10,40);
		this.ctx.fillText("Rotation: " + this.head.rotation, 10, 60);
	}



	//UPDATE TORSO
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function updates the variables relating
	//to the torso of the character.
	this.updateTorso = function(){
		var speedMod = 0.1;

		if(Math.abs(this.swayX) > this.swayRangeX)
			this.swaySpeedX *= -1;
		if(Math.abs(this.swayY) > this.swayRangeY)
			this.swaySpeedY *= -1;
		if(this.moveSpeedX){
			this.swayX += this.swaySpeedX * this.moveSpeedX * speedMod;
			this.swayY += this.swaySpeedY * this.moveSpeedX * speedMod;
		}

		this.torso.x = this.x + this.swayX;
		this.torso.y = this.y + this.swayY;
		this.torso.drawX = this.torso.x - this.torso.image.width/2;
		this.torso.drawY = this.torso.y - this.torso.image.height/2;
	}



	//UPDATE HEAD
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function updates the variables relating
	//to the head of the character.
	this.updateHead = function(){
		var momentumMod = 0.01;

		if(Math.abs(this.head.bobbleX) > this.head.bobbleRangeX){
			this.head.bobbleX = (this.head.bobbleX / Math.abs(this.head.bobbleX)) * this.head.bobbleRangeX;
			this.head.bobbleSpeedX *= -1;
		}
		if(Math.abs(this.head.bobbleY) > this.head.bobbleRangeY){
			this.head.bobbleY = (this.head.bobbleY / Math.abs(this.head.bobbleY)) * this.head.bobbleRangeY;
			this.head.bobbleSpeedY *= -1;
		}
		if(Math.abs(this.head.rotation) > this.head.rotationRange){
			this.head.rotation = (this.head.rotation / Math.abs(this.head.rotation)) * this.head.rotationRange;
			this.head.rotationSpeed *= -1;
		}
		this.head.bobbleX += this.head.bobbleSpeedX * this.momentumX * momentumMod;
		this.head.bobbleY += this.head.bobbleSpeedY * this.momentumX * momentumMod;
		this.head.rotation += this.head.rotationSpeed * this.momentumX * momentumMod;

		this.head.x = this.torso.x + this.head.offsetX + this.head.bobbleX;
		this.head.y = this.torso.y + this.head.offsetY + this.head.bobbleY;
		this.head.drawX = this.head.x - this.head.image.width/2;
		this.head.drawY = this.head.y - this.head.image.height/2;
	}



	//UPDATE ARMS
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function updates the variables relating
	//to the arms of the character.
	//NOTE-------------------------------------------
	//  This is a longer function because it must
	//support gestures the character is doing.
	this.updateArms = function(){
		var speedMod = 0.15;

		//****************
		//Update Inner Arm
		this.innerArm.x = this.torso.x + this.innerArm.offsetX;
		this.innerArm.y = this.torso.y + this.innerArm.offsetY;
		this.innerArm.axisX = this.innerArm.x + this.innerArm.image.width/2;
		this.innerArm.axisY = this.innerArm.y - this.innerArm.image.height/2;
		if (this.innerArm.rotation > this.innerArm.rotationOffset + this.innerArm.rotationRange){
			this.innerArm.rotation -= this.innerArm.setupSpeed;
			if(this.innerArm.rotationSpeed > 0){
				this.innerArm.rotationSpeed *= -1;
			}
		}
		if (this.innerArm.rotation < this.innerArm.rotationOffset - this.innerArm.rotationRange){
			this.innerArm.rotation += this.innerArm.setupSpeed;
			if(this.innerArm.rotationSpeed < 0){
				this.innerArm.rotationSpeed *= -1;
			}
		}
		if(this.gesture == true){
			this.innerArm.rotation += this.innerArm.rotationSpeed;
		} else if (this.moveSpeedX){
			this.innerArm.rotation += this.innerArm.rotationSpeed * Math.abs(this.moveSpeedX) * speedMod;
		}

		//****************
		//Update Outer Arm
		this.outerArm.x = this.torso.x + this.outerArm.offsetX;
		this.outerArm.y = this.torso.y + this.outerArm.offsetY;
		this.outerArm.axisX = this.outerArm.x + this.outerArm.image.width/2;
		this.outerArm.axisY = this.outerArm.y - this.outerArm.image.height/2;
		//Rotate the arm into position if it is ahead
		if (this.outerArm.rotation > this.outerArm.rotationOffset + this.outerArm.rotationRange){
			this.outerArm.rotation -= this.outerArm.setupSpeed;
			if(this.outerArm.rotationSpeed > 0){
				this.outerArm.rotationSpeed *= -1;
			}
		}
		//Rotate the arm into position if it is behind
		if (this.outerArm.rotation < this.outerArm.rotationOffset - this.outerArm.rotationRange){
			this.outerArm.rotation += this.outerArm.setupSpeed;
			if(this.outerArm.rotationSpeed < 0){
				this.outerArm.rotationSpeed *= -1;
			}
		}
		//If there is a gesture, move the arm even if the character isn't moving
		if(this.gesture == true){
			this.outerArm.rotation += this.outerArm.rotationSpeed;
		//If there is no gesture, then move the arms only when the character is walking
		} else if (this.moveSpeedX){
			this.outerArm.rotation += this.outerArm.rotationSpeed * Math.abs(this.moveSpeedX) * speedMod;
		}
		//***************************************************
		//If the arms are out of sync, speed up the outer arm
		if(Math.abs(this.outerArm.rotation + this.innerArm.rotation) > 10 && this.gesture == false)
			this.outerArm.rotation += this.outerArm.rotationSpeed * 2;
	};



	//UPDATE LEGS
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function updates the variables relating
	//to the legs of the character.
	this.updateLegs = function(){
		var speedMod = 0.25;

		//Inner Leg
		this.innerLeg.x = this.torso.x + this.innerLeg.offsetX;
		this.innerLeg.y = this.torso.y + this.innerLeg.offsetY;
		this.innerLeg.axisX = this.innerLeg.x - this.innerLeg.image.width/2;
		this.innerLeg.axisY = this.innerLeg.y - this.innerLeg.image.height/2;
		if (Math.abs(this.innerLeg.rotation) > this.innerLeg.rotationRange){
			this.innerLeg.rotation = (this.innerLeg.rotation / Math.abs(this.innerLeg.rotation)) * this.innerLeg.rotationRange;
			this.innerLeg.rotationSpeed *= -1;
		}
		if (this.moveSpeedX)
			this.innerLeg.rotation += this.innerLeg.rotationSpeed * Math.abs(this.moveSpeedX) * speedMod;

		//Outer Leg
		this.outerLeg.x = this.torso.x + this.outerLeg.offsetX;
		this.outerLeg.y = this.torso.y + this.outerLeg.offsetY;
		this.outerLeg.axisX = this.outerLeg.x - this.outerLeg.image.width/2;
		this.outerLeg.axisY = this.outerLeg.y - this.outerLeg.image.height/2;
		if (Math.abs(this.outerLeg.rotation) > this.outerLeg.rotationRange){
			this.outerLeg.rotation = (this.outerLeg.rotation / Math.abs(this.outerLeg.rotation)) * this.outerLeg.rotationRange;
			this.outerLeg.rotationSpeed *= -1;
		}
		if (this.moveSpeedX)
			this.outerLeg.rotation += this.outerLeg.rotationSpeed * Math.abs(this.moveSpeedX) * speedMod;
	};












	//LOAD CHARACTER
	//***********************************************
	//DESCRIPTON-------------------------------------
	//  This function loads the initial information
	//of the character. This includes the movement
	//parameters of the character and the artwork.
	//INPUT-------------------------------------------
	//positions: A JSON object containing the
	//  the positions and parameters of the body
	//  parts of the character
	//imagesPath: A path to the folder that holds the
	//  images used in the character. The images must
	//  conform to the naming conventions below.
	//FILES NEEDED------------------------------------
	//   torso.png        head.png         eye.png
	//   glare.png        arm.png          leg.png
	//NOTE--------------------------------------------
	//  This function also initializes several
	//varaibles based on those passed in the positions
	//argument.
	this.loadCharacter = function(positions, imagesPath){
		this.animationFolderPath = imagesPath;
		//**********************************
		//Set up the files for the animation

		//Torso
		this.torso.image = new Image();
		this.torso.image.src = this.animationFolderPath + "/torso.png";

		//Head
		this.head.image = new Image();
		this.head.image.src = this.animationFolderPath + "/head.png";

		this.innerEye.image = new Image();
		this.innerEye.image.src = this.animationFolderPath + "/eye.png";
		this.innerEye.glare = new Image();
		this.innerEye.glare.src = this.animationFolderPath + "/glare.png";
		this.outerEye.image = new Image();
		this.outerEye.image.src = this.animationFolderPath + "/eye.png";
		this.outerEye.glare = new Image();
		this.outerEye.glare.src = this.animationFolderPath + "/glare.png";

		//Arms
		this.innerArm.image = new Image();
		this.innerArm.image.src = this.animationFolderPath + "/arm.png";
		this.outerArm.image = new Image();
		this.outerArm.image.src = this.animationFolderPath + "/arm.png";

		//Legs
		this.innerLeg.image = new Image();
		this.innerLeg.image.src = this.animationFolderPath + "/leg.png";
		this.outerLeg.image = new Image();
		this.outerLeg.image.src = this.animationFolderPath + "/leg.png";

		//********
		//Position
		this.goingLeft = positions.goingLeft;
		this.x = positions.x;
		this.y = positions.y;
		this.baseY = positions.baseY;
		this.pos = positions.pos;
		this.swayRangeX = positions.swayRangeX;
		this.swayRangeY = positions.swayRangeY;
		this.swaySpeedX = positions.swaySpeedX;
		this.swaySpeedY = positions.swaySpeedY;

		this.armRotationRange = positions.armRotationRange;
		this.armRotationSpeed = positions.armRotationSpeed;
		this.armRotationOffset = positions.armRotationOffset;
		this.armSetupSpeed = positions.armSetupSpeed;

		//****
		//Head
		this.head.offsetX = positions.head.offsetX;
		this.head.offsetY = positions.head.offsetY;
		this.head.x = this.torso.x + this.head.offsetX;
		this.head.y = this.torso.y + this.head.offsetY;
		this.head.bobbleRangeX = positions.head.bobbleRangeX;
		this.head.bobbleRangeY = positions.head.bobbleRangeY;
		this.head.bobbleSpeedX = positions.head.bobbleSpeedX;
		this.head.bobbleSpeedY = positions.head.bobbleSpeedY;
		this.head.rotationRange = positions.head.rotationRange;
		this.head.rotationSpeed = positions.head.rotationSpeed;

		//****
		//Eyes

		//Inner
		this.innerEye.offsetX = positions.innerEye.offsetX;
		this.innerEye.offsetY = positions.innerEye.offsetY;
		this.innerEye.x = this.head.x + this.innerEye.offsetX;
		this.innerEye.y = this.head.y + this.innerEye.offsetY;
		//Outer
		this.outerEye.offsetX = positions.outerEye.offsetX;
		this.outerEye.offsetY = positions.outerEye.offsetY;
		this.outerEye.x = this.head.x + this.outerEye.offsetX;
		this.outerEye.y = this.head.y + this.outerEye.offsetY;

		//****
		//Arms

		//Inner
		this.innerArm.offsetX = positions.innerArm.offsetX;
		this.innerArm.offsetY = positions.innerArm.offsetY;
		this.innerArm.x = this.torso.x + this.innerArm.offsetX;
		this.innerArm.y = this.torso.y + this.innerArm.offsetY;
		this.innerArm.axisX = positions.innerArm.axisX;
		this.innerArm.axisY = positions.innerArm.axisY;
		this.innerArm.rotationOffset = this.armRotationOffset;
		this.innerArm.rotationRange = this.armRotationRange;
		this.innerArm.rotationSpeed = this.armRotationSpeed;
		this.innerArm.setupSpeed = this.armSetupSpeed;

		//Outer
		this.outerArm.offsetX = positions.outerArm.offsetX;
		this.outerArm.offsetY = positions.outerArm.offsetY;
		this.outerArm.x = this.torso.x + this.outerArm.offsetX;
		this.outerArm.y = this.torso.y + this.outerArm.offsetY;
		this.outerArm.axisX = positions.outerArm.axisX;
		this.outerArm.axisY = positions.outerArm.axisY;
		this.outerArm.rotationOffset = this.armRotationOffset;
		this.outerArm.rotationRange = this.armRotationRange;
		this.outerArm.rotationSpeed = this.armRotationSpeed;
		this.outerArm.setupSpeed = this.armSetupSpeed;


		//*******
		//Legs

		//Inner
		this.innerLeg.offsetX = positions.innerLeg.offsetX;
		this.innerLeg.offsetY = positions.innerLeg.offsetY;
		this.innerLeg.axisX = positions.innerLeg.axisX;
		this.innerLeg.axisY = positions.innerLeg.axisY;
		this.innerLeg.rotationRange = positions.legRotationRange;
		this.innerLeg.rotationSpeed = positions.legRotationSpeed;
		this.innerLeg.x = this.torso.x + this.innerLeg.offsetX;
		this.innerLeg.y = this.torso.y + this.innerLeg.offsetY;

		//Outer
		this.outerLeg.offsetX = positions.outerLeg.offsetX;
		this.outerLeg.offsetY = positions.outerLeg.offsetY;
		this.outerLeg.axisX = positions.outerLeg.axisX;
		this.outerLeg.axisY = positions.outerLeg.axisY;
		this.outerLeg.rotationRange = positions.legRotationRange;
		this.outerLeg.rotationSpeed = -positions.legRotationSpeed;
		this.outerLeg.x = this.torso.x + this.outerLeg.offsetX;
		this.outerLeg.y = this.torso.y + this.outerLeg.offsetY;
	}


}