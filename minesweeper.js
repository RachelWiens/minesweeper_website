/**
 * Minesweeper game
 * @author Rachel Wiens
 *
 */


/**
 * Constructor for Minesweeper "class"
 */
function Minesweeper(boardHeight, boardLength, numMines) {
  this.boardHeight = boardHeight;
  this.boardLength = boardLength;
  this.numMines = numMines;
  this.board = new Board(this.boardHeight, this.boardLength, this.numMines);
  // minefield = array of mines. Element is true if it is a mine, false otherwise
  this.minefield = new Array(boardHeight);
  for( var k=0; k<boardHeight; k++ ){
    this.minefield[k] = new Array(boardLength);
  }
  // add mines to minefield
  this.shuffleMines();
  return this;
}

    
/**
 * Start a new game with the same board dimensions and number of mines as the previous game
 */
Minesweeper.prototype.newGame = function() {
    this.shuffleMines();
}
  
/**
 * Start a Beginner's level game
 * @return {Minesweeper}
 */
Minesweeper.prototype.beginnerGame = function() {
    return Minesweeper(10,10, 20);
}
  
/**
 * Start a Intermediate's level game
 * @return {Minesweeper}
 */
 Minesweeper.prototype.intermediateGame = function() {
  return Minesweeper(25,25, 125);
}
  
/**
 * Get the board
 * @return {Array<Array<Tile>>}
 */
Minesweeper.prototype.getBoard = function() {
  return this.board.getBoard();
}
  
/**
 * Get the board length
 * @return {number}
 */
Minesweeper.prototype.getBoardLength = function() {
  return this.boardLength;
}
  
/**
 * Get the board height
 * @return {number}
 */
Minesweeper.prototype.getBoardHeight = function() {
  return this.boardHeight;
}
  
/**
 * Shuffle mines. Resets the board to all false, then randomly adds numMines mines.
 * @private
 */
Minesweeper.prototype.shuffleMines = function() {
  // clear board
  this.board.clearBoard();
  for( var i=0; i<boardHeight; i++){
    var row = this.minefield[i];
    for(var j=0; j<boardLength; j++){
      row[j] = false;        
    }
  }    
  // add mines at random locations
  var minesAdded = 0;
  while( minesAdded < this.numMines ){
    var i = Math.floor(Math.random()*this.boardLength);
    var j = Math.floor(Math.random()*this.boardHeight);
    if( !this.minefield[i][j] ){
      this.minefield[i][j] = true;
      minesAdded++;
    }
  }
}
  
/** 
 * Flag a tile if it is unknown.
 * Unflag a tile if it is flagged.
 * Do nothing otherwise
 * @param {number} i
 * @param {number} j
 */
Minesweeper.prototype.flag = function(i, j) {
  var tile = this.board.getTile(i, j);
  if( tile.equals(Tile.TileType.UNKNOWN) ){
    this.board.setTile(i, j, Tile.TileType.FLAGGED);
  } else if( tile.equals(Tile.TileType.FLAGGED) ){
    this.board.setTile(i, j, Tile.TileType.UNKNOWN);
  }
}
  
/** 
 * Returns true if a tile is flagged.
 * @param {number} i
 * @param {number} j
 * @return {boolean}
 */
Minesweeper.prototype.isFlagged = function(i, j) {
  return this.board.getTile(i, j).equals(Tile.TileType.FLAGGED);
}
  
/** 
 * If all non-mine tiles are revealed (not UNKNOWN), game has been won and true is returned.
 * Otherwise, returns false.
 * @return {boolean}
 */
Minesweeper.prototype.isGameWon = function() {
  for( var i=0; i<this.boardHeight; i++){
    for(var j=0; j<this.boardLength; j++){
      if( (this.board.getTile(i,j)).equals(Tile.TileType.UNKNOWN) && (this.minefield[i][j] == false) ) return false;    // if tile is unrevealed and not a mine, game is not over    
    }
  }
  return true;
}
  
/**
 * Reveal a tile (set it to its real value)
 * @param {number} i
 * @param {number} j
 * @return {boolean} that is false if the tile is a mine, and true otherwise. 
 */
Minesweeper.prototype.revealTile = function(i, j) {
  if( this.minefield[i][j] ){        // if tile is a mine
    this.board.setTile(i,j, Tile.TileType.MINE);
    return false;
  }
    
  // tile is not a mine, so count the number of mines around it
  var numNeighbouringMines = 0;      // number of mines bordering the tile
  for(var k=-1; k<2; k++){  // check board[i][j]'s horizontal, vertical, and diagonal neighbours
    for( var l=-1; l<2; l++){
      if( (i+k >= 0) && (i+k < this.boardHeight) && (j+l >=0) && (j+l < this.boardLength)  ){    // if index is within bounds
        if( this.minefield[i+k][j+l] ) numNeighbouringMines++;  
      }
    }
  }
  this.board.setTile(i,  j, Tile.getTile(numNeighbouringMines));    
  return true;
}

/**
 * Reveal all neighbours to a tile
 * @param {number} i
 * @param {number} j
 */  
Minesweeper.prototype.revealNeighbours = function(i, j) {
  for(var k=-1; k<2; k++){  // check [i][j]'s horizontal, vertical, and diagonal neighbours
    for( var l=-1; l<2; l++){
      if( (i+k >= 0) && (i+k < this.boardHeight) && (j+l >=0) && (j+l < this.boardLength)  ){    // if index is within bounds
        var tile = this.board.getTile(i+k, j+l);
        if( tile.equals(Tile.TileType.UNKNOWN) ){    // if tile is unknown, set it and check its neighbours
          this.revealTile(i+k, j+l);  // reveal tile
          tile = this.board.getTile(i+k, j+l);
          if( tile.equals(Tile.TileType.EMPTY) ) this.revealNeighbours(i+k, j+l); // if tile is empty, continue revealing its neighbours
        }
      }
    }
  }
}
  
/** 
 * Reveal a block and its relevant neighbours.
 * If the block is not unknown (ex. flagged, empty, number is already known) do nothing.
 * @param {number} i
 * @param {number} j
 * @return {boolean} If the game is over, return false. Otherwise return true.
 */
Minesweeper.prototype.makeMove = function(i, j) {
  if( i<0 || j<0 || i>this.boardHeight || j>this.boardLength ) return true;    // outside bounds
  var tile = this.board.getTile(i, j);
  if( ! tile.equals(Tile.TileType.UNKNOWN) ) return true;    // if value of tile is already known, do nothing and return
    
  if( !this.revealTile(i,j) ){      // if a mine has been hit
    return false;
  } 
  tile = this.board.getTile(i, j);
  if( tile.equals(Tile.TileType.EMPTY) ){    // if tile is empty, continue revealing its neighbours
    this.revealNeighbours(i, j);
  }
    
  return !this.isGameWon();    // returns false if the game has been won    
}
