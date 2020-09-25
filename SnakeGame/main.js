let game;
document.querySelector('button').addEventListener('click', () => {
    game = new Game();
    game.startGame();
})