const game = new Game();


/**
 * Listens for click on '#begin-game' and calls startGame() on game object
 */
document.querySelector('#begin-game').addEventListener('click', function() {
  game.startGame();
  this.style.display = 'none';
  document.getElementById('play-area').style.opacity = '1';
});

/**
 * listen for keydown event and call handleKeydown() method on Game object
 */
document.addEventListener('keydown', (event) => game.handleKeydown(event));
// document.addEventListener('keydown', game.handleKeydown); // does this work instead?
/* 
TUTORS VERSION: 
document.addEventListener('keydown', function(event){
  game.handleKeydown(event);
});
*/