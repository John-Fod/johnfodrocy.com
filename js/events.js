//************************************************************
//**  EVENTS
//**    This file holds code for specific events that are to
//**  be used in the event story. Because of the nature of
//**  events as all unique, events aren't a class, but just
//**  a group of individual functions.
//**    This file also holds the mainCharacterEvents array,
//**  which is the array used to hold the events of the
//**  main character.


//**********************************************
//LOAD ANY ITEMS THAT NEED TO BE USED


//Ninja
var ninja = new Character(document.getElementById("story"));
ninja.loadCharacter(ninjaCharacterPositions, 'images/animation/character/ninja');


//Student
var student = new Character(document.getElementById("story"));
student.loadCharacter(studentCharacterPositions, 'images/animation/character/student');

//Books
var HTMLBook = new Book(30, document.getElementById("story"));
HTMLBook.image = new Image();
HTMLBook.image.src = "images/animation/objects/books/html-book.png";
var PHPBook = new Book(30, document.getElementById("story"));
PHPBook.image = new Image();
PHPBook.image.src = "images/animation/objects/books/php-book.png";
var JQueryBook = new Book(30, document.getElementById("story"));
JQueryBook.image = new Image();
JQueryBook.image.src = "images/animation/objects/books/jquery-book.png";
var RSpecBook = new Book(30, document.getElementById("story"));
RSpecBook.image = new Image();
RSpecBook.image.src = "images/animation/objects/books/rspec-book.png";





//Character Running Events
var runningNinja = function() {characterRunning(ninja, 6)};
var runningNinjaReset = function() {characterReset(ninja, 6)};

var runningStudent = function() {characterRunning(student, -2)};
var runningStudentReset = function() {characterReset(student, -2)};

//Rolling Books
var HTMLBookRolling = function() {bookRolling(HTMLBook)};
var HTMLBookRollingReset = function() {bookReset(HTMLBook)};

var PHPBookRolling = function() {bookRolling(PHPBook)};
var PHPBookRollingReset = function() {bookReset(PHPBook)};

var JQueryBookRolling = function() {bookRolling(JQueryBook)};
var JQueryBookRollingReset = function() {bookReset(JQueryBook)};

var RSpecBookRolling = function() {bookRolling(RSpecBook)};
var RSpecBookRollingReset = function() {bookReset(RSpecBook)};





//Make the main character event story script
var mainCharacterEvents = [
	{
		startPos : 2500,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : runningNinja,
		reset : runningNinjaReset
	},
	{
		startPos : 4000,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : runningStudent,
		reset : runningStudentReset
	},
	{
		startPos : 8200,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : HTMLBookRolling,
		reset : HTMLBookRollingReset
	},
	{
		startPos : 8400,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : PHPBookRolling,
		reset : PHPBookRollingReset
	},
	{
		startPos : 8600,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : JQueryBookRolling,
		reset : JQueryBookRollingReset
	},
	{
		startPos : 8800,
		startTime : null,
		endTime : null,
		length : 20000,
		animation : RSpecBookRolling,
		reset : RSpecBookRollingReset
	}
];







//************************************************
//MAKE THE ACTUAL FUNCTIONS FOR INDIVIDUAL EVENTS
//************************************************


//CHARACTER RUNNING
//******************************************************
//DESCRIPTION-------------------------------------------
//  A pre-loaded character runs accross the canvas.
//INPUT-------------------------------------------------
//  character: A Character object that will run.
//  runSpeed: The speed of the character to run.
function characterRunning(character, runSpeed){
	var animate = true;

	if((character.x < -200) || (character.x > character.canvas.width + 200)){
		animate = false;
	}
	
	if(animate)
		character.animate(null, char.head, runSpeed, 0);
}


//CHARACTER RUNNING RESET
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Puts the character back in position after it has run
//so that the event can be experienced again by the user.
//INPUT--------------------------------------------------
//  character: A Character object that will run.
//  runSpeed: The speed of the character to run.
function characterReset(character, runSpeed){
	var movingLeft = false
	if(runSpeed < 0)
		movingLeft = true
	character.reset(movingLeft);
}


//BOOK ROLLING
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Makes a book roll accross the screen.
//INPUT--------------------------------------------------
//  book: A Book object.
function bookRolling(book){
	var animate = true;
	if(book.x < -200)
		animate = false

	if(animate == true)
		book.animate();
}


//BOOK ROLLING RESET
//*******************************************************
//DESCRIPTION--------------------------------------------
//  Resets the position of a Book object so that the user
//can experience the amazing event multiple times.
//INPUT--------------------------------------------------
//  book: A Book object.
function bookReset(book){
	book.reset();
}
