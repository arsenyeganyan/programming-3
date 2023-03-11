const Creatures = require("./livingCreature");
module.exports = class GrassEater extends Creatures{
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }
    
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character){
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    mul() {
          
        this.multiply++;
        var newCell = this.random(0);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrassEater = new GrassEater(newX, newY, 1);
            grassEaterArr.push(newGrassEater);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var newCell = this.random(0);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } 
        else{
            this.die();
            }
        }

    eat() {
        var newCell = this.random(1);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        
            if (this.energy >= 12) {
                    this.mul()
            }
        } 
        else{
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    un(){
        this.energy = 16;
    }

    unique(){
        document.getElementById("unique").addEventListener("click", this.un)
    }

}