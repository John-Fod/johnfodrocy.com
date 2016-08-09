//********************************************************************
//The Experience Particles Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is a single particle burst on the canvas
//INPUT---------------------------------------------------------------
//x: The starting x position of the message
//y: The starting y position of the message
//xp: The amount of xp that the particles are worth
//canvas: The canvas element the message will be drawn on
function ExperienceParticles(x, y, xp, canvas){
	var particleCount = xp/5; //The number of particles
	var maxSize = 8;
	var minSize = 3;
	var maxForce = 15.5;
	var minForce = 0.8;
	var experience = xp/particleCount;
	var chargedParticleColor = "rgba(126, 82, 150, 1)";
	var unchargedParticleColor = "rgba(126, 82, 150, 0.5)";

	//Setup the canvas
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.particles = [];
	for(i = 0; i < particleCount; i++){
		var newParticle = {
			xp : experience,
			size : (Math.random() * (maxSize - minSize)) + minSize,
			forceX : (Math.random() * (maxForce - minForce)) * 2 - maxForce - minForce,
			forceY : (Math.random() * (maxForce - minForce)) * 2 - maxForce - minForce,
			x : x,
			y : y,
			gravityX : 0.02,
			gravityY : 0.02,
			charged : true,
			color : baseColor
		}
		this.particles.push(newParticle);
	}



	//UPDATE
	//*********************************************
	//DESCRIPTION----------------------------------
	//  This updates the position of each particle.
	//It also removes any particles that have
	//entered the 'catch box' and adds their xp to
	//the character
	//INPUT----------------------------------------
	//character: A Character object who will
	//receive xp when the particles enter the catch
	//box.
	//NOTE-----------------------------------------
	//This function removes individual particles
	//from the Experience Particles object, it
	//does not remove the object itself. That
	//should be done elsewhere.
	this.update = function(character){
		var catchBoxSize = 50;
		var gravity = 0.09;
		var bounceMod = 0.7;
		for(i = 0; i < this.particles.length; i++){
			this.particles[i].x += this.particles[i].forceX;
			this.particles[i].y += this.particles[i].forceY;
			this.particles[i].forceX -= this.particles[i].gravityX;
			this.particles[i].forceY -= this.particles[i].gravityY;
			if(this.particles[i].charged == true){
				//Bounce the particles if they hit the wall
				if(this.particles[i].x <= 0)
					this.particles[i].forceX *= -bounceMod;
				if(this.particles[i].y <= 0)
					this.particles[i].forceY *= -bounceMod;
				this.particles[i].gravityX *= 1.015;
				this.particles[i].gravityY *= 1.015;
				//If a particle is in the catch box, remove it
				if(this.particles[i].x <= catchBoxSize && this.particles[i].y <= catchBoxSize){
					character.xp += this.particles[i].xp;
					this.particles[i].gravityX = 0;
					this.particles[i].gravityY = -0.09;
					this.particles[i].charged = false;
					this.particles[i].color = baseColor.getTransparentRGBA(0.2);
				}
			} else {
				if(this.particles[i].y > this.canvas.size){
					this.particles.splice(i,1);
				}
			}
		}
	}



	//DRAW
	//********************************************
	//DESCRIPTION---------------------------------
	//  This draws each particle on the canvas.
	this.draw = function(){

		for(i = 0; i < this.particles.length; i++){
			this.ctx.save();
			this.ctx.fillStyle = this.particles[i].color;
			this.ctx.beginPath();
			this.ctx.fillRect(
				this.particles[i].x - this.particles[i].size / 2,
				this.particles[i].y - this.particles[i].size / 2,
				this.particles[i].size,
				this.particles[i].size
			)
			this.ctx.fill();
			this.ctx.restore();
		}
	}




}