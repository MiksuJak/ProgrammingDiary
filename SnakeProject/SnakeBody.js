// This class is made to contain all the snake body information: positions of all snake blocks, additionally board with taken/free fields (for apple's optimal generation), state of life, direction the snake faces
class SnakeBody {
    constructor(boardSizeHorizontal = 21, boardSizeVertical = 21) // these values may change one day, and would be much easier to use them as variables
    {
        const _snakeBodyCoords = [] // this is primarly empty, it needs to be initiated by one function which will also serve as a reset opportunity
        const _boardFieldState = [...Array(boardSizeHorizontal)].map(a => Array(boardSizeVertical).fill(0)); // this serves as taken/free field 2d array for optimal apple's generation

        // state of snake's life
        let _alive;
        // alive getter
        this.checkLifeState = () => {
            return _alive;
        }
        // alive setter (one way only!)
        this.killSnake = () => {
            _alive = false;
        }

        // direction the snake faces
        let _direction;

        // direction getter
        this.getDirection = () => direction;

        this.initiateBody = () => {
            // bringing snake to life :)
            _alive = true;
            _direction = 'north';

            // this serves as both, reset and first initiation. Initial snake is always of size 3
            _snakeBodyCoords.splice(0, _snakeBodyCoords.length);
            _boardFieldState.map(nestedArray => nestedArray.fill(0));
            const headCoords = {x: Math.floor(boardSizeHorizontal/2), y: Math.floor(boardSizeVertical/2)}
            _snakeBodyCoords.push(headCoords, {x: headCoords.x, y: headCoords.y+1}, {x: headCoords.x, y: headCoords.y+2})

            _boardFieldState[_snakeBodyCoords[0].x][_snakeBodyCoords[0].y] = 1;
            _boardFieldState[_snakeBodyCoords[1].x][_snakeBodyCoords[1].y] = 1;
            _boardFieldState[_snakeBodyCoords[2].x][_snakeBodyCoords[2].y] = 1;
        }
        // first body initiation
        this.initiateBody();

        // snake coords getter
        this.getBodyCoords = () => {
            // reassigning method will be followed throughout this project
            // as a private variable it is inconvenient to pass a pointer to the instance
            return _snakeBodyCoords.map(coords => Object.assign({}, coords));
        }

        // board fields state getter
        this.getBoardFieldState = () => {
            return Object.assign({}, _boardFieldState);
        }

        // setter for a new direction
        this.changeDirection = (newDirection) => {
            // these check conditions are made, so the user would not be able to turn snake 180 degrees at once, which is from game's point of view impossible
            if (newDirection === 'north' && _direction === 'south') return;
            if (newDirection === 'south' && _direction === 'north') return;
            if (newDirection === 'east' && _direction === 'west') return;
            if (newDirection === 'west' && _direction === 'east') return;
            _direction = newDirection;
        }

        // method used to casual snake movement (not including eating apples instance!), also contains cases of snake's death
        this.move = () => {
            if (!this.checkLifeState()) return;
            let estimatedNextBlock;
            const headCoords = this.getBodyCoords()[0];
            switch (_direction) {
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
                this.killSnake();
                return;
            }
            // death by biting itself
            _snakeBodyCoords.forEach(block => {
                if (block.x == estimatedNextBlock.x && block.y == estimatedNextBlock.y){
                    this.killSnake();
                    return;
                }
            })
            // actually moving, if conditions above were met
            const snakeTail = _snakeBodyCoords.pop(); // used to remove a state from boardFieldsState
            _boardFieldState[snakeTail.x][snakeTail.y] = 0;
            _snakeBodyCoords.unshift(estimatedNextBlock); // adding new block as a moving head
            _boardFieldState[estimatedNextBlock.x][estimatedNextBlock.y] = 1;
            return snakeTail; // this return will be used for visual rendering of the board
        }

        // method for eating = moving without losing it's tail and not checking for death conditions (used only when apple met on the way)
        this.eat = () => {
            if (!this.checkLifeState()) return;
            let estimatedNextBlock;
            const headCoords = _snakeBodyCoords[0];
            switch (_direction) {
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
            _snakeBodyCoords.unshift(estimatedNextBlock);
            _boardFieldState[estimatedNextBlock.x][estimatedNextBlock.y] = 1;
            return estimatedNextBlock; // actually it is returning of apple coords for a rendering tool to delete it from board
        }
    }
}