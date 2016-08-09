//**********************************************
//LOAD ANY CHARACTERS THAT NEED TO BE USED


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








//Make the actual functions for indivudual events
function characterRunning(character, runSpeed){
	var animate = true;

	if((character.x < -200) || (character.x > character.canvas.width + 200)){
		animate = false;
	}
	
	if(animate)
		character.animate(null, char.head, runSpeed, 0);
}

function characterReset(character, runSpeed){
	var movingLeft = false
	if(runSpeed < 0)
		movingLeft = true
	character.reset(movingLeft);
}

function bookRolling(book){
	var animate = true;
	if(book.x < -200)
		animate = false

	if(animate == true)
		book.animate();
}

function bookReset(book){
	book.reset();
}
