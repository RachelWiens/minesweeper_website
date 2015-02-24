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
    // initialize minefield
	// minefield = array of mines. Element is true if it is a mine, false otherwise
    this.minefield = new Array(boardHeight);
    for( var k=0; k<boardHeight; k++ ){
        this.minefield[k] = new Array(boardLength);
    }

    // Function to shuffle mines. Resets the board to all false, then randomly adds numMines mines.
	this.shuffleMines = function() {
		// clear board
		this.board.clearBoard();
		for( var i=0; i<boardHeight; i++ ){
			for( var j=0; j<boardLength; j++ ){
				this.minefield[i,j] = false;				
			}
		}		
		// add mines at random locations
		var minesAdded = 0;
		while( minesAdded < this.numMines ){
			var i = Math.random()*this.boardLength;
			var j = Math.random()*this.boardHeight;
			if( !this.minefield[i,j] ){
				this.minefield[i,j] = true;
				minesAdded++;
			}
		}
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
 * @return Minesweeper
 */
Minesweeper.prototype.beginnerGame = function() {
    return Minesweeper(10,10, 20);
}
	
/**
 * Start a Intermediate's level game
 * @return Minesweeper
 */
 Minesweeper.prototype.intermediateGame = function() {
	return Minesweeper(25,25, 125);
}
	
/**
 * Get the board
 * @return Tile[][]
 */
Minesweeper.prototype.getBoard = function() {
	return this.board.getBoard();
}
	
/**
 * Get the board length
 * @return int
 */
Minesweeper.prototype.getBoardLength = function() {
	return this.boardLength;
}
	
/**
 * Get the board height
 * @return int
 */
Minesweeper.prototype.getBoardHeight = function() {
	return this.boardHeight;
}
	
/** 
 * assign mines randomly to the minefield. A total of numMines is required.
 */
Minesweeper.prototype.shuffleMines = function() {
	// clear board
	this.board.clearBoard();
	for( var i=0; i<boardHeight; i++){
		for(var j=0; j<boardLength; j++){
			this.minefield[i,j] = false;				
		}
	}		
	// add mines at random locations
	var minesAdded = 0;
	while( minesAdded < this.numMines ){
		var i = Math.random()*this.boardLength;
		var j = Math.random()*this.boardHeight;
		if( !this.minefield[i,j] ){
			this.minefield[i,j] = true;
			minesAdded++;
		}
	}
}
	
/** 
 * Flag a tile if it is unknown.
 * Unflag a tile if it is flagged.
 * Do nothing otherwise
 * @param int i
 * @param int j
 */
 Minesweeper.prototype.flag = function(i, j) {
	var tile = this.board.getTile(i, j);
	if( tile == Tile.TileEnum.UNKNOWN){
		this.board.setTile(i, j, Tile.TileEnum.FLAGGED);
	} else if (tile == Tile.TileEnum.FLAGGED){
		this.board.setTile(i, j, Tile.TileEnum.UNKNOWN);
	}
}
	
/** 
 * If all non-mine tiles are revealed (not UNKNOWN), game has been won and true is returned.
 * Otherwise, returns false.
 * @return boolean
 */
Minesweeper.prototype.isGameWon = function() {
	for( var i=0; i<this.boardHeight; i++){
		for(var j=0; j<this.boardLength; j++){
			if( (this.board.getTile(i,j) == Tile.TileEnum.UNKNOWN) && (this.minefield[i,j] == false) ) return false;		// if tile is unrevealed and not a mine, game is not over		
		}
	}
	return true;
}
	
/**
 * Reveal a tile (set it to its real value)
 * @param int i
 * @param int j
 */
 Minesweeper.prototype.revealTile = function(i, j) {
	if( this.minefield[i,j] ){				// if tile is a mine
		this.board.setTile(i,j, Tile.TileEnum.MINE);
		return;
	}
		
	// tile is not a mine, so count the number of mines around it
	var numMines = 0;			// number of mines bordering the tile
	for(var k=-1; k<2; k++){	// check board[i][j]'s horizontal, vertical, and diagonal neighbours
		for( var l=-1; l<2; l++){
			if( (i+k >= 0) && (i+k < this.boardHeight) && (j+l >=0) && (j+l < this.boardLength)  ){		// if index is within bounds
				if( this.minefield[i+k,j+l] ) numMines++;	
			}
		}
	}
		
	this.board.setTile(i,  j, Tile.getTile(this.numMines));		
}

/**
 * Reveal all neighbours to a tile
 * @param int i
 * @param int j
 */	
Minesweeper.prototype.revealNeighbours = function(i, j) {
	for(var k=-1; k<2; k++){	// check [i][j]'s horizontal, vertical, and diagonal neighbours
		for( var l=-1; l<2; l++){
			if( (i+k >= 0) && (i+k < this.boardHeight) && (j+l >=0) && (j+l < this.boardLength)  ){		// if index is within bounds
				if( this.board.getTile(i+k, j+l) == Tile.TileEnum.UNKNOWN ){		// if tile is unknown, set it and check its neighbours
					this.revealTile(i+k, j+l);	// reveal tile
					if (this.board.getTile(i+k, j+l) == Tile.TileEnum.EMPTY) this.revealNeighbours(i+k, j+l); // if tile is empty, continue revealing its neighbours
				}
			}
		}
	}
}
	
/** 
 * Reveal a block and its relevant neighbours.
 * If the block is not unknown (ex. flagged, empty, number is already known) do nothing.
 * If the game is over, return false. Otherwise return true
 * @param int i
 * @param int j
 * @return boolean
 */
Minesweeper.prototype.makeMove = function(i, j) {
	if( i<0 || j<0 || i>this.boardHeight || j>this.boardLength ) return true;		// outside bounds
	var tile = this.board.getTile(i, j);
	if( tile != Tile.TileEnum.UNKNOWN ) return true;		// if value of tile is already known, do nothing and return
		
	this.revealTile(i,j);
		
	if( this.board.getTile(i,j)  == Tile.TileEnum.MINE){			// if a mine has been hit
		return false;
	} else if (this.board.getTile(i,j)  == Tile.TileEnum.EMPTY){		// if tile is empty, continue revealing its neighbours
		this.revealNeighbours(i, j);
	}
		
	return !this.isGameWon();		// returns false if the game has been won		
}
