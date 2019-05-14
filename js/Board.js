class Board {
  constructor() {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

  /**
   * Generates 2D array of spaces.
   * @param {integer} rows 
   * @param {integer} cols 
   * @returns {array} spaces    an array of space objects
   */
  createSpaces() {
    const spaces = [];

    for (let x = 0; x < this.columns; x++) {
      const column = [];

      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x, y);     // needs x (1-6) and y (1-7) args
        column.push(space); 
      }

      spaces.push(column);
    }

    return spaces;
  }

  drawHTMLBoard(){
    for (let column of this.spaces) {
      for (let space of column) {
        space.drawSVGSpace();
      }
    }
    
    /* this.spaces.forEach(column => {
      column.forEach(space => space.drawSVGSpace());
    }); */
  }
}