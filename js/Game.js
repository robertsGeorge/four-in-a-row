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
   * Puts the game in a ready state
   */
  startGame(){
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
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
        // token should be dropped
      }
    }
  }


}