class Render{
    constructor(boardSizeHorizontal = 21, boardSizeVertical = 21){
        let boardHTMLObjects = [...Array(boardSizeHorizontal)].map(a => Array(boardSizeVertical));
        const cols = [...document.querySelectorAll('.col')];
        for (let j=0; j<cols.length; j++){
            const elementsCol = [...cols[j].querySelectorAll('.field')];
            for (let i=0; i<elementsCol.length; i++){
                boardHTMLObjects[j][i] = elementsCol[i];
            }
        }

        this.getBoardHTMLObjects = () => boardHTMLObjects;
    }

    putElementsOnBoard(snakeBodyCoords, appleCoords, resetCoordsTail, resetCoordsApple) {
        // reset coords are the cords of previous tail or apple that has been eaten
        const boardHTMLObjects = this.getBoardHTMLObjects();
        if(resetCoordsTail) {
            boardHTMLObjects[resetCoordsTail.x][resetCoordsTail.y].classList.remove('snakebody');
        }
        if(resetCoordsApple) {
            boardHTMLObjects[resetCoordsApple.x][resetCoordsApple.y].classList.remove('apple');
        }
        if(appleCoords) {
            boardHTMLObjects[appleCoords.x][appleCoords.y].classList.add('apple');
        }
        if(snakeBodyCoords) {
            snakeBodyCoords.forEach(block => {
                boardHTMLObjects[block.x][block.y].classList.add('snakebody');
            })
        }
    }
}