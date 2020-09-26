// this is a main class of this project
// it connects all of the previous classes to execute a full game including all background calculations and visualization
class Game {
    constructor(boardSizeHorizontal = 21, boardSizeVertical = 21) {
        this.snakeObject = new SnakeBody();
        this.appleGenerator = new Apple();
        this.renderingTool = new RenderingTool();
    }

    makeMove(direction) {
        //this method aims to perform a single step in a game: moving/eating+moving/biting on a wall or itself and losing
        this.snakeObject.changeDirection(direction);
        let estimatedHead = this.snakeObject.getBodyCoords()[0];
        const apple = this.appleGenerator.getAppleCoords()
        if (direction === 'north') {
            estimatedHead.y = estimatedHead.y - 1;
        } else if (direction === 'south'){
            estimatedHead.y = estimatedHead.y + 1;
        } else if (direction === 'east') {
            estimatedHead.x = estimatedHead.x + 1;
        } else if (direction === 'west') {
            estimatedHead.x = estimatedHead.x - 1;
        }
        if (estimatedHead.x == apple.x && estimatedHead.y == apple.y) {
            this.snakeObject.eat();
            this.appleGenerator.generateNewApple(this.snakeObject.getBoardFieldState());
            this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), null, apple);
        } else {
            const tail = this.snakeObject.move();
            this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), tail, null);
        }
    }

    startGame() {
        // reseting board
        this.renderingTool.resetBoard();

        // initiating snake
        this.snakeObject.initiateBody();

        let currentDirectionIntent = 'north';

        // listening for any direction changes
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    currentDirectionIntent = 'north';
                    break;
                case 'ArrowDown':
                    currentDirectionIntent = 'south';
                    break;
                case 'ArrowLeft':
                    currentDirectionIntent = 'west';
                    break;
                case 'ArrowRight':
                    currentDirectionIntent = 'east';
                    break;
            }
        })

        // initiating apple
        this.appleGenerator.generateNewApple(this.snakeObject.getBoardFieldState());

        // initiating board
        this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), null, null);
        
        // setting acutal game with moves every 100 miliseconds
        let intervalIndex = setInterval(() => {
            if (!this.snakeObject.checkLifeState()) {
                clearInterval(intervalIndex);
            }
            this.makeMove(currentDirectionIntent);
        }, 150)
        
    }
}