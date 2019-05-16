class Player {
  constructor(name, id, color, active = false) { 
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active; // boolean with default value of false
    this.tokens = this.createTokens(21); 
  }

  /**
   * Creates token objects for player
   * @param     {integer}   num - number of token objects to be created
   * @returns   {Array}     tokens - an array of new token objects
   */
  createTokens(num) {
    const tokens = [];
    for (let index = 0; index < num; index++) {
      const token = new Token(index, this);
      tokens.push(token);
    }
    return tokens;
  }

  /** 
  * Gets all tokens that haven't been dropped.
  * @returns {Array}  an array of unused tokens.
  */
  get unusedTokens(){
    return this.tokens.filter(token => token.dropped === false);
  }

  /**
   * Gets the active token by returning the first token in the array of unused tokens.
   * @returns {Object} First token object in the array of unused tokens.
   */
  get activeToken(){
    return this.unusedTokens[0]; // using one getter within another
  }

  /**
   * Check if a player has any undropped tokens left
   * @return {Boolean}
   */
  checkTokens(){
    // return Boolean(this.unusedTokens[0]);
    return (this.unusedTokens.length === 0) ? false : true;
  }
}