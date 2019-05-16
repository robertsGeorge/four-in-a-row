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
   * Switches active player.
   */
  switchPlayers(){
    this.players.forEach(player => player.active = !player.active);
    /*
    Tutor's solution:
    for (let player of this.players) {
      player.active = (player.active === true) ? false : true;
    }
    */
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
      activeToken.drop(targetSpace, function(){
        // callbback function code here
      });
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
   * Checks if there is a winner on the board after each token drop.
   * @param   {Object}    target - targeted space for dropped token.
  * @returns  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
   */
  checkForWin(target){
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x][y+1].owner === owner && 
                this.board.spaces[x][y+2].owner === owner && 
                this.board.spaces[x][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++ ){
        for (let y = 0; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x+1][y].owner === owner && 
                this.board.spaces[x+2][y].owner === owner && 
                this.board.spaces[x+3][y].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y+1].owner === owner && 
                this.board.spaces[x-2][y+2].owner === owner && 
                this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y-1].owner === owner && 
                this.board.spaces[x-2][y-2].owner === owner && 
                this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
            }           
        }
    }

    return win;
  }


  /**
   * Updates game state after token is dropped
   * @param {Object} token  -  The token that's being dropped.
   * @param {Object} target -  Targeted space for dropped token. 
   */
  updateGameState(token, target){
    target.mark(token);
    if (this.checkForWin(target)) {
      this.gameOver(`${this.activePlayer} is the winner! Game over!`);
    } else {
      this.switchPlayers();
    }
    if (this.activePlayer.checkTokens()) { // would it be null or undefined?
      this.activePlayer.activeToken.drawHTMLToken();
      this.ready = true;
    } else {
      this.gameOver(`You have no tokens left. Game over!`);
    }
  }


  /**
   * Displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver(message){
    const messageHolder = document.getElementById('game-over');
    messageHolder.style.display = 'block';
    messageHolder.textContent = message;
  }

  // /**
  //  * Checks if there is a winner on the board after each token drop.
  //  * @param {array} spaces the 2D array of all spaces @ this.board.spaces
  //  * @param {Object} activePlayer the active player
  //  */
  // checkForWin(spaces, activePlayer){
    
  //   // flatten 2D array spaces into a 1D array of all spaces:
  //   const arrayOfAllSpaces = spaces.reduce((accArray, column) => {
  //     return [...accArray, ...column];
  //   }, []);

  //   // filter 1D array of spaces by activePlayer ownership:
  //   const spacesOwnedByActivePlayer = arrayOfAllSpaces.filter(space => space.owner === activePlayer);

  //   // use space x and y properties to check for victory streaks in each possible direction:
  //   // check for vertical down victory:
  //   const verticalDown = [];
  //   let incrementor = 1;
  //   for (space of spacesOwnedByActivePlayer) {
  //     if (space.y === activeSpace.y + incrementor) {
  //       verticalDown.push(space);
  //     }
  //     incrementor++;
  //   }
  //   //check if direction array contains at least 4 in a row:
  //   if (verticalDown.length >= 4) {
  //     // call gameover method / winner alert
  //   }

  //   // repeat above code (from 'const verticalDown = []' onwards) for the different directions.
  // }

}