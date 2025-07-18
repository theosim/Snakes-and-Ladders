"use strict";

var player1;
var player2;
var dice;

class Player {

    playerNumber;
    september;
    position;
    myTurn;

    constructor(position, september, playerNumber){
        this.position = position;
        this.september = september;
        this.playerNumber = playerNumber;
    }

    setPosition(newPosition){
        this.position = newPosition;
    }

    getPosition(){
        return this.position;
    }

    setSeptember(newSeptember){
        this.september = true;
    }

    getSeptember(){
        return this.september;
    }

    getPlayerNumber(){
        return this.playerNumber;
    }

    setMyTurn(turn){
        this.myTurn = turn;
    }

    getMyTurn(){
        return this.myTurn;
    }
}

function initBoard(){
    
	var table = document.getElementById('mainTable');
	var tr = document.createElement('tr');

	for (var i = 9; i >=1; i--) {
	  var tr = document.createElement('tr');
	  for (var j = 9; j >=0; j--) {
	  var td1 = document.createElement('td');
	  var num=i*10-j;
	  td1.innerHTML="<div id='position"+num+"'><img  src='images/"+num+".png'  height=70 width=80></div>";
	  
	  tr.appendChild(td1);
	  
	  }
	  table.appendChild(tr);
	}

    document.getElementById("endTurn").disabled = true;
    document.getElementById("dice").disabled = true;
}

function changePositionRed(newPosition){
	document.getElementById("position"+newPosition).innerHTML="<img  src='imagesRed/"+newPosition+".png'  height=70 width=80></div>";	
}

function changePositionWhite(newPosition){
	document.getElementById("position"+newPosition).innerHTML="<img  src='imagesWhite/"+newPosition+".png'  height=70 width=80></div>";	
}

function changePositionBoth(newPosition){
	document.getElementById("position"+newPosition).innerHTML="<img  src='imagesboth/"+newPosition+".png'  height=70 width=80></div>";	
}

function setBlankPos(oldPosition){
    document.getElementById("position"+oldPosition).innerHTML="<div id='position"+oldPosition+"'><img  src='images/"+oldPosition+".png'  height=70 width=80></div>";
}

function newGame(){

    var table = document.getElementById('mainTable');
    table.innerHTML = "";
    initBoard();

    player1 = new Player(0,false,1);
    player2 = new Player(0,false,2);

    var turn = Math.floor(Math.random() * 2) + 1;

    if(turn  === 1){
        player1.setMyTurn(true);
        player2.setMyTurn(false);
    }
    else{
        player1.setMyTurn(false);
        player2.setMyTurn(true);
    }

    document.getElementById("turn").innerHTML = "Player " + getPlayerTurn();
    document.getElementById("diceResult").innerHTML ="<br>";
    document.getElementById("septemberEffect").innerHTML = "<br>";
    document.getElementById("updates").innerHTML = "<br>";

    document.getElementById("endTurn").disabled = true;
    document.getElementById("dice").disabled = false;


}

function setPositions() {

    var positions=[];
	var snakePositions   =[13,38,46,73,82,89]
	var snakeNewPositions=[12,18,36,43,62,79]

	var ladderPositions   =[6,31,47,56,78]
	var ladderNewPositions=[27,71,58,67,88]
	
	var snakes_or_ladders_Positions   =[25,29,65,70]
	var snakes_or_ladders_NewPositions=["4 or 45","9 or 49","54 or 84","40 or 90"]


	for (var i = 1; i <=90 ; i++) {
        positions[i]=new Object();
        positions[i].from=i;
        
        
        if(snakePositions.indexOf(i)!=-1){
        positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
        positions[i].type="Snake";
        }
        else if(ladderPositions.indexOf(i)!=-1){
        positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
        positions[i].type="Ladders";
        }
        else if(snakes_or_ladders_Positions.indexOf(i)!=-1){
        positions[i].to=snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
        positions[i].type="Snake or Ladders";
        }
        else if(i===11 || i===55 || i===88){
            positions[i].to=i;
            positions[i].type="September";   
        }
        else if(i===22 || i===44 || i===77){
            positions[i].to=i;
            positions[i].type="Swords";   
        }
        else{
        positions[i].to=i;
            positions[i].type="Normal";   
        
        }
    }
	return positions; 
}

var cells=setPositions();

