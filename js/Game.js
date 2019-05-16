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
  checkForWin(spaces, targetSpace, activeToken, activePlayer){
    
    // flatten 2D array spaces into a 1D array of all spaces:
    const arrayOfAllSpaces = spaces.reduce((accArray, column) => {
      return [...accArray, ...column];
    }, []);

    // filter 1D array of spaces by activePlayer ownership:
    const spacesOwnedByActivePlayer = arrayOfAllSpaces.filter(space => space.owner === activePlayer);

    // use space x and y properties to check for victory streaks in each possible direction:
    // check for vertical down victory:
    const verticalDown = [];
    let incrementor = 1;
    for (space of spacesOwnedByActivePlayer) {
      if (space.y === activeSpace.y + incrementor) {
        verticalDown.push(space);
      }
      incrementor++;
    }
    //check if direction array contains at least 4 in a row:
    if (verticalDown.length >= 4) {
      // call gameover method
    }

    // check for horizontal left victory:
    incrementor = 1; // reset incrementor





    /* const verticaldown = [];
    const horizLeft = [];
    const horizRight = [];
    const diagUpLeft = [];
    const diagUpRight = [];
    const diagDownLeft = [];
    const diagDownRight = [];


    for (let column of spaces) {
      for (let space of column) {

      }
    } */
    // check vertical (would have to be going downwards from target space, so Y + 1)
   /*  if ( &&  &&  && ) */
      // activeToken.columnLocation
      // const targetColumn = spaces[activeToken.columnLocation]
      // targetColumn.indexOf(targetSpace)
    // space.owner (call the get owner method on Space)

    // each space has an x and y property that corresponds to its position in the grid
    // from each targetSpace, need to identify the rows of four spaces in each direction, and turn each into an array
        //vertical array
        /* const vertArray = targetColumn.filter(space => space.y >= targetSpace.y);
        const horiArray = [];
        spaces.forEach(column => {
          const spaceOnSameRow = column.filter(space => space.y === targetSpace.y);
          horiArray.push(spaceOnSameRow[0]);
        }); */
    // then loop over each array checking to see if every owner === targetSpace.owner
    // 
  }
}