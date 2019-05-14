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
  * @returns {array}  an array of unused tokens
  */
  get unusedTokens(){
    return this.tokens.filter(token => token.dropped === false);
  }

  get activeToken(){
    return this.unusedTokens[0];
  }
}