for (var i = 1; i <=90 ; i++) {
    console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}

function roll(){

    dice = Math.floor(Math.random() * 6) + 1;
    var diceButton = document.getElementById("dice");

    diceButton.style.background = "url(ImagesDice/"+dice+".png)";
    diceButton.style.width = "70px";
    diceButton.style.height = "70px";
    diceButton.style.backgroundSize = "100%";
    diceButton.style.backgroundColor = "blanchedalmond";

    play(dice);
}

function getPlayerTurn(){

    if(player1.getMyTurn()){
        return 1;
    }
    else{
        return 2;
    }

}

function hasPlayerWon(playernum){

    if(playernum === 1){
        if(player1.getPosition() === 90){
            document.getElementById("updates").innerHTML = "Player 1 won!\nGAME OVER";
            document.getElementById("diceResult").innerHTML = dice;
        
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
        
            document.getElementById("dice").disabled = true;
            document.getElementById("endTurn").disabled = true;
            return true;
        }

        if(player1.getPosition() + dice === 90){

            player1.setPosition(player1.getPosition() + dice);
            document.getElementById("dice").disabled = true;
            document.getElementById("endTurn").disabled = true;
            document.getElementById("updates").innerHTML = "Player 1 won!\nGAME OVER";
            document.getElementById("diceResult").innerHTML = dice;
        
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
            return true;
        }
        else if(player1.getPosition() + dice > 90){
            player1.setPosition(90 - (player1.getPosition() + dice - 90));
        }
        else{
            player1.setPosition(player1.getPosition() + dice);
        }
    }
    else{

        if(player2.getPosition() === 90){
            document.getElementById("updates").innerHTML = "Player 2 won!\nGAME OVER";
            document.getElementById("diceResult").innerHTML = dice;
        
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
            document.getElementById("dice").disabled = true;
            document.getElementById("endTurn").disabled = true;
            return true;
        }

        if(player2.getPosition() + dice === 90){

            player2.setPosition(player2.getPosition() + dice);
            document.getElementById("dice").disabled = true;
            document.getElementById("endTurn").disabled = true;
            document.getElementById("updates").innerHTML = "Player 2 won!\nGAME OVER";
            document.getElementById("diceResult").innerHTML = dice;
        
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
            return true;
        }
        else if(player2.getPosition() + dice > 90){
            player2.setPosition(90 - (player2.getPosition() + dice - 90));
        }
        else{
            player2.setPosition(player2.getPosition() + dice);
        }
    }
    
    return false;
    
}

