var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var x = c.width / 2; //myCanvas.width / 20
var y = c.height / 2; //myCanvas.height / 20

var dx = 0; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

var gravity = .25; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.
var ballSize = 15; //Sets the circle's radius.

function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
  ctx.fillStyle = "#FF00FF"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

//var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);
//var rectHeight = Math.floor(Math.random() * (200 - 150) + 150);
//var rect = {width: rectWidth, height: rectHeight};
//var xRange = c.width - rectWidth;

//var yRange = c.height - rect.height;
var lowerRect = {x: c.width - 10, y: c.height - 180, width: 100, height: c.height};
var lowerPipeTop = {x: c.width - 20, y: c.height - 200, width: 120, height: 20};
var upperRect = {x: c.width - 10, y: 0, width: 100, height: c.height - 400};
var upperPipeTop = {x: c.width - 20, y: };
var upprtPipeTop = {};
var scoreRect = {x: c.width - 10, y: 200, width: 100, height: c.height - 400};
  function makePipe(){
    ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(lowerRect.x, lowerRect.y, lowerRect.width, lowerRect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(lowerPipeTop.x, lowerPipeTop.y, lowerPipeTop.width, lowerPipeTop.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(upperRect.x, upperRect.y, upperRect.width, upperRect.height);
    ctx.fillStyle = "green"; //Sets the color of the circle to light blue.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath();
    ctx.clearRect(scoreRect.x, scoreRect.y, scoreRect.width, scoreRect.height);
    ctx.fill();
    ctx.stroke();
    lowerRect.x = lowerRect.x - 1;
    if ((lowerRect.x + lowerRect.width) == 0) {
      lowerRect.x = c.width;
    }
    lowerPipeTop.x = lowerPipeTop.x - 1;
    if ((lowerPipeTop.x + lowerPipeTop.width) == 0) {
      lowerPipeTop.x = c.width
    }
    upperRect.x = upperRect.x - 1;
    if ((upperRect.x + upperRect.width) == 0) {
      upperRect.x = c.width;
    }
    scoreRect.x = scoreRect.x - 1;
    if ((scoreRect.x + scoreRect.width) == 0) {
      scoreRect.x = c.width;
    }
  }

var score = 0;
var hoops = 0;
function draw() {
  var scoreBox = {x: c.width - 10, y: c.height - 200, width: 10,  height: 100};
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  makePipe();
  drawCircle();
  if (x + dx > c.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas...
    dx = -dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }
  if(y + dy > c.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
    dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
  }
  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
  x += dx;
  if (((y + dy) + ballSize) <= c.height) {
    y += dy;
  }
  //these  ifs are the collision
  if (x < lowerRect.x + lowerRect.width && x + ballSize > lowerRect.x && y < lowerRect.y + lowerRect.height && y + ballSize > lowerRect.y) {
    location.reload();
  }
  if (x < upperRect.x + upperRect.width && x + ballSize > upperRect.x && y < upperRect.y + upperRect.height && y + ballSize > upperRect.y) {
    location.reload();
  }
  if (x < scoreRect.x + scoreRect.width && x + ballSize > scoreRect.x && y < scoreRect.y + scoreRect.height && y + ballSize > scoreRect.y) {
    score += 1;
    console.log(score);
    if (score == 114) {
      hoops += 1;
      document.getElementById("score").innerHTML = hoops;
      score = 0;
    }
  }
}

setInterval(draw, 15);

document.addEventListener("keydown", makeBounce);
 function makeBounce(e) {
   if (e.key == " ") {
     dy -= 5;
   }
   if (e.key == "r") {
     dx = -dx;
   }
 }
