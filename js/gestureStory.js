//********************************************************************
//The Gesture Story Class
//********************************************************************
//DESCRIPTION---------------------------------------------------------
//  This class is used to give a character object gestures as they
//progress through the world. It gives gestures based on where
//the character object is
//INPUT---------------------------------------------------------------
//character: A character object
//script: A JSON object with positions of the body parts to be changed
function GestureStory(character, gestureScript, gestures){

	this.character = character;

	//Save the original positions
	this.originalPositions = new Array();
	//Arms
	this.originalPositions.innerArm = [];
	this.originalPositions.innerArm.rotationOffset = this.character.innerArm.rotationOffset;
	this.originalPositions.innerArm.rotationRange = this.character.innerArm.rotationRange;
	this.originalPositions.innerArm.rotationSpeed = this.character.innerArm.rotationSpeed;
	this.originalPositions.outerArm = [];
	this.originalPositions.outerArm.rotationOffset = this.character.outerArm.rotationOffset;
	this.originalPositions.outerArm.rotationRange = this.character.outerArm.rotationRange;
	this.originalPositions.outerArm.rotationSpeed = this.character.outerArm.rotationSpeed;

	this.script = new Array();
	this.script = gestureScript.slice(0);

	this.curGestureIndex = null;
	this.nextGestureIndex = null;


	this.animate = function(){
		this.read();
		this.update();
	}


	//READ
	//*************************************************
	//DESCRIPTION--------------------------------------
	//  Read the script to get the index of the
	//gesture the character should be doing. If there
	//is no gesture, set nextGestureIndex to null.
	this.read = function(){
		this.nextGestureIndex = null;
		for(var i = 0; i < this.script.length; i++){
			if(this.script[i].startPos <= this.character.storyPos && this.character.storyPos <= this.script[i].endPos){
				this.nextGestureIndex = i;
				return;
			}
		}
	}


	//UPDATE
	//*******************************************
	//DESCRIPTION--------------------------------
	//  Check if the nextGestureIndex and the
	//curGestureIndex are different, if they are,
	//then check which gesture we need to perform
	//NOTE---------------------------------------
	//  This function is different than other
	//update functions.
	this.update = function(){
		if(this.curGestureIndex != this.nextGestureIndex){
			this.curGestureIndex = this.nextGestureIndex;
			if(this.nextGestureIndex == null){
				this.endGesture();
			} else {
				this.startGesture();
			}
		}
	}




	//END GESTURE
	//*****************************************
	//DESCRIPTION------------------------------
	//  Return the character positions to the
	//original values.
	this.endGesture = function(){
		this.character.gesture = false;

		//*******
		//Arms

		//Inner Arm
		this.character.innerArm.rotationOffset = this.originalPositions.innerArm.rotationOffset;
		this.character.innerArm.rotationRange = this.originalPositions.innerArm.rotationRange;
		this.character.innerArm.rotationSpeed = this.originalPositions.innerArm.rotationSpeed;
		//Outer Arm
		this.character.outerArm.rotationOffset = this.originalPositions.outerArm.rotationOffset;
		this.character.outerArm.rotationRange = this.originalPositions.outerArm.rotationRange;
		this.character.outerArm.rotationSpeed = this.originalPositions.outerArm.rotationSpeed;

	}



	//START GESTURE*******************************
	//DESCRIPTION---------------------------------
	//  Give the character's body parts new
	//positions based on the current gesture
	this.startGesture = function(){
		this.character.gesture = true;
		this.curGesture = gestures[gestureScript[this.curGestureIndex].gestureName];
		//*******
		//Arms

		//Inner Arm
		if(this.curGesture.innerArm){
			if(typeof this.curGesture.innerArm.rotationOffset !== 'undefined')
				this.character.innerArm.rotationOffset = this.curGesture.innerArm.rotationOffset;
			if(typeof this.curGesture.innerArm.rotationRange !== 'undefined')
				this.character.innerArm.rotationRange = this.curGesture.innerArm.rotationRange;
			if(typeof this.curGesture.innerArm.rotationSpeed !== 'undefined')
				this.character.innerArm.rotationSpeed = this.curGesture.innerArm.rotationSpeed;
		}
		//Outer Arm
		if(this.curGesture.outerArm){
			if(typeof this.curGesture.outerArm.rotationOffset !== 'undefined')
				this.character.outerArm.rotationOffset = this.curGesture.outerArm.rotationOffset;
			if(typeof this.curGesture.outerArm.rotationRange !== 'undefined')
				this.character.outerArm.rotationRange = this.curGesture.outerArm.rotationRange;
			if(typeof this.curGesture.outerArm.rotationSpeed !== 'undefined')
				this.character.outerArm.rotationSpeed = this.curGesture.outerArm.rotationSpeed;
		}

	}

}