var studentCharacterPositions = {
	goingLeft : true,
	pos : 0,
	storyPos : 0,
	x : 1000,
	y : 365,
	originalX : 1000,
	originalY : 365,
	baseY : -115,
	swayRangeX : 0,
	swayRangeY : 10,
	swaySpeedX : 0,
	swaySpeedY : 3,

	armRotationRange : 65,
	armRotationSpeed : 6,
	armRotationOffset : 0,
	armSetupSpeed : 5,

	legRotationRange : 55,
	legRotationSpeed : 5,

	head : {
		offsetX : 0,
		offsetY : -70,
		bobbleRangeX : 15,
		bobbleRangeY : 7,
		bobbleSpeedX : 0.3,
		bobbleSpeedY : 0.3,
		rotationRange : 35,
		rotationSpeed : 2
	},
	innerEye : {
		offsetX : 22,
		offsetY : 0
	},
	outerEye : {
		offsetX : -22,
		offsetY : 0
	},
	innerArm : {
		offsetX : -15,
		offsetY : 5,
		axisX : 0,
		axisY : 0
	},
	outerArm : {
		offsetX : 5,
		offsetY : 5,
		axisX : 0,
		axisY : 0
	},
	innerLeg : {
		offsetX : 7,
		offsetY : 45,
		axisX : 0,
		axisY : 0
	},
	outerLeg : {
		offsetX : 23,
		offsetY : 45,
		axisX : 0,
		axisY : 0
	}

};


var studentDialogue = [
	{
		startPos : -650,
		endPos : -300,
		text : "Hello, John Sensei!"
	}
];