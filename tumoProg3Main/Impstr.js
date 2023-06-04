const LivingCreature = require("./LivingCreature");
module.exports = class Impstr extends LivingCreature{
    constructor( x, y ) {
        super( x, y );
        this.energy = 8;
    }

    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in impostorr) {
            if (this.x == impostorr[i].x && this.y == impostorr[i].y) {
                impostorr.splice(i, 1);
                break;
            }
        }
    }
    eat() {
        var emptyCells = this.chooseCell(3);
        var newCell = this.random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in prArr) {
                if (newX == prArr[i].x && newY == prArr[i].y) {
                    prArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 12) {
                setTimeout(() => this.mul(), this.femaleTimeout);
            }
        } else {
            this.move()
        }

    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newImp = new Impstr(newX, newY);
            impostorr.push(newImp);
            this.energy = 12
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
}