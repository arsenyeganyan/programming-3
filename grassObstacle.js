const Creatures = require("./livingCreature");
module.exports = class GrObstacle extends Creatures{
    
    chooseCell(character){
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++
        var newCell = this.random(0);
        
        if (newCell && this.multiplyO >15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
        
            var newOb = new GrObstacle(newX, newY);
            grObArr.push(newOb);
            this.multiply = 0;
        }
    }    
}