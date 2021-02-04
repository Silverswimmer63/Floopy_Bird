var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var ball = {x: c.width/2, y: c.height/2, ballSize: 15}
var dx = 0; //These variables will be used later to change the position of the circle.
var dy = 10; //Changing both of these numbers will also change the speed of the circle (in other words, how many units the circle moves per frame).
var gravity = .15; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.
var pipeWidth = Math.floor(Math.random() * (125 - 100) + 100);//gives a random width for the pipe
var pipeHeight = Math.floor(Math.random() * (190 - 170) + 170);//gives a random height for the pipe
var lowerPipe = {xPos: c.width-pipeWidth, yPos: c.height-pipeHeight, width: pipeWidth, height: pipeHeight};//creates the base of the pipe
var upperPipe = {xPos: c.width-pipeWidth, yPos: 0, width: pipeWidth, height: pipeHeight};//creates the top pipe
var rectArray = [];
var timer = 0; //
var difficultTimer = 0; //
var score = 0; //
var spaceDifficulty = 400; //
var imageCounter = 0;
var gameState = 0;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
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

function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight) {
  /*these ifs are the collision
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
  */
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.xPos + ball.xMove + ball.rad < lowRectX + 2)) {//
    score ++; //
    console.log(score); //
    document.getElementById('score').innerHTML = score;//
  }
  if ((ball.xPos + ball.xMove + ball.rad > upRectX) && (ball.yPos + ball.rad < upRectHeight) && (ball.rad + ball.xPos < upRectX + upRectWid)) { //checks for collision with the top pipe on the left side
    gameState = 2;
  }
  if ((ball.yPos + ball.yMove - ball.rad < upRectHeight) && (ball.xPos + ball.rad < upRectWid + upRectX + 50) && (ball.rad + ball.xPos > upRectX)) { //checks for collision with the bottom of the top pipe
    gameState = 2;
  }
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.yPos + ball.rad > lowRectY) && (ball.rad + ball.xPos < lowRectX + lowRectWid)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;
  }
  if ((ball.yPos + ball.yMove + ball.rad > lowRectY) && (ball.xPos + ball.rad < lowRectWid + lowRectX + 50) && (ball.rad + ball.xPos > lowRectX)) { //checks for collision with the top of the bottom pipe
    gameState = 2;
  }
}

//This function draws the pipes and the ball as well as sicking the score up and checking for collision
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  if (gameState == 1) {
    makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height);
    if (difficultTimer == 1000) {
      spaceDifficulty = spaceDifficulty - 40;
      if (spaceDifficulty < 200) {
        spaceDifficulty = 200;
      }
      difficultTimer = 0;
    }
    if (timer == spaceDifficulty) {
      var chance = Math.floor(Math.random() * (1 - 4) + 4);
      if (chance == 1) {
        var rectHUp = math.floor(Math.random)
      }
    }
    drawCircle();
    if (ball.x + dx > c.width - ball.ballSize || ball.x + dx < ball.ballSize) { //If the circle's x position exceeds the width of the canvas...
      dx = -dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
    }
    if(ball.y + dy > c.height - ball.ballSize || ball.y + dy < ball.ballSize) { //If the circle's y position exceeds the height of the canvas...
      dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
      //location.reload();//if yes, reloads the page
    }
    dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
    ball.x += dx;
    if (((ball.y + dy) + ball.ballSize) <= c.height) {
      ball.y += dy;
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
   gameState == 1;
 }
}

//comment for push
//Got atom and gitkraken working on chromebook 10/10 do not recomend