function play(dice){

    var snakePositions = [13,38,46,73,82,89];
    var snakeNewPositions=[12,18,36,43,62,79];

	var ladderPositions   =[6,31,47,56,78];
	var ladderNewPositions=[27,71,58,67,88];
	
	var snakes_or_ladders_Positions =[25,29,65,70];

    if(getPlayerTurn() === 1){

        if(player1.getPosition()!==0){
            if(player2.getPosition()!== player1.getPosition()){
                setBlankPos(player1.getPosition());
            }
            else if(player2.getPosition() === player1.getPosition()){
                changePositionWhite(player2.getPosition());
            }
        }

        if(hasPlayerWon(1)){
            changePositionRed(player1.getPosition());
            return;
        }
        

        if(ladderPositions.includes(player1.getPosition())){

            var i = ladderPositions.indexOf(player1.getPosition());
            player1.setPosition(ladderNewPositions[i]);

            if(player1.getPosition()===88){
                player1.setSeptember(true);

                document.getElementById("updates").innerHTML = "Player 1 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i] + "Player 1 acquired the September effect";
            }
            else{
                document.getElementById("updates").innerHTML = "Player 1 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i];
            }

            
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();

        }
        else if((player1.getPosition() === 11) || (player1.getPosition() === 55) || (player1.getPosition() === 88)){

            player1.setSeptember(true);

            document.getElementById("updates").innerHTML = "Player 1 acquired the September effect";
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();

        }
        else if((player1.getPosition() === 22) || (player1.getPosition() === 44) || (player1.getPosition() === 77)){

            var swordfight = "Player 1 got the swords effect so player 2 has to go back 10 squares.\n";
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();

            swords(2, swordfight);
        }
        else if(snakePositions.includes(player1.getPosition())){

            if(player1.getSeptember()){
                var grade = Math.floor(Math.random() * 11);
                
                if(grade >= 5){
                    document.getElementById("updates").innerHTML = "Player 1 passed in september with a grade of " + grade;
                    document.getElementById("diceResult").innerHTML = dice;
                    document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
                }
                else{
                    var i = snakePositions.indexOf(player1.getPosition());
                    player1.setPosition(snakeNewPositions[i]);

                    
                    document.getElementById("updates").innerHTML = "Player 1 didn't pass in September and fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                    document.getElementById("diceResult").innerHTML = dice;
                    document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
                }
            }
            else{
                var i = snakePositions.indexOf(player1.getPosition());
                player1.setPosition(snakeNewPositions[i]);

                    
                document.getElementById("updates").innerHTML = "Player 1 fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                document.getElementById("diceResult").innerHTML = dice;
                document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
            }
            
        }
        else if(snakes_or_ladders_Positions.includes(player1.getPosition())){

            var i = snakes_or_ladders_Positions.indexOf(player1.getPosition());
            var grade = Math.floor(Math.random() * 11);
            var sept = "";

            if(grade < 5){
                if(player1.getSeptember()){
                    sept = "Player 1 got a grade of " + grade + " and did't pass the class so they're taking the exam again in september.\n";
                    grade =  Math.floor(Math.random() * 11);
                }
            }
            
            
            if(i === 0){

                if(grade < 5){
                    player1.setPosition(4);
                    document.getElementById("updates").innerHTML = sept + "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 4";
                }
                else{
                    player1.setPosition(45);
                    document.getElementById("updates").innerHTML = sept + "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 45";
                }

            }
            else if(i === 1){
                if(grade < 5){
                    player1.setPosition(9);
                    document.getElementById("updates").innerHTML = sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 9";
                }
                else{
                    player1.setPosition(49);
                    document.getElementById("updates").innerHTML =  sept +  "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 49";
                }
            }
            else if(i === 2){
                if(grade < 5){
                    player1.setPosition(54);
                    document.getElementById("updates").innerHTML =  sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 54";
                }
                else{
                    player1.setPosition(84);
                    document.getElementById("updates").innerHTML =  sept +  "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 84";

                }
            }
            else{
                if(grade < 5){
                    player1.setPosition(40);
                    document.getElementById("updates").innerHTML =  sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 40";
                }
                else{
                    player1.setPosition(90);
                    document.getElementById("updates").innerHTML = sept + "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 90";
                    if(hasPlayerWon(1)){
                        changePositionRed(player1.getPosition());
                        return;
                    }

                }
            }

            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
        }
        else{
            
            player1.setPosition(player1.getPosition())

            document.getElementById("updates").innerHTML = "<br>";            
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
        }
        
        if(player1.getPosition() === player2.getPosition()){
            changePositionBoth(player1.getPosition());
        }
        else{
            changePositionRed(player1.getPosition());
        }
    }
    else{

        if(player2.getPosition()!==0){
            if(player2.getPosition()!== player1.getPosition()){
                setBlankPos(player2.getPosition());
            }
            else if(player2.getPosition() === player1.getPosition()){
                changePositionRed(player1.getPosition());
            }
        }
        
        if(hasPlayerWon(2)){
            changePositionWhite(player2.getPosition());
            return;
        }
        

        if(ladderPositions.includes(player2.getPosition())){

            var i = ladderPositions.indexOf(player2.getPosition());
            player2.setPosition(ladderNewPositions[i]);

            if(player2.getPosition()===88){
                player2.setSeptember(true);

                document.getElementById("updates").innerHTML = "Player 2 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i] + ". Player 2 acquired the September effect";
            }
            else{
                document.getElementById("updates").innerHTML = "Player 2 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i];
            }

            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();

        }
        else if((player2.getPosition() === 11) || (player2.getPosition() === 55) || (player2.getPosition() === 88)){

            player2.setSeptember(true);

            document.getElementById("updates").innerHTML = "Player 2 acquired the September effect";
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();

        }
        else if((player2.getPosition() === 22) || (player2.getPosition() === 44) || (player2.getPosition() === 77)){

            var swordfight = "Player 2 got the swords effect so player 1 has to go back 10 squares.\n";
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();

            swords(1, swordfight);
        }
        else if(snakePositions.includes(player2.getPosition())){


            if(player2.getSeptember()){
                var grade = Math.floor(Math.random() * 11);
                
                if(grade >= 5){
                    document.getElementById("updates").innerHTML = "Player 2 passed in september with a grade of " + grade;
                    document.getElementById("diceResult").innerHTML = dice;
                    document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
                }
                else{
                    var i = snakePositions.indexOf(player2.getPosition());
                    player2.setPosition(snakeNewPositions[i]);

                    
                    document.getElementById("updates").innerHTML = "Player 2 didn't pass in September and fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                    document.getElementById("diceResult").innerHTML = dice;
                    document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
                }
            }
            else{
                var i = snakePositions.indexOf(player2.getPosition());
                player2.setPosition(snakeNewPositions[i]);

                    
                document.getElementById("updates").innerHTML = "Player 2 fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                document.getElementById("diceResult").innerHTML = dice;
                document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
            }
                
        }
        else if(snakes_or_ladders_Positions.includes(player2.getPosition())){

            var i = snakes_or_ladders_Positions.indexOf(player2.getPosition());
            var grade = Math.floor(Math.random() * 11);
            var sept="";

            if(grade < 5){
                if(player2.getSeptember()){
                    sept = "Player 2 got a grade of " + grade + " and did't pass the class so they're taking the exam again in september.\n";
                    grade =  Math.floor(Math.random() * 11);
                }
            }
            
            if(i === 0){

                if(grade < 5){
                    player2.setPosition(4);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 4";
                }
                else{
                    player2.setPosition(45);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 45";
                }

            }
            else if(i === 1){
                if(grade < 5){
                    player2.setPosition(9);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 9";
                }
                else{
                    player2.setPosition(49);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 49";
                }
            }
            else if(i === 2){
                if(grade < 5){
                    player2.setPosition(54);
                    document.getElementById("updates").innerHTML = sept +"Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 54";
                }
                else{
                    player2.setPosition(84);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 84";

                }
            }
            else{
                if(grade < 5){
                    player2.setPosition(40);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 40";
                }
                else{
                    player2.setPosition(90);
                    document.getElementById("updates").innerHTML = sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 90";
                    if(hasPlayerWon(2)){
                        changePositionWhite(player2.getPosition());
                        return;
                    }
                }
            }

            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
        }
        else{
            
            player2.setPosition(player2.getPosition())

            document.getElementById("updates").innerHTML = "<br>";            
            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
        }
        
        if(player1.getPosition() === player2.getPosition()){
            changePositionBoth(player1.getPosition());
        }
        else{
            changePositionWhite(player2.getPosition());
        }
    }

    
    document.getElementById("dice").disabled = true;
    document.getElementById("endTurn").disabled = false;
    
}

