// creating a single game instance
const game = new Game();

// listening for any start button presses to start a game
document.querySelector('button').addEventListener('click', () => {
    game.startGame();
})