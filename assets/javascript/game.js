//globals
var wins = 0;
var losses = 0;

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
		if(this.gameOver==false){
			//check if userGuess has been attempted
			if(!this.checkIfAttempted()){
				if(this.checkIfContains){
					this.updateShadow();
					this.printShadow();
					if(this.shadowLength===0){
						this.gameOver = true;
						wins++;
						this.restartGame();
					}
				}else{
					this.lives--;
					if(this.lives == 0){
						this.gameOver = true;
						losses++;
						this.restartGame();
					}
				}
			}
		}
	},
	//generate computer target word from wordbank
	wordSelect: function() {
		var index=Math.floor(Math.random()*this.wordBank.length);
		return this.wordBank[index];
	},
	//calculate target word length
	wordLength: function(){
		var counter;
		for(var i=0;i<this.target.length;i++){
			if(this.target[i] != ' '){
				counter++;
			}
		}
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
			if(target[i] === this.userGuess){
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
		return shadow;
	},
	//update Shadow if guessed correctly
	updateShadow: function() {
		for(var i=0;i<this.target.length;i++){
			if(this.target[i] === this.userGuess){
				this.shadow[i] = this.userGuess + " ";
				this.shadowLength--;
			}
		}
	},

	printShadow: function() {
		document.getElementById("wordGuess").innerHTML = "";
		for(var i=0;i<this.shadow.length;i++){
			document.getElementById("wordGuess").innerHTML+=this.shadow[i];
		}
	},
	//print lives-wins-losses
	printStats: function() {
		document.getElementById("lives-wins-losses").innerHTML = ("wins: " + wins + "&emsp; losses: " + losses + "&emsp; lives: " + this.lives); 
	},
	//begin game again if gameOver
	restartGame: function() {
		if(confirm("Play Again?")){
			document.getElementById("letterBank").innerHTML = "";
			this.init();
		}
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
		this.userGuess = letter.toUpperCase();
		document.getElementById(this.userGuess).disabled = true;
		this.attemptGuess();
	},
	//populate letter buttons
	addButtons: function() {
		for(var i=0;i<this.letters.length;i++){
			var letterBtn = document.createElement("button");
			letterBtn.setAttribute("class", "letter");
			letterBtn.setAttribute("id",this.letters[i]);
			letterBtn.setAttribute("onclick","hangmanGame.letterClick("+this.letters[i]+")");
			letterBtn.innerHTML=this.letters[i];
			var ltrbnk = document.getElementById("letterBank"); 
			ltrbnk.appendChild(letterBtn);
		}
	}
}

window.onload = function(event){
	hangmanGame.init();

	document.onkeyup = function(pressEvent){
		document.getElementById(pressEvent.keyCode).disabled = true;
		hangmanGame.userGuess = pressEvent.keyCode.toUpperCase();
		hangmanGame.attemptGuess();
	}
}


// var guessScreen = document.getElementById("wordGuess");
// var stats = document.getElementById("lives-wins-losses");

// while(wordBank.length !== 0){
// 	if(gameOver){
// 		//reset lives & wordguess innerhtml
// 		lives = 6;
// 		guessScreen.innerHTML = "";

// 		//reprint buttons
// 		for(var i=0;i<letters.length;i++){
// 			var letterBtn = document.createElement("button");
// 			letterBtn.setAttribute("class", "letter");
// 			letterBtn.setAttribute("dataLetter", letters[i]);
// 			letterBtn.addEventListener("click", checkLetter);
// 			letterBtn.innerHTML=letters[i];
// 			var ltrbnk = document.getElementById("letterBank"); 
// 			ltrbnk.appendChild(letterBtn);
// 		}

// 		//reset target word
// 		var index=Math.floor(Math.random()*wordBank.length);
// 		target = wordBank[index];
// 		wordBank.splice(index,1);

// 		//reset and print shadow of target
// 		for(var i=0;i<target.length;i++){
// 			if(target[i]!=" "){
// 				shadow.push("_ ");
// 				guessScreen.innerHTML+="_ ";
// 			}
// 			else{
// 				shadow.push("&emsp;");
// 				guessScreen.innerHTML+="&emsp;";
// 			}
// 		}

// 		//print out stats
// 		stats.innerHTML = ("wins: " + wins + "&emsp; losses: " + losses + "&emsp; lives: " + lives); 

// 		gameOver = false;
// 	}
// }

// function checkLetter(){
// 	var index=target.indexOf(this.dataLetter);
// 	if(index !== -1){
// 		while(index != -1){
// 			shadow[index] = this.dataLetter + " ";
// 			target[index] = "*";
// 			index = target.indexOf(this.dataLetter);
// 		}
// 		guessScreen.innerHTML = "";
// 		for(var i=0;i<shadow.length;i++){
// 			guessScreen.innerhtml+=shadow[i];
// 		}
// 		if(shadow.indexOf("_ ")==-1){
// 			wins++;
// 			gameOver = true;
// 		}
// 	}
// 	else{
// 		lives--;
// 		if(lives === 0){
// 			losses++;
// 			gameOver = true;
// 		}
// 	}
// 	this.style.color = "darkred";
// 	this.disabled = "true";
// };



