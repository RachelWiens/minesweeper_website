/**
 * Minesweeper board
 * @author Rachel Wiens
 *
 */
 
 
/**
 * Constructor for Board "class"
 */
function Board(boardHeight, boardLength, numMines) {
	this.height = boardHeight;
	this.length = boardLength;
	this.totalMines = numMines;
	this.board = [];
	this.clearBoard();				//initialize board to unknowns 
    return this;
}
	
/**
 * Change all board tiles to UNKNOWN
 */
Board.prototype.clearBoard = function() {
	for( var i=0; i<this.height; i++){
        this.board[i] = [];
		for(var j=0; j<this.length; j++){
			this.board[i][j]= new Tile(Tile.TileEnum.UNKNOWN);
		}
	}
}

/**
 * Set a board tile's value
 * @param int i
 * @param int j
 * @param Tile newTile
 */
Board.prototype.setTile = function(i, j, newTile) {
	this.board[i][j] = newTile;
}

/**
 * Get a board tile's value
 * @param int i
 * @param int j
 * @return Tile
 */
Board.prototype.getTile = function(i, j) {
	return this.board[i][j];
}

/**
 * Get the board
 * @return Tile[][]
 */
Board.prototype.getBoard = function() {
	return this.board;
}
