//globals
var wins = 0;
var losses = 0;
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
};

//The Game
var hangmanGame = {
	lives: 6,
	wordBank: ["PLUMBUS","SQUANCH", "BIRDPERSON", " MR MEESEEKS", "PRINCIPAL VAGINA", "SCARY TERRY", "GET SCHWIFTY", "WUBBA LUBBA DUB DUB", "GAZORPAZORP", "BLIPS AND CHITZ", "ANTS IN MY EYES JOHNSON", "LIL BITS","MR POOPYBUTTHOLE", "STEALY", "SNOWBALL", "RICK", "MORTY", "SUMMER", "JERRY", "BETH", "TINY RICK", "TINYVERSE", "MINIVERSE", "MICROVERSE"],
	target: "",
	shadow: [],
	targetLength: 0,
	shadowLength: 0,
	letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	userGuess: "",
	userGuesses: [],
	gameOver: false,

	//initialize properties of game
	init: function(){
		this.lives = 6;
		this.target = this.wordSelect();
		this.shadow = this.initShadow();
		this.shadowLength = this.wordLength();
		this.userGuess = "";
		this.userGuesses = [];
		this.gameOver = false;

		this.printShadow();
		this.addButtons();
		this.printStats();
		// this.playMusic("assets/sounds/rickMortyTrapRemix.mp3");
	},

	//try a letter
	attemptGuess: function() {
		console.log("tried");
		if(this.gameOver==false){
			//check if userGuess has been attempted
			if(!this.checkIfAttempted()){
				console.log(this.userGuesses);
				if(this.checkIfContains()){
					this.updateShadow();
					this.printShadow();
				}else{
					this.lives--;
					this.printStats();
				}
				this.endGame(function() {
					hangmanGame.restartGame();
				});
			}
		}
	},
	//generate computer target word from wordbank
	wordSelect: function() {
		var index=Math.floor(Math.random()*this.wordBank.length);
		return this.wordBank[index];
	},
	//calculate word length with no spaces
	wordLength: function(){
		var counter=0;
		for(var i=0;i<this.target.length;i++){
			if(this.target[i] != ' '){
				counter++;
			}
		}
		console.log(counter);
		return counter;
	},
	//check if userGuess has already been tried
	checkIfAttempted: function(){
		//push to userGuesses if not
		if(this.userGuesses.indexOf(this.userGuess) != -1){
			return true;
		}else{
			this.userGuesses.push(this.userGuess);
			return false;
		}
	},
	//check if target contains userGuess
	checkIfContains: function(){
		for(var i=0;i<this.target.length;i++){
			if(this.target[i] === this.userGuess){
				return true;
			}
		}
		return false;
	}, 
	//initialize shadow of target word 
	initShadow: function() {
		var shadow = [];
		for(var i=0;i<this.target.length;i++){
			if(this.target[i]!=" "){
				shadow.push("_ ");
			}
			else{
				shadow.push("&emsp;");
			}
		}
		console.log(shadow);
		return shadow;
	},
	//update Shadow if guessed correctly
	updateShadow: function() {
		console.log(this.userGuess);
		for(var i=0;i<this.target.length;i++){
			if(this.target[i] === this.userGuess){
				this.shadow[i] = this.userGuess + " ";
				this.shadowLength--;
			}
		}
	},

	printShadow: function() {
		document.getElementById("wordGuess").innerHTML = "";
		console.log(this.shadow);
		for(var i=0;i<this.shadow.length;i++){
			document.getElementById("wordGuess").innerHTML+=this.shadow[i];
		}
	},
	//print lives-wins-losses
	printStats: function() {
		document.getElementById("lives-wins-losses").innerHTML = ("wins: " + wins + "&emsp; losses: " + losses + "&emsp; lives: " + this.lives); 
	},
	//print target at end of game
	printTarget: function() {
		document.getElementById("wordGuess").innerHTML = "";
		for(var i=0;i<this.target.length;i++){
			document.getElementById("wordGuess").innerHTML += this.target[i];
		}
	},
	//end game sequence for win/loss
	endGame: function(callback){
		if(this.lives === 0 || this.shadowLength === 0){
			if(this.lives===0){
				losses++;
				this.printTarget();
			}else{
				wins++;
			}
			this.printStats();
			this.gameOver = true;
			callback();
		}
	},
	//begin game again if gameOver
	restartGame: function() {
		// if(confirm("Play Again?")){
			document.getElementById("wordGuess").innerHTML = "";
			document.getElementById("letterBank").innerHTML = "";
			this.init();
		// }
	},
	//play background audio
	// playMusic: function(music) {
	// 	var audio = new Audio(music);
	// 	audio.play();
	// },
	//play losing clip or some winning clip
	// changeClips: function() {

	// },
	//actions when letter is selected
	letterClick: function(letter) {
		console.log(letter);
		this.userGuess = letter;
		document.getElementById(this.userGuess).setAttribute("class","now-disabled");
		this.attemptGuess();
	},
	//populate letter buttons
	addButtons: function() {
		for(var i=0;i<this.letters.length;i++){
			var letterBtn = document.createElement("button");
			letterBtn.setAttribute("class", "letter");
			letterBtn.setAttribute("id",this.letters[i]);
			var char = hangmanGame.letters[i];
			letterBtn.onclick = function(i){ hangmanGame.letterClick(this.getAttribute("id"));};
			letterBtn.innerHTML=this.letters[i];
			var ltrbnk = document.getElementById("letterBank"); 
			ltrbnk.appendChild(letterBtn);
		}
	}
}

window.onload = function(event){
	hangmanGame.init();
	console.log(hangmanGame.target);
	// document.getElementByClassName("letter").on("click",function(){
	// 	hangmanGame.letterClick(this.getAttribute("id"));
	// });
	document.onkeyup = function(pressEvent){
		var guess = pressEvent.key.toUpperCase();
		console.log(guess);
		if(isLetter(guess)){
			hangmanGame.userGuess = guess;
			document.getElementById(guess).setAttribute("class","now-disabled");
			hangmanGame.attemptGuess();
		}
	}
}