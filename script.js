import data from "./package.json";

let socket = io();

var side = 20;

isWinter = false;

function setWinter(){
    isWinter = true;
}
function setSummer(){
    isWinter = false;
}

console.log(isWinter);

if(isWinter){
    var season = "Its winter now!";
}
else{
    var season = "Its summer now!";
}

function count(){
    var count = document.getElementById("count").innerHTML;
    count = grassArr.length;
    data.count.grassCount = count;
}

setInterval(count, 16.67);

document.getElementById("vis").innerHTML = season;
document.getElementById("winter").addEventListener("click", setWinter);
document.getElementById("summer").addEventListener("click", setSummer);

function setup() {
    frameRate(5);
    createCanvas(80 * side, 80 * side);
    background('#acacac');
}

function update(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if(isWinter){
                    fill("#E1D9D1");
                }
                else{
                    fill("green");
                }
            }
            else if (matrix[y][x] == 2) {
                if(isWinter){
                    fill("#FFFAA0");
                }
                else{
                    fill("yellow");
                }
            }
            else if (matrix[y][x] == 3) {
                if(isWinter){
                    fill("#F67280");
                }
                else{
                    fill("red");
                }
            }
            else if (matrix[y][x] == 4) {
                if(isWinter){
                    fill("#A4D8D8");
                }
                else{
                    fill("cyan");
                }
            }
            else if (matrix[y][x] == 5) {
                if(isWinter){
                    fill("#C4A484");
                }
                else{
                    fill("brown");
                }
            }
            else if(matrix[y][x] == 6){
                if(isWinter){
                    fill("#F8C8DC");
                }
                else{
                    fill("pink");
                }
            }


            rect(x * side, y * side, side, side);

        }
    }

    
}

socket.on("send matrix", update);