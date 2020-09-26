// class created only for projecting data onto html board
class RenderingTool{
    constructor(boardSizeHorizontal = 21, boardSizeVertical = 21){
        // construcotr focused only on getting all of divs which are fields of a board inside html file
        this.boardHTMLObjects = [...Array(boardSizeHorizontal)].map(a => Array(boardSizeVertical));
        const rows = [...document.querySelectorAll('.row')];
        for (let i=0; i<rows.length; i++){
            const elementsRow = [...rows[i].querySelectorAll('.field')];
            for (let j=0; j<elementsRow.length; j++){
                this.boardHTMLObjects[j][i] = elementsRow[j];
            }
        }
    }

    putElementsOnBoard(snakeBodyCoords, appleCoords, resetCoordsTail, resetCoordsApple) {
        // reset coords are the cords of previous tail or apple that has been eaten
        if(resetCoordsTail) {
            this.boardHTMLObjects[resetCoordsTail.x][resetCoordsTail.y].classList.remove('snakebody');
        }
        if(resetCoordsApple) {
            this.boardHTMLObjects[resetCoordsApple.x][resetCoordsApple.y].classList.remove('apple');
        }
        if(appleCoords) {
            this.boardHTMLObjects[appleCoords.x][appleCoords.y].classList.add('apple');
        }
        if(snakeBodyCoords) {
            snakeBodyCoords.forEach(block => {
                this.boardHTMLObjects[block.x][block.y].classList.add('snakebody');
            })
        }
    }

    resetBoard() {
        this.boardHTMLObjects.forEach(row => {
            row.forEach(element => {
                element.classList.remove('snakebody');
                element.classList.remove('apple');
            })
        })
    }
}