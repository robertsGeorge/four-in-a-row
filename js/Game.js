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
   * Gets game ready for play
   */
  startGame(){

  }
}