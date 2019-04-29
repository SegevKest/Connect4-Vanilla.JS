window.onload = init;

var table = new Array();
var gameTable = document.getElementById('gameTable');

var color ;
var currPlayer;
var maxCols = 7, maxRows = 7;
var won = false;

function init() {
  setTable(7,7);
  whoStarts();
  document.querySelector('button').style.visibility = 'hidden';
}
//Selecting Randomly whos starting
function whoStarts(){
    color = Math.round(Math.random());
    currPlayer= color == 1 ? 'red' :'yellow';
    document.querySelector('h3').innerHTML = currPlayer + " Starts ";
}
// Whos turn is next
function nextTurn(){
     currPlayer = currPlayer == 'red' ? 'yellow' : 'red'; 
     document.querySelector('h3').innerText = currPlayer +' Turn';

}
// preparing the table for a game
function setTable(maxRows, maxCols) {
    var tableRow;
    document.querySelector('button').addEventListener('click',clearTable);
    for(let i=0;i<maxRows;i++){
        table[i] = new Array(maxCols);
        tableRow = document.createElement('tr');
        tableRow.setAttribute('data',i);
        for(let j=0; j<table[i].length;j++){
            tableRow.appendChild(drawCube(j));
            table[i][j] = 0;
        }
        gameTable.appendChild(tableRow);
    }
}
// draw every single table cell
function drawCube(column) {
    let htmlCube = document.createElement('td');
    htmlCube.setAttribute('data',column);
    htmlCube.addEventListener('click',turn);
    return htmlCube;
} 
// the logic that happens after every click, to insert disc
function turn(e){
    //console.log(`Clicked : col :${e.target.getAttribute('data')} , row : ${e.target.parentNode.getAttribute('data')}`)
    let taken=false;
    let currentCol = e.target.getAttribute('data');

    for(let i=0; i<table.length && !taken; i++)   {
        if(table[currentCol][i] == 0)   {
            let checkedRow= document.querySelector(`tr[data='${6-i}']`);
            let newDiscLocation = checkedRow.querySelector(`td[data='${currentCol}']`);
            taken=true;
            table[currentCol][i] = 1;
            newDiscLocation.style.backgroundColor = currPlayer;
            //console.log('inserted to col:' +currentCol + ', row:'+(6-i) );
            if(! checkHorizon(6-i)) {
              if(! checkVertical(currentCol)) {
                 if(! checkDiagonals(currentCol, (6-i)))
                    nextTurn();
                  else  Won();  }
              else  Won();  }
            else  Won();              
        }
    }
    //console.log(table);
}
// checking if the specific cell is exist
function isCellExist(col, row)    {
    if(table[row] == undefined || table[row][col] == undefined) {
      //console.log(`Cell not exsit [${row},${col}]`)
      return false;
    }
    return true;
    //  return 1;
}
// checking if the disc is matching the color of the currPlayer
function checkMatchDisc (insertedCol, insertedRow)  {
  // checks if there is a nearby colored disc
  // returns true if the located disc is in color of currPLayer
    let checkRow = document.querySelector(`tr[data="${insertedRow}"]`);
    let checkedCell = checkRow.querySelector(`td[data="${insertedCol}"]`);
    return checkedCell.style.backgroundColor == currPlayer ? true : false;
  
}
// Checking if there is a 4 connected in diagonals
function checkDiagonals(insertedCol, insertedRow)  {
          if( ! calculate(insertedCol,insertedRow,"LT2RB") ) {
            if( ! calculate(insertedCol,insertedRow,"LB2RT") ) {
              return false;
        }
      } 
  return true;
}
//  Checking if the insereted cell has a near matching discs in diagonal
function calculate(insertedCol, insertedRow, direction) {
  // LT2RB : Left Top to Right Bottom
  // LB2RT : left bottom to right top

  let countDiscs = 1;

  let column = parseInt(insertedCol);

  for(let i=1; i< maxCols-i; i++)  {
    if(direction.includes('RB') && isCellExist(column+i, insertedRow +i)) {
      if(checkMatchDisc(column + i, insertedRow + i))
        countDiscs++;
    }
    if(direction.includes('RT') && isCellExist(column+i, insertedRow -i)) {
      if(checkMatchDisc(column+ i, insertedRow - i) )
        countDiscs++;
    }
    if(direction.includes('LB') && isCellExist(column-i, insertedRow +i)) {
      if(checkMatchDisc(column- i, insertedRow + i))
        countDiscs++;
    }
    if(direction.includes('LT')  && isCellExist(column-i, insertedRow -i)) {
      if(checkMatchDisc(column- i, insertedRow - i))
        countDiscs++;
    }


  }
  if( countDiscs >= 4)
    return true; 
  return false;
}
//checking if there is a win in Horizontal
function checkHorizon ( insertedRow){
  let count=0;
  for(let i=0; i<maxCols ; i++){
    if(checkMatchDisc(i,insertedRow))
      count++;
    else 
      count=0;
    if(count>=4) {
      console.log(currPlayer + " Win!");
      return true;
    }
  }
  console.log('Not Horizontally');
  return false;
}
//checking if there is a win in Vertical
function checkVertical ( insertedCol ){
  let count=0;
  for(let i=0; i<maxRows ; i++){
    if(checkMatchDisc(insertedCol,i))
      count++;
    else 
      count=0;
    if(count>=4){
      console.log(currPlayer + " Win!");
      return true;
    }
  }
  console.log('Not Verically');
  return false;
}
// the function that will happen if some1 won
function Won()  {
  document.querySelector('h3').innerHTML = currPlayer + " Won !!";
  document.querySelector('button').style.visibility ='visible';
  currPlayer = '';
}
// clear table after clicking reset Game
function clearTable()  {
  // after someone is winning
  let allTds = document.querySelectorAll('td');
  for(let i=0; i<allTds.length; i++)   {
      allTds[i].removeAttribute('style');
  }
  for(let i=0; i<maxRows; i++)  {
      for(let j=0; j<table[i].length;j++) {
        table[i][j] = 0;
      }
  }
  whoStarts();
  document.querySelector('button').style.visibility = 'hidden';
}





















function checkForVictory(row,col){
    debugger;
    if(getAdj(row,col,0,1)+getAdj(row,col,0,-1) > 2){
      return true;
    } else {
      if(getAdj(row,col,1,0) > 2){
        return true;
      } else {
        if(getAdj(row,col,-1,1)+getAdj(row,col,1,-1) > 2){
          return true;
        } else {
          if(getAdj(row,col,1,1)+getAdj(row,col,-1,-1) > 2){
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }

function cellVal(row,col){
    debugger;
    if(table[row] == undefined || table[row][col] == undefined){
      return -1;
    } else {
      return table[row][col];
    }
  }

  function getAdj(row,col,row_inc,col_inc){
    debugger;

    if(cellVal(row,col) == cellVal(row+row_inc,col+col_inc)){
      return 1+getAdj(row+row_inc,col+col_inc,row_inc,col_inc);
    } else {
      return 0;
    }
  }


  function checkForMoveVictory(){
    if(!checkForVictory(currentRow,currentCol)){
      placeDisc(3-currentPlayer);
    } else {
      var ww = currentPlayer == 2 ? 'Computer' : 'Player';
      placeDisc(3-currentPlayer);
      alert(ww+" win!");
      board.innerHTML = "";
      newgame();
    }
  }