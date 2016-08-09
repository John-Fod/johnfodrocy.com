var mainCharacterPositions = {
	pos : 0,
	x : 260,
	y : 345,
	baseY : -125,
	swayRangeX : 30,
	swayRangeY : 10,
	swaySpeedX : 0.1,
	swaySpeedY : 0.01,

	armRotationRange : 45,
	armRotationSpeed : 0.7,
	armRotationOffset : 0,
	armSetupSpeed : 5,

	legRotationRange : 25,
	legRotationSpeed : -0.7,

	head : {
		offsetX : 0,
		offsetY : -85,
		bobbleRangeX : 15,
		bobbleRangeY : 5,
		bobbleSpeedX : 0.1,
		bobbleSpeedY : 0.1,
		rotationRange : 25,
		rotationSpeed : 0.6
	},
	innerEye : {
		offsetX : 25,
		offsetY : 0
	},
	outerEye : {
		offsetX : -25,
		offsetY : 0
	},
	innerArm : {
		offsetX : 10,
		offsetY : -2,
		axisX : 0,
		axisY : 0
	},
	outerArm : {
		offsetX : -20,
		offsetY : -2,
		axisX : 0,
		axisY : 0
	},
	innerLeg : {
		offsetX : 25,
		offsetY : 50,
		axisX : 0,
		axisY : 0
	},
	outerLeg : {
		offsetX : 10,
		offsetY : 50,
		axisX : 0,
		axisY : 0
	}

}


var mainCharacterGesture = [
	{
		startPos : 0,
		endPos : 600,
		gestureName : "wave"
	},
	{
		startPos : 1200,
		endPos : 1700,
		gestureName : "pointForward"
	},
	{
		startPos : 2100,
		endPos : 4000,
		gestureName : "lookAround"
	},
	{
		startPos : 11500,
		endPos : 14000,
		gestureName : "victory"
	}
]


//******************************************************
//Array for the word bubble with start and end positions
var mainCharacterDialogue = [
	{
		startPos : 500,
		endPos : 900,
		text : "Hi, my name is John. Thanks for checking out my web page."
	},
	{
		startPos : 1000,
		endPos : 1600,
		text : "I made this page to introduce myself, tell you about some of my projects and have fun."
	},
	{
		startPos : 2100,
		endPos : 2600,
		text : "This is where I live, Japan. I love it here. The food, people, culture and history make it a great place to live."
	},
	{
		startPos : 3200,
		endPos : 3700,
		text : "I've lived here for over seven years and really love it."
	},
	{
		startPos : 4450,
		endPos : 5500,
		text : "I've taught English to people of all ages and backgrounds. I got to meet some really cool people and learn a lot about Japan."
	},
	{
		startPos : 7000,
		endPos : 7650,
		text : "I've taught English to people of all ages and backgrounds. I got to meet some really cool people and learn a lot about Japan."
	},
	{
		startPos : 8500,
		endPos : 9200,
		text : "But after a few years of teaching I got restless and wanted a new challenge, something that could help me create. That's why I took up programming."
	},
	{
		startPos : 10300,
		endPos : 11000,
		text : "I started with the basics, HTML, CSS and Javascript. Then I moved on to PHP and object oriented programming."
	},
	{
		startPos : 15000,
		endPos : 20000,
		text : "That's the Michigan State Capital building. I worked in the Michigan State Senate while I was going to college for my International Relations degree."
	}
];


//**********************************************
//Array for the experience of the main character
var mainCharacterExperience = [
	{
		storyPos : 1000,
		xp : 25,
		role : "Ruby on Rails Developer",
		skills : [
			"Ruby & Rails",
			"JavaScript/jQuery",
			"HTML5",
			"CSS/SCSS",
			"Git",
			"Heroku",
			"AWS",
			"rSpec",
			"Cucumber"
		]
	},
	{
		storyPos : 1100,
		xp : 25,
		role : "PHP Developer",
		skills : [
			"PHP",
			"JavaScript/jQuery",
			"SQL",
			"HTML5",
			"CSS/SCSS",
			"Git"
		]
	},
	{
		storyPos : 1200,
		xp : 25,
		role : "Front End Developer",
		skills : [
			"JavaScript/jQuery",
			"HTML5",
			"CSS/SCSS"
		]
	},
	{
		storyPos : 1300,
		xp : 100,
		role : "Amateur Developer",
		traits : [
			"Independent",
			"Creative",
			"Motivated"
		],
		skills : [
			"Ruby & Rails",
			"PHP",
			"JavaScript/jQuery",
			"SQL",
			"HTML5",
			"CSS/SCSS",
			"Git",
			"Python",
			"GAE"
		]
	},
	{
		storyPos : 2650,
		xp : 70,
		role : "Foreigner",
		traits : [
			"Adaptable",
			"Independent"
		],
		skills : []
	},
	{
		storyPos : 5100,
		xp : 240,
		role : "Teacher",
		traits : [
			"Communicator",
			"Professional"
		],
		skills : []
	},
	{
		storyPos : 8500,
		xp : 250,
		role : "Amateur Developer",
		traits : [
			"Motivated"
		],
		skills : [
			"HTML & CSS",
			"JavaScript/jQuery",
			"PHP",
			"SQL"
		]
	},
	{
		storyPos : 10000,
		xp : 350,
		role : "Student",
		traits : [
			"Motivated",
			"Independent",
			"Computer Scientist"
		],
		skills : [
			"JavaScript/jQuery",
			"PHP",
			"C",
			"C&plus;&plus;",
			"Python",
			"HTML5",
			"CSS/SCSS"
		]
	},
	{
		storyPos : 15000,
		xp : 350,
		role : "Intern",
		traits : [
			"Porfessional"
		],
		skills : [
		]
	}
];


var mainCharacterHeadwear = [
	{
		startPos : 1500,
		endPos : 4000,
		headwearFile : "JapanHeadband.png",
		headwearOffsetX : -10,
		headwearOffsetY : -5
	},
	{
		startPos : 11500,
		endPos : 15000,
		headwearFile : 'OSUGraduationCap.png',
		headwearOffsetX : 0,
		headwearOffsetY : -20
	}
];