var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(3000);

const Grass = require("./Grass");
const GrassEater = require("./GrassEater");
const GrObstacle = require("./GrObstacle");
const Predator = require("./Predator");
const Impstr = require("./Impstr");
const Villain = require("./Villain");
const { log } = require('console');

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});

function generate(matLen, gr, grEat, pr, grOb, impr, vil, appear) {
   let matrix = [];
   for (let i = 0; i < matLen; i++) {
       matrix[i] = [];
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
       let x = Math.floor(Math.random() * matLen);
       let y = Math.floor(Math.random() * matLen);
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
   for (let i = 0; i < impr; i++) {
       let x = Math.floor(Math.random() * matLen);
       let y = Math.floor(Math.random() * matLen);
       console.log(x, y);
       if (matrix[y][x] == 0) {
           matrix[y][x] = 5;
       }
   }
    if(appear){
        for (let i = 0; i < vil; i++) {
            let x = Math.floor(Math.random() * matLen)
            let y = Math.floor(Math.random() * matLen)
            console.log(x, y);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 6;
            }
        }
    }

    io.emit("send matrix", matrix);
    return matrix;
}

io.on("receive spawn", generate);
matrix = generate(25, 45, 24, 20, 20, 30, 10);

grassArr = [];
grassEaterArr = [];
prArr = [];
grObArr = [];
impostorr = [];
vilArr = [];

let counter = {
    grass: 0,
    grassEater: 0,
    pred: 0,
    grOb: 0,
    impr: 0,
    vil: 0
};

function createObject(){
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] == 1) {
              let gr = new Grass(x, y)
              grassArr.push(gr);
              counter.grass = grassArr.length;
          } 
          else if (matrix[y][x] == 2) {
              let gre = new GrassEater(x, y);
              grassEaterArr.push(gre);
              counter.grassEater = grassEaterArr.length;
          }
          else if (matrix[y][x] == 3) {
              let pr = new Predator(x, y);
              prArr.push(pr);
              counter.pred = prArr.length;
          }
          else if (matrix[y][x] == 4) {
              let grOb = new GrObstacle(x, y);
              grObArr.push(grOb);
              counter.grOb = grObArr.length;
          }
          else if (matrix[y][x] == 5) {
              let impr = new Impstr(x, y);
              impostorr.push(impr);
              counter.impr = impostorr.length;
          }
          
        else if (matrix[y][x] == 6){
                let vil = new Villain(x, y);
                vilArr.push(vil);
                counter.vil = vilArr.length;
        }
      }
  }
}
createObject();

//60fps = 16.67ms
setInterval(() => {
    let check = matrix.includes(0);
    io.emit("include", check);
}, 16.67);

function transfer(check){
    if(check === false){
        var msg = JSON.stringify(counter);
        fs.writeFileSync("statistics.json", msg);
        console.log(msg);
    }
}
io.on("include", transfer);

function gameRunner(){
   const maleTimeout = 500;
   const femaleTimeout = 800;
   
   //timeouts for more functional (having eat())
   //characters are done directly in their class files
    for (var i in grassArr) {
     if(grassArr[i].mul()){
        setTimeout(() => grassArr[i].mul(), maleTimeout);
     }
   }
   for (var i in grassEaterArr) {
      grassEaterArr[i].eat();
   }
   for (var i in prArr) {
      prArr[i].eat();
   }
   for (var i in grObArr) {
     if(grObArr[i].mul()){
        setTimeout(() => grObArr[i].mul(), femaleTimeout);
     }
   }
   for (var i in impostorr) {
    impostorr[i].eat();
   }
   for (var i in vilArr) {
    vilArr[i].eat();
   }

   io.emit("send matrix", matrix);
}

setInterval(gameRunner, 500);