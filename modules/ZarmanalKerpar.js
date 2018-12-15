var LivingCreature = require("./class.LivingCreature.js");
module.exports = class ZarmanaliKerpar extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
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

            matrix[newY][newX] = new ZarmanaliKerpar(newX, newY, 5);
            this.multiply = 0;
        }
    }
    xotstexcel() {

        var dexin = random(this.chooseCell(2));

        if (dexin) {
            var verjapesDatark = random(this.chooseCell(0));
            if (verjapesDatark) {
                var x = verjapesDatark[0];
                var y = verjapesDatark[1];

                matrix[y][x] = new Grass(x, y, 1);
                this.energy++;
                if (this.energy >= 10) {
                    this.mul();
                }
            }

        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }
}