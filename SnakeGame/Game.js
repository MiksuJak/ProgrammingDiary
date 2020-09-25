class Game {
    constructor(boardSizeHorizontal = 21, boardSizeVertical = 21) {
        this.snakeObject = new SnakeBody();
        this.appleGenerator = new Apple();
        this.renderingTool = new Render();
    }

    makeMove(direction) {
        //this method aims to perform a single step in a game: moving/eating+moving/biting on a wall or itself and losing
        this.snakeObject.changeDirection(direction);
        const currHead = this.snakeObject.getBodyCoords()[0];
        let estimatedHead = {x: currHead.x, y: currHead.y};
        const apple = Object.assign({}, this.appleGenerator.getAppleCoords());
        if (direction === 'north') {
            estimatedHead.y = currHead.y - 1;
            estimatedHead.x = currHead.x;
        } else if (direction === 'south'){
            estimatedHead.y = currHead.y + 1;
            estimatedHead.x = currHead.x;
        } else if (direction === 'east') {
            estimatedHead.y = currHead.y;
            estimatedHead.x = currHead.x + 1;
        } else if (direction === 'west') {
            estimatedHead.y = currHead.y;
            estimatedHead.x = currHead.x - 1;
        }
        if (estimatedHead.x == apple.x && estimatedHead.y == apple.y) {
            this.snakeObject.eat();
            this.appleGenerator.generateNewApple(this.snakeObject.getFieldStates());
            this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), null, apple);
        } else {
            const tail = this.snakeObject.move();
            this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), tail, null);
        }
    }

    startGame() {
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
        //initiating board
        this.appleGenerator.generateNewApple(this.snakeObject.getFieldStates());
        this.renderingTool.putElementsOnBoard(this.snakeObject.getBodyCoords(), this.appleGenerator.getAppleCoords(), null, null);
        
        let intervalIndex = setInterval(() => {
            if (!this.snakeObject.alive) {
                clearInterval(intervalIndex);
            }
            this.makeMove(currentDirectionIntent);
        }, 150)
        
    }
}