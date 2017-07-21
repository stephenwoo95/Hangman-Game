
// Initialize variables

var lives = 6;
var wordBank = ["PLUMBUS","SQUANCH", "BIRDPERSON", " MR MEESEEKS", "PRINCIPAL VAGINA", "SCARY TERRY", "GET SCHWIFTY", "WUBBA LUBBA DUB DUB", "GAZORPAZORP", "BLIPS AND CHITZ", "ANTS IN MY EYES JOHNSON", "LIL BITS","MR POOPYBUTTHOLE", "STEALY", "SNOWBALL", "RICK", "MORTY", "SUMMER", "JERRY", "BETH", "TINY RICK", "TINYVERSE", "MINIVERSE", "MICROVERSE"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var wins = 0;
var losses = 0;
var gameOver = true;
var target;
var shadow = [];

(function(){
	var guessScreen = document.getElementById("wordGuess");
	var stats = document.getElementById("lives-wins-losses");

	if(wordBank.length !== 0){
		if(gameOver){
			//reset lives & wordguess innerhtml
			lives = 6;
			guessScreen.innerHTML = "";

			//reprint buttons
			for(var i=0;i<letters.length;i++){
				var letterBtn = document.createElement("button");
				letterBtn.setAttribute("class", "letter");
				letterBtn.setAttribute("dataLetter", letters[i]);
				letterBtn.setAttribute("onclick", "chooseLetter()");
				letterBtn.innerHTML=letters[i];
				var ltrbnk = document.getElementById("letterBank"); 
				ltrbnk.appendChild(letterBtn);
			}

			//reset target word
			var index=Math.floor(Math.random()*wordBank.length);
			target = wordBank[index];
			wordBank.splice(index,1);

			//reset and print shadow of target
			for(var i=0;i<target.length;i++){
				if(target[i]!=" "){
					shadow.push("_ ");
					guessScreen.innerHTML+="_ ";
				}
				else{
					shadow.push("&emsp;");
					guessScreen.innerHTML+="&emsp;";
				}
			}

			//print out stats
			stats.innerHTML = ("wins: " + wins + "&emsp; losses: " + losses + "&emsp; lives: " + lives); 

			gameOver = false;
		}

		document.getElementByTagName("button").on("click",function(){
			var index=target.indexOf(this.dataLetter);
			if(index !== -1){
				while(index != -1){
					shadow[index] = this.dataLetter + " ";
					target[index] = "*";
					index = target.indexOf(this.dataLetter);
				}
				guessScreen.innerHTML = "";
				for(var i=0;i<shadow.length;i++){
					guessScreen.innerhtml+=shadow[i];
				}
				if(shadow.indexOf("_ ")==-1){
					wins++;
					gameOver = true;
				}
			}
			else{
				lives--;
				if(lives === 0){
					losses++;
					gameOver = true;
				}
			}
			this.style.color = "darkred";
			this.disabled = "true";
		});
	}

})();


