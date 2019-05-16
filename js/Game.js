class Game {
  constructor(){
    this.board = new Board(); // instantiate new board object from the class blueprint
    this.players = this.createPlayers();
    this.ready = false;
  }


  /**
   * Creates two player objects
   * @returns {Array}   An array of two Player objects
   */
  createPlayers(){
    const players = [new Player('Player_1', 1, '#e15258', true), // args: name, id, color, active-state
                      new Player('Player_2', 2, '#e59a13', false)];
    return players;
  }
  

  /**
   * Returns active player.
   * @returns {Object}  player - The active player.
   */
  get activePlayer(){
    // use .find() because it returns a single value, not an array
    return this.players.find(player => player.active);
  }


  /**
   * Puts the game in a ready state
   */
  startGame(){
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Finds Space object to drop Token into, drops Token
   */
  playToken(){
    const spaces = this.board.spaces;
    const activeToken = this.activePlayer.activeToken;
    // use columnLocation property to return an index value, to identify the relevant column array in spaces 2D array
    const targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;
    
    // loop through targetColumn array checking for a space that haven't been assigned a token
    // if one is found, assign it to targetSpace
    for (let space of targetColumn) {
      if (space.token === null) {
        targetSpace = space;
      }
    }
    // if there is a targetSpace (i.e. targetColumn is not already full):
    if (targetSpace !== null) {
      this.ready = false;
      activeToken.drop(targetSpace);
    } 
  }


  /**
   * Branches code, depending on what key player presses
   * @param {object} event - keydown event object
   */
  handleKeydown(event){
    if (this.ready) {
      if (event.key === 'ArrowLeft') {
        this.activePlayer.activeToken.moveLeft();
      } else if (event.key === 'ArrowRight') {
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (event.key === 'ArrowDown') {
        game.playToken();
      }
    }
  }

  /**
   * checks for win. four tokens owned by same player in a horizontal, vertical or diagonal row.
   * 
   */
  checkForWin(){
    
  }
}