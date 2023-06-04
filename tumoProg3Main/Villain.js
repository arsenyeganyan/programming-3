const LivingCreature = require("./LivingCreature");
module.exports = class Villain extends LivingCreature{
    constructor( x, y ) {
        super( x, y );
        this.energy = 15;
    }

    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;

            var newVillian = new Villain(newX, newY);
            vilArr.push(newVillian);
            this.energy = 15;
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
        }
        else {
            this.die();
        }
    }

    eat() {
        var emptyCells = this.chooseCell(5);
        var newCell = this.random(emptyCells);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in impostorr) {
                if (newX == impostorr[i].x && newY == impostorr[i].y) {
                    impostorr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 20) {
                setTimeout(() => this.mul(), this.femaleTimeout);
            }
        } else {
            this.move();
        }
    }
    
    die() {
        matrix[this.y][this.x] = 0
        for (var i in vilArr) {
            if (this.x == vilArr[i].x && this.y == vilArr[i].y) {
                vilArr.splice(i, 1);
                break;
            }
        }
    }
}