function changePlayerTurn(){

    if(dice === 6){
        document.getElementById("updates").innerHTML = "Player " + getPlayerTurn() + " plays again because they rolled 6!";
    }
    else if(getPlayerTurn() === 1){
        player2.setMyTurn(true);
        player1.setMyTurn(false); 
    }
    else{
        player1.setMyTurn(true);
        player2.setMyTurn(false);
    }
}


function endTurn(){

    changePlayerTurn();
    document.getElementById("turn").innerHTML = "Player " + getPlayerTurn();
    document.getElementById("diceResult").innerHTML = "<br>";

    if(dice !== 6 ){
        document.getElementById("updates").innerHTML = "<br>";
    }
    
    if(getPlayerTurn() === 1){
        document.getElementById("septemberEffect").innerHTML = player1.getSeptember();
    }
    else{
        document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
    }
    
    document.getElementById("dice").disabled = false;
    document.getElementById("endTurn").disabled = true;

}

function swords(playerToMove, swordfight){

    var snakePositions = [13,38,46,73,82,89];
    var snakeNewPositions=[12,18,36,43,62,79];

	var ladderPositions   =[6,31,47,56,78];
	var ladderNewPositions=[27,71,58,67,88];
	
	var snakes_or_ladders_Positions =[25,29,65,70];

    if(playerToMove === 1 ){

        

        if(player1.getPosition()!==0){
            if(player2.getPosition()!== player1.getPosition()){
                setBlankPos(player1.getPosition());
            }
            else if(player2.getPosition() === player1.getPosition()){
                changePositionWhite(player2.getPosition());
            }
        }
        
        player1.setPosition(player1.getPosition()-10);

        if(player1.getPosition() <= 0){
            player1.setPosition(0);
            document.getElementById("updates").innerHTML = swordfight + "Player 1 moved back to the start.";
            return;
        }

        if(ladderPositions.includes(player1.getPosition())){

            var i = ladderPositions.indexOf(player1.getPosition());
            player1.setPosition(ladderNewPositions[i]);

            if(player1.getPosition()===88){
                player1.setSeptember(true);

                document.getElementById("updates").innerHTML = swordfight + "Player 1 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i] + "Player 1 acquired the September effect";
            }
            else{
                document.getElementById("updates").innerHTML = swordfight + "Player 1 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i];
            }

        }
        else if((player1.getPosition() === 11) || (player1.getPosition() === 55) || (player1.getPosition() === 88)){

            player1.setSeptember(true);

            document.getElementById("updates").innerHTML = swordfight + "Player 1 acquired the September effect";
    
        }
        else if((player1.getPosition() === 22) || (player1.getPosition() === 44) || (player1.getPosition() === 77)){

            var swordfight = swordfight + "Player 1 also got the swords effect so Player 2 has to go back 10 squares.\n";
            swords(2, swordfight);

        }
        else if(snakePositions.includes(player1.getPosition())){

            if(player1.getSeptember()){
                var grade = Math.floor(Math.random() * 11);
                
                if(grade >= 5){
                    document.getElementById("updates").innerHTML = swordfight +  "Player 1 passed in september with a grade of " + grade;
                }
                else{
                    var i = snakePositions.indexOf(player1.getPosition());
                    player1.setPosition(snakeNewPositions[i]);

                    
                    document.getElementById("updates").innerHTML =  swordfight + "Player 1 didn't pass in September and fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                }
            }
            else{
                var i = snakePositions.indexOf(player1.getPosition());
                player1.setPosition(snakeNewPositions[i]);

                    
                document.getElementById("updates").innerHTML = swordfight + "Player 1 fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];

            }
            
        }
        else if(snakes_or_ladders_Positions.includes(player1.getPosition())){

            var i = snakes_or_ladders_Positions.indexOf(player1.getPosition());
            var grade = Math.floor(Math.random() * 11);
            var sept = "";

            if(grade < 5){
                if(player1.getSeptember()){
                    sept = swordfight + "Player 1 got a grade of " + grade + " and did't pass the class so they're taking the exam again in september.\n";
                    grade =  Math.floor(Math.random() * 11);
                }
            }
            
            if(i === 0){

                if(grade < 5){
                    player1.setPosition(4);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 4";
                }
                else{
                    player1.setPosition(45);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 45";
                }

            }
            else if(i === 1){
                if(grade < 5){
                    player1.setPosition(9);
                    document.getElementById("updates").innerHTML = swordfight + sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 9";
                }
                else{
                    player1.setPosition(49);
                    document.getElementById("updates").innerHTML = swordfight + sept +  "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 49";
                }
            }
            else if(i === 2){
                if(grade < 5){
                    player1.setPosition(54);
                    document.getElementById("updates").innerHTML = swordfight + sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 54";
                }
                else{
                    player1.setPosition(84);
                    document.getElementById("updates").innerHTML = swordfight + sept +  "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 84";

                }
            }
            else{
                if(grade < 5){
                    player1.setPosition(40);
                    document.getElementById("updates").innerHTML = swordfight + sept +  "Player 1 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 40";
                }
                else{
                    player1.setPosition(90);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 1 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 90";
                    if(hasPlayerWon(1)){
                        changePositionRed(player1.getPosition());
                        return;
                    }

                }
            }

        }
        else{
            
            player1.setPosition(player1.getPosition())

            document.getElementById("updates").innerHTML = swordfight + " Player 1 moved from position " + (player1.getPosition()+10) + " to position " + player1.getPosition();
        }
        
        if(player1.getPosition() === player2.getPosition()){
            changePositionBoth(player1.getPosition());
        }
        else{
            changePositionRed(player1.getPosition());
        }
    }
    else{

        if(player2.getPosition()!==0){
            if(player2.getPosition()!== player1.getPosition()){
                setBlankPos(player2.getPosition());
            }
            else if(player2.getPosition() === player1.getPosition()){
                changePositionRed(player1.getPosition());
            }
        }

        player2.setPosition(player2.getPosition()-10);

        if(player2.getPosition() <= 0){
            player2.setPosition(0);
            document.getElementById("updates").innerHTML = swordfight + "Player 2 moved back to the start.";
            return;
        }
        
        if(ladderPositions.includes(player2.getPosition())){

            var i = ladderPositions.indexOf(player2.getPosition());
            player2.setPosition(ladderNewPositions[i]);

            if(player2.getPosition()===88){
                player2.setSeptember(true);

                document.getElementById("updates").innerHTML = swordfight +"Player 2 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i] + ". Player 2 acquired the September effect";
            }
            else{
                document.getElementById("updates").innerHTML = swordfight +"Player 2 climbed the ladder from " + ladderPositions[i] + " to " + ladderNewPositions[i];
            }

        }
        else if((player2.getPosition() === 11) || (player2.getPosition() === 55) || (player2.getPosition() === 88)){

            player2.setSeptember(true);

            document.getElementById("updates").innerHTML = swordfight + "Player 2 acquired the September effect";
        
        }
        else if((player2.getPosition() === 22) || (player2.getPosition() === 44) || (player2.getPosition() === 77)){

            var swordfight = swordfight + "Player 2 also got the swords effect so player 2 has to go back 10 squares.\n";
            swords(1, swordfight);

        }
        else if(snakePositions.includes(player2.getPosition())){


            if(player2.getSeptember()){
                var grade = Math.floor(Math.random() * 11);
                
                if(grade >= 5){
                    document.getElementById("updates").innerHTML = swordfight + "Player 2 passed in september with a grade of " + grade; 
                }
                else{
                    var i = snakePositions.indexOf(player2.getPosition());
                    player2.setPosition(snakeNewPositions[i]);

                    
                    document.getElementById("updates").innerHTML = swordfight + "Player 2 didn't pass in September and fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                }
            }
            else{
                var i = snakePositions.indexOf(player2.getPosition());
                player2.setPosition(snakeNewPositions[i]);

                    
                document.getElementById("updates").innerHTML = swordfight + "Player 2 fell off the snake from " + snakePositions[i] + " to " + snakeNewPositions[i];
                
            }
                
        }
        else if(snakes_or_ladders_Positions.includes(player2.getPosition())){

            var i = snakes_or_ladders_Positions.indexOf(player2.getPosition());
            var grade = Math.floor(Math.random() * 11);
            var sept="";

            if(grade < 5){
                if(player2.getSeptember()){
                    sept = swordfight + "Player 2 got a grade of " + grade + " and did't pass the class so they're taking the exam again in september.\n";
                    grade =  Math.floor(Math.random() * 11);
                }
            }
            
            if(i === 0){

                if(grade < 5){
                    player2.setPosition(4);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 4";
                }
                else{
                    player2.setPosition(45);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 45";
                }

            }
            else if(i === 1){
                if(grade < 5){
                    player2.setPosition(9);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 9";
                }
                else{
                    player2.setPosition(49);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 49";
                }
            }
            else if(i === 2){
                if(grade < 5){
                    player2.setPosition(54);
                    document.getElementById("updates").innerHTML = swordfight + sept +"Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 54";
                }
                else{
                    player2.setPosition(84);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 84";

                }
            }
            else{
                if(grade < 5){
                    player2.setPosition(40);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and fell off the snake from " + snakes_or_ladders_Positions[i] + " to 40";
                }
                else{
                    player2.setPosition(90);
                    document.getElementById("updates").innerHTML = swordfight + sept + "Player 2 got a grade of "+ grade +" and climbed the ladder from " + snakes_or_ladders_Positions[i] + " to 90";
                    if(hasPlayerWon(2)){
                        changePositionWhite(player2.getPosition());
                        return;
                    }
                }
            }

            document.getElementById("diceResult").innerHTML = dice;
            document.getElementById("septemberEffect").innerHTML = player2.getSeptember();
        }
        else{
            
            player2.setPosition(player2.getPosition())

            document.getElementById("updates").innerHTML = swordfight + " Player 2 moved from position " + (player2.getPosition()+10) + " to position " + player2.getPosition();
        }
        
        if(player1.getPosition() === player2.getPosition()){
            changePositionBoth(player1.getPosition());
        }
        else{
            changePositionWhite(player2.getPosition());
        }
    }
}
