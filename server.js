const Grass = require("./grass.js");
const GrassEater = require("./grassEater.js");
const Predator = require("./predator.js");
const GrassObstacle = require("./grassObstacle.js");
const Impstr = require("./impstr.js");
const Traitor = require("./traitor.js");

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

maleTimeout = 500;
femaleTimeout = 400;

app.get('/', function (req, res) {
   res.redirect('index.html');
});

grassArr = [];
grassEaterArr = [];
prArr = [];
grObArr = [];
impostorr = [];
trArr = [];

function generate(matLen, gr, grEat, pr, grOb, impostorr) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (let i = 0; i < grOb; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        console.log(x, y);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    io.emit("send matrix", matrix);
    return matrix;
}

matrix = generate(25, 45, 8, 16, 10, 1);


function createObj(){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr);
            } 
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y)
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y)
                prArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let grOb = new GrassObstacle(x, y)
                grObArr.push(grOb);
            }
            else if (matrix[y][x] == 5) {
                let impstr = new Impstr(x, y)
                impostorr.push(impstr);
            }
            else if(matrix[y][x] == 6){
                let traitor = new Traitor(x, y);
                trArr.push(traitor);
            }
        }

    }

    io.emit("send matrix", matrix);
}

createObj();

function gameMove(){
    for (var i in grassArr) {
        grassArr[i].setInterval(mul(), maleTimeout);
    }

    for (let i in grassEaterArr) {
        
        grassEaterArr[i].setInterval(mul(), maleTimeout);
        grassEaterArr[i].eat();
        grassEaterArr[i].move();
        grassEaterArr[i].die();
    }
     
    for (var i in prArr) {
        prArr[i].setInterval(mul(), femaleTimeout);
        prArr[i].eat();
        prArr[i].move();
        prArr[i].die();
    }

    for (var i in grObArr) {
        grObArr[i].setInterval(mul(), femaleTimeout);
    }

    for(var i in impostorr){
        impostorr[i].setInterval(mul(), maleTimeout);
        impostorr[i].eat();
        impostorr[i].move();
        impostorr[i].die();
    }

    for(var i in trArr){
        trArr[i].setInterval(mul(), femaleTimeout);
        trArr[i].eat();
        trArr[i].move();
        trArr[i].die();
    }

    io.emit("send matrix", matrix);
}

setInterval(gameMove, 400);

server.listen(5000);