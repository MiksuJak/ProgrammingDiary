class Apple {
    constructor() {
        let appleCoords = {x: null, y: null};
        this.getAppleCoords = () => appleCoords;
        this.setAppleCoords = (coords) => {
            appleCoords.x = coords.x;
            appleCoords.y = coords.y;
        }
    }
    generateNewApple(boardFieldsState, boardSizeHorizontal = 21, boardSizeVertical = 21) {
        const possibleFields = [];
        for (let i=0; i<boardSizeHorizontal; i++) {
            for (let j=0; j<boardSizeVertical; j++) {
                if (!boardFieldsState[i][j]) {
                    possibleFields.push({x: i, y: j});
                }
            }
        }
        // picking a random field from possibleFields
        const coords = possibleFields[Math.floor(Math.random() * possibleFields.length)];
        this.setAppleCoords(coords);
        return;
    }
}