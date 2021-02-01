var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var x = c.width / 2; //myCanvas.width / 20
var y = c.height / 2; //myCanvas.height / 20

var dx = 0; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).

var gravity = .15; //Sets the gravity pulling the ball to the ground.
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
var lowerRect = {x: c.width - 110, y: c.height - 180, width: 100, height: c.height};//creates the base of the lower pipe
var lowerPipeTop = {x: c.width - 120, y: c.height - 200, width: 120, height: 20};//creates the top of the lower pipe
var upperRect = {x: c.width - 110, y: 0, width: 100, height: c.height - 400};//creates the base of the upper pipe
var upperPipeTop = {x: c.width - 120, y: c.height - 400, width: 120, height: 20};//creates the top of the upper pipe
var scoreRect = {x: c.width - 110, y: 220, width: 100, height: c.height - 420};//creates a rectangle for tracking score
class Pipe {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
//This function draws the pipes and makes them move from right to left accross the screen
  function makePipe(){
    ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(lowerRect.x, lowerRect.y, lowerRect.width, lowerRect.height);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(lowerPipeTop.x, lowerPipeTop.y, lowerPipeTop.width, lowerPipeTop.height);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(upperRect.x, upperRect.y, upperRect.width, upperRect.height);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(upperPipeTop.x, upperPipeTop.y, upperPipeTop.width, upperPipeTop.height);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.clearRect(scoreRect.x, scoreRect.y, scoreRect.width, scoreRect.height);//draws the actual rectangle
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    lowerRect.x = lowerRect.x - 2;//moves the pipe base accross the screen
    if ((lowerRect.x + lowerRect.width) == 0) {//if the pipes x + the width = the left wall of the canvas
      lowerRect.x = c.width;//set the x to the right side of the canvas
    }
    lowerPipeTop.x = lowerPipeTop.x - 2;//moves the top base accross the screen
    var lowPipeTop = lowerPipeTop.x - 10;//this fixes the issue of the pipe tops reseting to the other side before the base
    if ((lowPipeTop + lowerPipeTop.width) == 0) {//if the pipes x + the width = the left wall of the canvas
      lowerPipeTop.x = c.width - 10;//set the x to the right side of the canvas
    }
    upperRect.x = upperRect.x - 2;//moves the pipe base accross the screen
    if ((upperRect.x + upperRect.width) == 0) {//if the pipes x + the width = the left wall of the canvas
      upperRect.x = c.width;//set the x to the right side of the canvas
    }
    upperPipeTop.x = upperPipeTop.x - 2;//moves the pipe top accross the screen
    var upPipeTop = upperPipeTop.x - 10;//this fixes the issue of the pipe tops reseting to the other side before the base
    if ((upPipeTop + upperPipeTop.width) == 0) {//if the pipes x + the width = the left wall of the canvas
      upperPipeTop.x = c.width  - 10;//set the x to the right side of the canvas
    }
    scoreRect.x = scoreRect.x - 2;//moves the pipe base accross the screen
    if ((scoreRect.x + scoreRect.width) == 0) {//if the pipes x + the width = the left wall of the canvas
      scoreRect.x = c.width;//set the x to the right side of the canvas
    }
  }

var score = 0;//tracks how many times the ball colides with the scoreBox
var points = 0;//tracks score
var highScore = 0;
//This function draws the pipes and the ball as well as sicking the score up and checking for collision
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  makePipe();
  drawCircle();
  if (x + dx > c.width - ballSize || x + dx < ballSize) { //If the circle's x position exceeds the width of the canvas...
    dx = -dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }
  if(y + dy > c.height - ballSize || y + dy < ballSize) { //If the circle's y position exceeds the height of the canvas...
    dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
    //location.reload();//if yes, reloads the page
  }
  dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
  x += dx;
  if (((y + dy) + ballSize) <= c.height) {
    y += dy;
  }
  //these ifs are the collision
  if (x < lowerRect.x + lowerRect.width && x + ballSize > lowerRect.x && y < lowerRect.y + lowerRect.height && y + ballSize > lowerRect.y) {//checks if ball collides with pipe base
    location.reload();//if yes, reloads the page
  }
  if (x < lowerPipeTop.x + lowerPipeTop.width && x + ballSize > lowerPipeTop.x && y < lowerPipeTop.y + lowerPipeTop.height && y + ballSize > lowerPipeTop.y) {//checks if ball collides with pipe top
    location.reload();//if yes, reloads the page
  }
  if (x < upperRect.x + upperRect.width && x + ballSize > upperRect.x && y < upperRect.y + upperRect.height && y + ballSize > upperRect.y) {//checks if ball collides with pipe base
    location.reload();//if yes, reloads the page
  }
  if (x < upperPipeTop.x + upperPipeTop.width && x + ballSize > upperPipeTop.x && y < upperPipeTop.y + upperPipeTop.height && y - ballSize > upperPipeTop.y) {//checks if ball collides with pipe top
    location.reload();//if yes, reloads the page
  }
  if (x < scoreRect.x + scoreRect.width && x + ballSize > scoreRect.x && y < scoreRect.y + scoreRect.height && y + ballSize > scoreRect.y) {//checnks if the ball has passed through the score box
    score += 1;//adds one to the score
    console.log(score);
    if (score == 57) {//if the score is greater than 57
      points += 1;//adds one point
      document.getElementById("score").innerHTML = "Score = " + points;//displayes the change in points
      /* Failed atempt to make a high score due to the page reloading to reset the game
      if (points > highScore) {
        document.getElementById("highScore").innerHTML = "High Score = " + points;
      }
      */
      score = 0;//resets the score to zero
    }
  }
}

setInterval(draw, 15);//makes the game run

document.addEventListener("keydown", makeBounce);//listens for a key press
function makeBounce(e) {
 if (e.key == " ") {//if the spacebar is pressed the ball gains y velcity
   dy -= 5;
 }
 if (e.key == "r") {//if thr "r" key is pressed the x direction is flipped
   dx = -dx;
 }
}

//comment for push
