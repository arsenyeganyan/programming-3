const LivingCreature = require("./LivingCreature");
module.exports = class GrObstacle extends LivingCreature{
    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell && this.multiply > 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newOb = new GrObstacle(newX, newY);
            grObArr.push(newOb);
            this.multiply = 0
        }
    }
}