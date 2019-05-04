function mainFunc(){
  //Clear the screen
  document.getElementById('content').innerHTML ="";

  //Clear the game board
  var gameArray =  [[" "," "," "],
                    [" "," "," "],
                    [" "," "," "]];

  displayMsg ="Let's Play"
  var msgElement = document.createElement("p");
  var msgElementText = document.createTextNode(displayMsg);
  msgElement.setAttribute("id", "message");
  msgElement.append(msgElementText);
  document.getElementById('content').appendChild(msgElement);

  createGameBoard(gameArray);

  // Restart Button
  var resetbtn = document.createElement("button");
  resetbtn.innerHTML = "Restart";
  resetbtn.setAttribute("class", "btn btn-light");
  resetbtn.addEventListener('click', mainFunc, false);
  document.getElementById('content').appendChild(resetbtn);
}

//Creates the game board based on the gameArray variable received.
function createGameBoard(gameArray){
  var content = document.getElementById('content');
  var gameBoard = document.createElement("Table");
  gameBoard.setAttribute("id", "gameBoard");
  content.append(gameBoard);

  var idIncrement=0;
  for (var i=0; i < gameArray.length; i++){
    var newRow = gameBoard.insertRow(i);
    for(var j=0; j< gameArray[i].length; j++){
      var newCell = newRow.insertCell(j);
      newCell.innerHTML = gameArray[i][j];
      //Set id and event listener for each cell
      var cellId = idIncrement;
      idIncrement++;
      newCell.setAttribute("id", cellId);
      newCell.addEventListener('click', humanMove, false);}}
      //let the game begin
      spacesAvailable = emptyIndex();
      firstMove();}

//Marks down the human player's move on the board
function humanMove(cell){
  cell.target.removeEventListener('click', humanMove, false);
  let markSpot = document.getElementById(cell.target.id)
  markSpot.innerHTML = human;

  //Locate the index and delete it
  var index = spacesAvailable.indexOf(parseInt(markSpot.id, 10));
  spacesAvailable.splice(index, 1);
  //Both players need to make at least 5 moves(together) on a 3x3 board to win.
  if(spacesAvailable.length <= 4){
    if(!checkResult(human)){
      robotMove();
    }
  }
  else{
    robotMove();
  }
}

//Marks the computers move on the board
function robotMove(){
  if(spacesAvailable.length > 0){
    let randomSpot = spacesAvailable[Math.floor(Math.random()*spacesAvailable.length)];
    let markSpot = document.getElementsByTagName('td')[randomSpot];
    markSpot.removeEventListener('click', humanMove, false);
    markSpot.innerHTML = robot;

    //Locate the index and delete it
    var index = spacesAvailable.indexOf(parseInt(markSpot.id, 10));
    spacesAvailable.splice(index, 1);
  }
  //Both players need to make at least 5 moves(together) on a 3x3 board to win.
  if(spacesAvailable.length <= 4){
    checkResult(robot);
}}

//Returns an array of indexes' of the empty cells
function emptyIndex(){
  var spaces = document.querySelectorAll('td');
  var spacesAvailable=[];
//Check empty spaces
  for(var i=0; i < spaces.length; i++){
    if(spaces[i].innerHTML == " "){
      spacesAvailable.push(i);
    }
  }
  return spacesAvailable;
}

//Check if the game has ended
function checkResult(player){
  //There are only 8 winning combos
  var winCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8],
                  [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]];

  var gameBoard = document.querySelectorAll('td');
  var winner = false;

  for (var i=0; i < winCases.length; i++){

      if(gameBoard[winCases[i][0]].innerHTML == gameBoard[winCases[i][1]].innerHTML &&
         gameBoard[winCases[i][0]].innerHTML == gameBoard[winCases[i][2]].innerHTML &&
         gameBoard[winCases[i][0]].innerHTML == human){

           //Change color of the winning combo
           gameBoard[winCases[i][0]].style.backgroundColor = "#90EE90";
           gameBoard[winCases[i][1]].style.backgroundColor = "#90EE90";
           gameBoard[winCases[i][2]].style.backgroundColor = "#90EE90";

           declareResult(human);
           winner = true;
           break;
         }
      else if(gameBoard[winCases[i][0]].innerHTML == gameBoard[winCases[i][1]].innerHTML &&
         gameBoard[winCases[i][0]].innerHTML == gameBoard[winCases[i][2]].innerHTML &&
         gameBoard[winCases[i][0]].innerHTML == robot){

           //Change color of the winning combo
           gameBoard[winCases[i][0]].style.backgroundColor = "#FA8072";
           gameBoard[winCases[i][1]].style.backgroundColor = "#FA8072";
           gameBoard[winCases[i][2]].style.backgroundColor = "#FA8072";

           declareResult(robot);
           winner = true;
           break;
         }

      else if (spacesAvailable.length == 0 && !winner)
      {
        declareResult(null);
        winner = true;
      }
      else{}
}
  return winner;
     }

//Remove addEventListeners from unmarked spaces and display results.
function declareResult(player){
  for(var i=0; i < spacesAvailable.length; i++){
    var emptySpaces = document.getElementsByTagName('td')[spacesAvailable[i]];
    emptySpaces.removeEventListener('click', humanMove, false);
  }

  if(player == human){
    document.getElementById("message").innerHTML = "You Win, Lets play again!";
  }
  else if(player == robot){
    document.getElementById("message").innerHTML = "You Lose, Lets play again!";
  }
  else{
    document.getElementById("message").innerHTML = "Tie Game, Lets play again!";}}

//Randomly assign first turn
function firstMove(){
  var firstMove = players[Math.floor(Math.random()*players.length)];
  if(firstMove == robot){
    document.getElementById("message").append(" - Computer Starts!")
    robotMove();
  }
  else{
    document.getElementById("message").append(" - You Start!")
  }

}
//-----------------------------------------------------------------------------

//Global Variables
var players = [human = "X", robot = "O"];
var spacesAvailable = [];

mainFunc();
