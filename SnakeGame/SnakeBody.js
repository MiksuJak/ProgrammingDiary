class SnakeBody {
    constructor(initialSnakeLength = 3, boardSizeHorizontal = 21, boardSizeVertical = 21) {
        const headCoords = {x: Math.floor(boardSizeHorizontal/2), y: Math.floor(boardSizeVertical/2)}
        const snakeBodyCoords = [headCoords, {x: headCoords.x, y: headCoords.y+1}, {x: headCoords.x, y: headCoords.y+2}]
        const boardFieldsState = [...Array(boardSizeHorizontal)].map(a => Array(boardSizeVertical).fill(0));
        // adding snake to boardFields (This is neccesary for optimal generation of apples on the board)
        boardFieldsState[snakeBodyCoords[0].x][snakeBodyCoords[0].y] = 1;
        boardFieldsState[snakeBodyCoords[1].x][snakeBodyCoords[1].y] = 1;
        boardFieldsState[snakeBodyCoords[2].x][snakeBodyCoords[2].y] = 1;
        
        let direction = 'north';
        this.alive = true;

        this.getBodyCoords = () => snakeBodyCoords;
        // moving method
        this.move = () => {
            if (!this.alive) return;
            let estimatedNextBlock;
            const headCoords = snakeBodyCoords[0];
            switch (direction) {
                case 'north':
                    estimatedNextBlock = {x: headCoords.x, y: headCoords.y - 1};
                    break;
                case 'south':
                    estimatedNextBlock = {x: headCoords.x, y: headCoords.y + 1};
                    break;
                case 'east':
                    estimatedNextBlock = {x: headCoords.x + 1, y: headCoords.y};
                    break;
                case 'west':
                    estimatedNextBlock = {x: headCoords.x - 1, y: headCoords.y};
                    break;
            }
            // death by wall
            if (estimatedNextBlock.x == boardSizeHorizontal || estimatedNextBlock.y == boardSizeVertical || estimatedNextBlock.x < 0 || estimatedNextBlock.y < 0){
                this.alive = false;
                return;
            }
            // death by biting itself
            snakeBodyCoords.forEach(block => {
                if (block.x == estimatedNextBlock.x && block.y == estimatedNextBlock.y){
                    this.alive = false;
                    return;
                }
            })
            // actually moving, if conditions above were passed
            const snakeTail = snakeBodyCoords.pop(); // used to remove a state from boardFieldsState
            boardFieldsState[snakeTail.x][snakeTail.y] = 0;
            snakeBodyCoords.unshift(estimatedNextBlock);
            boardFieldsState[estimatedNextBlock.x][estimatedNextBlock.y] = 1;
            return snakeTail;
        }
        // eating method
        this.eat = () => {
            if (!this.alive) return;
            let estimatedNextBlock;
            const headCoords = snakeBodyCoords[0];
            switch (direction) {
                case 'north':
                    estimatedNextBlock = {x: headCoords.x, y: headCoords.y - 1};
                    break;
                case 'south':
                    estimatedNextBlock = {x: headCoords.x, y: headCoords.y + 1};
                    break;
                case 'east':
                    estimatedNextBlock = {x: headCoords.x + 1, y: headCoords.y};
                    break;
                case 'west':
                    estimatedNextBlock = {x: headCoords.x - 1, y: headCoords.y};
                    break;
            }
            snakeBodyCoords.unshift(estimatedNextBlock);
            boardFieldsState[estimatedNextBlock.x][estimatedNextBlock.y] = 1;
            return estimatedNextBlock;
        }
        // change direction - note that this direction is distinct from direction we input by keyboard! This direction changes only before moving. There is a small time window for a player to switch directions few times before last one chosen advances to this snake module.
        this.changeDirection = (newDirection) => {
            if (newDirection === 'north' && direction === 'south') return;
            if (newDirection === 'south' && direction === 'north') return;
            if (newDirection === 'east' && direction === 'west') return;
            if (newDirection === 'west' && direction === 'east') return;
            direction = newDirection;
        }

        this.getDirection = () => direction;

        this.getFieldStates = () => boardFieldsState;
    }
}

//export {SnakeBody};