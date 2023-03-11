const Creatures = require("./livingCreature");
module.exports = class Predator extends Creatures{
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
          
        this.multiply++;
        var newCell = this.random(0);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newPredator = new Predator(newX, newY, 1);
            prArr.push(newPredator);
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
            this.x = newX;
            this.y = newY;
        } 
        else{
            this.die();
            }
    }

    eat() {
        var newCell = this.random(2);
        if (newCell && this.energy >= 0) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
        for (var i in prArr) {
            if (this.x == prArr[i].x && this.y == prArr[i].y) {
                prArr.splice(i, 1);
                break;
            }
        }
    }
}