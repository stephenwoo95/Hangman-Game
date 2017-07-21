
var lives = 6;
var wordBank = ["PLUMBUS","SQUANCH", "BIRDPERSON", " MR MEESEEKS", "PRINCIPAL VAGINA", "SCARY TERRY", "GET SCHWIFTY", "WUBBA LUBBA DUB DUB", "GAZORPAZORP", "BLIPS AND CHITZ", "ANTS IN MY EYES JOHNSON", "LIL BITS","MR POOPYBUTTHOLE", "STEALY", "SNOWBALL", "RICK", "MORTY", "SUMMER", "JERRY", "BETH", "TINY RICK", "TINYVERSE", "MINIVERSE", "MICROVERSE"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var wins = 0;
var losses = 0;
var gameStart = true;
var gameOver = false;

(function(){

		for(var i=0;i<letters.length;i++){
			var letterBtn = document.createElement("button");
			letterBtn.setAttribute("class", "letter-button letter letter-button-color");
			letterBtn.setAttribute("data-letter", letters[i]);
			letterBtn.innerHTML=letters[i];
			var ltrbnk = document.getElementById("letterBank"); 
			ltrbnk.appendChild(letterBtn);
		}

		if(gameStart){
			var index=Math.floor(Math.random()*wordBank.length);
			var target = wordBank[index];
			wordBank.splice(index,1);
			for(var i=0;i<target.length;i++){
				if(target[i]!=" "){
					document.getElementById("wordGuess").innerHTML+=("_ ");
				}
				else{
					document.getElementById("wordGuess").innerHTML+=("&emsp;");
				}
			}
		}

		while(!gameOver){
			document.getElementByClassName("letter-button").on("click",function(){
				var index=target.indexOf(this.data-letter);
				while(index != -1){

				}

				this.disabled = "true";
			});

		}

})();


