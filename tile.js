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
 * @param: {number} n
 */
function Tile(n) {
  this.number = n;
  return this;
}
  
/**
 * @enum {number}
 */
Tile.TileEnum = { 
  UNKNOWN: -1, 
  EMPTY: 0,  
  ONE: 1, TWO: 2 , THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, 
  MINE: 9,
  FLAGGED: 10
};

/**
 * @enum {Tile}
 */
Tile.TileType = {
  UNKNOWN: new Tile(Tile.TileEnum.UNKNOWN), 
  EMPTY: new Tile(Tile.TileEnum.EMPTY),  
  ONE: new Tile(Tile.TileEnum.ONE),
  TWO: new Tile(Tile.TileEnum.TWO),
  THREE: new Tile(Tile.TileEnum.THREE),
  FOUR: new Tile(Tile.TileEnum.FOUR),
  FIVE: new Tile(Tile.TileEnum.FIVE),
  SIX: new Tile(Tile.TileEnum.SIX),
  SEVEN: new Tile(Tile.TileEnum.SEVEN),
  EIGHT: new Tile(Tile.TileEnum.EIGHT), 
  MINE: new Tile(Tile.TileEnum.MINE),
  FLAGGED: new Tile(Tile.TileEnum.FLAGGED)

}

/**
 * @param {number} n
 * @return {Tile}
 */
Tile.getTile = function(n) {
  if( n >= 0 && n <= 10 ) {
    return new Tile(n);
  }
  return Tile.TileType.UNKNOWN;
}

/**
 * @return {number}
 */
Tile.prototype.getNumber = function() {
  return this.number;
}

/**
 * @param {Tile}
 * @return boolean
 */
Tile.prototype.equals = function(otherTile) {
    return ( this.number == otherTile.getNumber() );
}


/** 
 * @return {string}
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

