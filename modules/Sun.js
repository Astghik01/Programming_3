var LivingCreature = require("./class.LivingCreature.js");
module.exports = class Sun extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 11;
        this.directions = [];
        this.acted = false;
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
    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }
    move() {
        var newCord = random(this.chooseCell(0));
        if (this.acted == false) {
            if (newCord) {
                var newX = newCord[0];
                var newY = newCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
    mul() {
        this.multiply++;
        var newCord = random(this.chooseCell(0));

        if (newCord && this.multiply >= 8) {
            var newX = newCord[0];
            var newY = newCord[1];

            matrix[newY][newX] = new Sun(newX, newY, 4);
            this.multiply = 0;
        }
    }
    eat() {
        if (this.acted == false) {

            var newCord = random(this.chooseCell(3));

            if (newCord) {
                var newX = newCord[0];
                var newY = newCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                this.acted = true;
                if (this.energy >= 10) {
                    this.mul();
                }
            }
            else {
                var newCord1 = random(this.chooseCell(1));

                if (newCord1) {
                    var newX = newCord1[0];
                    var newY = newCord1[1];

                    matrix[newY][newX] = matrix[this.y][this.x];
                    matrix[this.y][this.x] = 0;

                    this.x = newX;
                    this.y = newY;

                    this.energy++;
                    this.acted = true;
                    if (this.energy >= 10) {
                        this.mul();
                    }
                }
                else {
                    this.move();
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }
}
