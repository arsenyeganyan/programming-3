//spawning a mistery object is the unique event from the requirements
var side = 15;
let socket = io();

function setup() {
    frameRate(5);
    createCanvas(25 * side, 25 * side);
    background('#acacac');
}

let summer = document.querySelector(".summer");
let winter = document.querySelector(".winter");
let spring = document.querySelector(".spring");
let fall = document.querySelector(".fall");
let season = "summer";

let spawn = document.querySelector(".spawn--button");
let appear;
spawn.addEventListener("click", function spawn(){
    appear = true;
    console.log("Spawned!");
});
socket.emit("receive spawn", appear);

summer.addEventListener("click", () => {
    season = "summer";
});
winter.addEventListener("click", () => {
    season = "winter";
});
spring.addEventListener("click", () => {
    season = "spring";
});
fall.addEventListener("click", () => {
    season = "fall";
});

function drawGame(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(season == "summer"){
                if (matrix[y][x] == 1) {
                    fill("green");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (matrix[y][x] == 3) {
                    fill("red")
                }
                else if (matrix[y][x] == 4) {
                    fill("cyan");
                }
                else if (matrix[y][x] == 5) {
                    fill("orange");
                }
                else if(matrix[y][x] == 6){
                    fill("brown");
                }
    
                rect(x * side, y * side, side, side);
            }
            else if(season == "winter"){
                if (matrix[y][x] == 1) {
                    fill("#7FFFD4");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("#FFFFE0");
                }
                else if (matrix[y][x] == 3) {
                    fill("#CD5C5C")
                }
                else if (matrix[y][x] == 4) {
                    fill("#20B2AA");
                }
                else if (matrix[y][x] == 5) {
                    fill("#EB984E");
                }
                else if(matrix[y][x] == 6){
                    fill("#FFE4C4");
                }
    
                rect(x * side, y * side, side, side);
            }
            else if(season == "spring"){
                if (matrix[y][x] == 1) {
                    fill("#228B22");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("#DAA520");
                }
                else if (matrix[y][x] == 3) {
                    fill("#B22222")
                }
                else if (matrix[y][x] == 4) {
                    fill("#00BFFF");
                }
                else if (matrix[y][x] == 5) {
                    fill("#FA8072");
                }
                else if(matrix[y][x] == 6){
                    fill("#DEB887");
                }

                rect(x * side, y * side, side, side);
            }
            else if(season == "fall"){
                if (matrix[y][x] == 1) {
                    fill("#008080");
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                }
                else if (matrix[y][x] == 2) {
                    fill("#EEE8AA");
                }
                else if (matrix[y][x] == 3) {
                    fill("#FF4500")
                }
                else if (matrix[y][x] == 4) {
                    fill("#B0E0E6");
                }
                else if (matrix[y][x] == 5) {
                    fill("#FF6347");
                }
                else if(matrix[y][x] == 6){
                    fill("#B8860B");
                }
    
                rect(x * side, y * side, side, side);
            }
        }
    }
}

socket.on("send matrix", drawGame);