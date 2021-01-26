var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20};

var gravity = 0.2;
var damping = 0.75;
var rad = 20;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(ball.xPos, ball.yPos, rad, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.stroke();
}

var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);
var rectHeight = Math.floor(Math.random() * (175 - 125) + 125);
var rect = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight};
/*
Use this for gradient coloring of the tubes
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "green");
grd.addColorStop(1, "white");
ctx.fillStyle = grd;
ctx.fillRect(rect.xPos, rect.yPos, rect.width, rect.height);
*/
  function makePipe(){
    ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
    //code for the bottom, long pipe
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rect.xPos, rect.yPos, rect.width, rect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    //code for the top of the pipe on the bottom of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rect.xPos - 15, rect.yPos-20, rect.width+30, 40);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    //code for the long pipe moving on the top of the canvas
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rect.xPos, 0, rect.width, rect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    //code for
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rect.xPos - 15, rect.height, rect.width+30, 40);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    rect.xPos --;
    if ((rect.xPos + rect.width) == 0) {
      rect.xPos = c.width;
    }
  }

function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  makePipe();
  drawCircle();
  if (ball.xPos + ball.xMove > c.width - rad || ball.xPos + ball.xMove < rad) {
    ball.xMove = -ball.xMove;
  }
  if (ball.yPos + ball.yMove > c.height - rad || ball.yPos + ball.yMove < rad) {
    ball.yMove = -ball.yMove * damping;
  }
  ball.yMove += gravity;
  ball.xPos += ball.xMove;
  if (((ball.yPos + ball.yMove) + rad) <= c.height) {
    ball.yPos += ball.yMove;
  }
  if ((ball.xPos + ball.xMove + rad > rect.xPos) && (ball.yPos + rad < rect.height)) {
    ball.xMove = -ball.xMove;
  }
  if ((ball.xPos + ball.xMove + rad > rect.xPos) && (ball.yPos + rad < rect.height)) {
    ball.xMove = -ball.xMove;
  }
  if ((ball.xPos + ball.xMove + rad > rect.xPos) && (ball.yPos + rad > rect.yPos)) {
    ball.xMove = -ball.xMove;
  }
  if ((ball.xPos + ball.xMove + rad > rect.xPos) && (ball.yPos + rad > rect.yPos)) {
    ball.xMove = -ball.xMove;
  }
  if ((ball.yPos + ball.yMove + rad > rect.yPos) && (ball.xPos + rad < rect.width + rect.xPos) && (rad + ball.xPos > rect.xPos)) { //collides with the top of the bottom pipe
    ball.yMove = -ball.yMove;
  }
}
setInterval(draw, 10);

document.addEventListener("keydown", makeBounce);
function makeBounce(e) {
  if (e.key == " ") {
    ball.yMove -= 10;
  }
  if (e.key == "r") {
    ball.xMove = -ball.xMove;
  }
}
//I could probably do set sprites for the game if anyone wants -Em
