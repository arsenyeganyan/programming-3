const Creatures = require("./livingCreature");
module.exports = class Grass extends Creatures {
    
    chooseCell(character){
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++;
        var newCell = this.random(0);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}