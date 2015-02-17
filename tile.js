/** 
 * Minesweeper board tile
 * UNKNOWN : Tile has not been clicked so its contents is not known
 * EMPTY : Tile is not a mine and is not a neighbour of any mines
 * ONE - EIGHT : Tile is a neighbour of some number of mines. The number of mines is the value of the number
 * MINE : Tile is a mine.
 * FLAGGED : Tile is flagged as a suspected mine
 * @author Rachel Wiens
 *
 */
 
 /**
 * Constructor for Tile "class"
 * @param: int n
 */
function Tile(n) {
	this.number = n;
    return this;
}
	
/**
 * @num {number}
 */
Tile.TileEnum = { 
	UNKNOWN: -1, 
	EMPTY: 0,  
	ONE: 1, TWO: 2 , THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, 
	MINE: 9,
	FLAGGED: 10
};

/**
 * @param int n
 * @return Tile
 */
Tile.prototype.getTile = function(n) {
	switch(n){
		case 0:
			return Tile.TileEnum.EMPTY;
		case 1:
			return Tile.TileEnum.ONE;
		case 2:
			return Tile.TileEnum.TWO;
		case 3:
      return Tile.TileEnum.THREE;
    case 4:
			return Tile.TileEnum.FOUR;
		case 5:
			return Tile.TileEnum.FIVE;
		case 6:
			return Tile.TileEnum.SIX;
		case 7:
			return Tile.TileEnum.SEVEN;
		case 8:
			return Tile.TileEnum.EIGHT;
		case 9:
			return Tile.TileEnum.MINE;
		case 10:
			return Tile.TileEnum.FLAGGED;
		default:
			return Tile.TileEnum.UNKNOWN;
	}
}

/**
 * @return int
 */
Tile.prototype.getNumber = function() {
	return this.number;
}

/** 
 * @return String
 */
 Tile.prototype.toString = function() {
	switch(this.number){
		case Tile.TileEnum.UNKNOWN:
			return " ";
		case Tile.TileEnum.MINE:
			return "*";
		case Tile.TileEnum.FLAGGED: 
			return "X";
		default:
			return this.number.toString();
	}
}

