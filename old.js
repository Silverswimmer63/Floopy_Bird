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
var pipeWidth = Math.floor(Math.random() * (125 - 100) + 100);//gives a random width for the pipe
var pipeHeight = Math.floor(Math.random() * (190 - 170) + 170);//gives a random height for the pipe
var lowerPipe = {xPos: c.width-pipeWidth, yPos: c.height-pipeHeight, width: pipeWidth, height: pipeHeight};//creates the base of the pipe
var upperPipe = {xPos: c.width-pipeWidth, yPos: 0, width: pipeWidth, height: pipeHeight};//creates the top pipe
var rectArray = [];

function drawCircle() {
  ctx.beginPath();
  ctx.arc(x, y, ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
  ctx.fillStyle = "#FF00FF"; //Sets the color of the circle to light blue.
  ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  ctx.stroke();
}

//var yRange = c.height - rect.height;
//This function draws the pipes and makes them move from right to left accross the screen
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){
  ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
  for (var i = 0; i < rectArray.length; i++) {
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosL-15, rectArray[i].yPosL, rectArray[i].widthL+30, 40);//draws the actual rectangle
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosU-15, rectArray[i].heightU-40, rectArray[i].widthU+30, 40);
    ctx.fillStyle = "green"; //Sets the color of the circle to green.
    ctx.fill(); //Fills in the circle with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
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
  //if (x < scoreRect.x + scoreRect.width && x + ballSize > scoreRect.x && y < scoreRect.y + scoreRect.height && y + ballSize > scoreRect.y) {//checnks if the ball has passed through the score box
  //  score += 1;//adds one to the score
  //  console.log(score);
  //  if (score == 57) {//if the score is greater than 57
  //    points += 1;//adds one point
  //    document.getElementById("score").innerHTML = "Score = " + points;//displayes the change in points
  //    /* Failed atempt to make a high score due to the page reloading to reset the game
  //    if (points > highScore) {
  //      document.getElementById("highScore").innerHTML = "High Score = " + points;
  //    }
  //    */
  //    score = 0;//resets the score to zero
  //  }
  //}
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
