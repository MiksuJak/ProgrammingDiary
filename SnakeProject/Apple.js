// a class made for both generating new apples on board and containing current apple's coordinates
class Apple {
    constructor() {
        let _appleCoords = {x: null, y: null};

        // getter for apple coords
        this.getAppleCoords = () => {
            return Object.assign({}, _appleCoords);
        };

        this.setAppleCoords = (newCoords) => {
            _appleCoords.x = newCoords.x;
            _appleCoords.y = newCoords.y;
        }
    }
    generateNewApple(boardFieldState, boardSizeHorizontal = 21, boardSizeVertical = 21) {
        const possibleFields = [];
        for (let i=0; i<boardSizeHorizontal; i++) {
            for (let j=0; j<boardSizeVertical; j++) {
                if (!boardFieldState[i][j]) {
                    possibleFields.push({x: i, y: j});
                }
            }
        }
        // picking a random field from possibleFields
        const newCoords = possibleFields[Math.floor(Math.random() * possibleFields.length)];
        this.setAppleCoords(newCoords);
        return;
    }
}