var c = document.getElementById("myCanvas"); //loads the instructions/code from below into the canvas on the screen
var ctx = c.getContext("2d"); //gains access to drawing the shapes and stuff from below

/*
var ball gives specific attributes to the "ball". xPos is the x position of the
ball, yPos is the y position of the ball, xMove is how much the ball moves in
the x-direction each time it gets redrawn, yMove is how much the ball moves in
the y-direction each time it gets redrawn, and rad is the radius of the ball.
*/
var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20};
var gravity = 0.2; //its purpose is to add to the yPos so that the ball comes back down
var damping = 0.75; //will be used later to dampen the speed of the ball
var rectWidth = Math.floor(Math.random() * (125 - 100) + 100); //gives you a random number between 100-150 for the width of the rectangle being drawn
var rectHeight = Math.floor(Math.random() * (190 - 170) + 170); //gives you a random number between 125-175 for the height of the rectangle being drawn
var rectLower = {xPos: c.width-rectWidth, yPos: c.height-rectHeight, width: rectWidth, height: rectHeight}; //rectangle for the long, bottom pipe
var rectUpper = {xPos: c.width-rectWidth, yPos: 0, width: rectWidth, height: rectHeight}; //rectangle for the long, top pipe
var rectArray = []; //will be used for easy storage and accessibility later in the for loop to keep track of the multiple pipes being created
var timer = 0; //basically a counter for when to make a new pipe
var difficultTimer = 0; //keeps track of the 'time' so we know how frequent the pipes should be made and appear on the screen
var score = 0; //starts off the score/points you have when you play the game (ie. add 1 when you pass through the gap)
var spaceDifficulty = 400; //the "amount of space between the pipes". In reality, it's how frequent the pipes are made one after the other.
var imageCounter = 0;
var gameState = 0;

var img = new Image(); //basically creates the image
img.onload = function(){ //uploads the image onto the screen
  drawCircle(); //uses a function from below
}
img.src="birb.png"; //source for where the image is coming from

var imgUp = new Image(); //basically creates the image
imgUp.onload = function(){ //uploads the image onto the screen
  drawCircle(); //uses a function from below
}
imgUp.src="birbUp.png"; //source for where the image is coming from

var imgDown = new Image(); //basically creates the image
imgDown.onload = function(){ //uploads the image onto the screen
  drawCircle(); //uses a function from below
}
imgDown.src="birbDown.png"; //source for where the image is coming from

var imgStart = new Image(); //basically creates the image
imgStart.onload = function(){ //uploads the image onto the screen
  drawStart(); //uses a function from below
}
imgStart.src="start.png"; //source for where the image is coming from

var imgEnd = new Image(); //basically creates the image
imgEnd.onload = function(){ //uploads the image onto the screen
  drawEnd(); //uses a function from below
}
imgEnd.src="end.png"; //source for where the image is coming from

function drawStart() {
 ctx.save();
 ctx.beginPath();
 ctx.drawImage(imgStart, 300, 80, 400, 500); //parameters for drawing the bird
 ctx.fill(); //fills the image/drawing
 ctx.stroke(); //finishes the drawing
 ctx.restore();
}

function drawEnd() {
 ctx.save();
 ctx.beginPath();
 ctx.drawImage(imgEnd, 300, 80, 400, 400); //parameters for drawing the bird
 ctx.fill(); //fills the image/drawing
 ctx.stroke(); //finishes the drawing
 ctx.restore();
}

 //this function draws the birb on the screen
function drawCircle() {
 ctx.save();
 ctx.beginPath(); //starts the drawing
 if (imageCounter == 0) {
   ctx.drawImage(img, ball.xPos-ball.rad-10, ball.yPos-ball.rad-10, ball.rad+40, ball.rad+20); //parameters for drawing the bird
 }
 if (imageCounter == 1) {
   ctx.drawImage(imgUp, ball.xPos-ball.rad-10, ball.yPos-ball.rad-10, ball.rad+40, ball.rad+40); //parameters for drawing the bird

 }
 if (imageCounter == 2) {
   ctx.drawImage(imgDown, ball.xPos-ball.rad-10, ball.yPos-ball.rad-10, ball.rad+40, ball.rad+40); //parameters for drawing the bird
 }
 ctx.fill(); //fills the image/drawing
 ctx.stroke(); //finishes the drawing
 ctx.restore();
}

//ctx.drawImage(img, (ball.xPos-(ball.rad+12)),(ball.yPos-(ball.rad+18)),(ball.rad)+30,(ball.rad)+30);//Atemping to drawing an image


/* makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX {obj}- x position of the long, bottom tube
@param lowRectY {obj}- y position of the long, bottom tube
@param lowRectWid {obj}- the width of the long, bottom tube
@param lowRectHeight {obj}- the height of the long, bottom tube
@param upRectX {obj}- x position of the long, top tube
@param upRectY {obj}- y position of the long, top tube
@param upRectWid {obj}- the width of the long, top tube
@param upRectHeight {obj}- the height of the long, top tube
this function makes the two pipes (one on top of the screen and one on bottom of the screen)
the params are used to also make the tops of the bottom pipe and the bottom of the top pipe.
*/
function makePipe(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){
  ctx.clearRect(0, 0, c.width, c.height); //clears the canvas each time it loops to give illusion of animation
  for (var i = 0; i < rectArray.length; i++) { //goes through the array, which stores the specifications for drawing the pipes
    //code for the bottom, long pipe
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL); //specifications for drawing the pipe
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the top of the pipe on the bottom of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosL-15, rectArray[i].yPosL, rectArray[i].widthL+30, 40); //gives specifications for drawing it
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the long pipe moving at the top of the canvas/screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the bottom of the long/bigger pipe moving at the top of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPosU-15, rectArray[i].heightU-40, rectArray[i].widthU+30, 40); //gives specifications for drawing it
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
  }
}

/* collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight)
@param lowRectX {obj}- x position of the long, bottom tube
@param lowRectY {obj}- y position of the long, bottom tube
@param lowRectWid {obj}- the width of the long, bottom tube
@param lowRectHeight {obj}- the height of the long, bottom tube
@param upRectX {obj}- x position of the long, top tube
@param upRectY {obj}- y position of the long, top tube
@param upRectWid {obj}- the width of the long, top tube
@param upRectHeight {obj}- the height of the long, top tube
this function checks to see if the ball is touching/going through the left sides and top/bottom sides of the two pipes
*/
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight){
  if ((ball.xPos + ball.xMove + ball.rad > lowRectX) && (ball.xPos + ball.xMove + ball.rad < lowRectX + 2)) {//Checks to see if the ball has passed through the gap between the pipes
    score ++; //if it did, add a point to the score
    console.log(score); //log the score so it is visible and we can keep track of it
    document.getElementById('score').innerHTML = score;//shows the points (and updated points) on the top center of the screen
  }
  //alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //if there is contact, game ends and send up an alert box telling you to start over and your score
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
//this function uses the functions above to actually draw the shapes onto the canvas/screen
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //clears the screen
  if (gameState == 0) {
    drawStart();
  }
  if (gameState == 1) {
    makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height); //draws the pipes
    if (difficultTimer == 1000) { //checks for that timer value before implementing what's inside
      spaceDifficulty = spaceDifficulty - 40; //decreases the amount of time pipes are showing up, thereby decreasing the space between them
      if (spaceDifficulty < 200) { //this restricts the pipes from getting too close and overlapping each other or else it would be impossible to continue playing
        spaceDifficulty = 200;
      }
      difficultTimer = 0; //resets the timer
    }
    if (timer == spaceDifficulty) { //checks how frequently the pipes should be made
      var chance = Math.floor(Math.random() * (1 - 4) + 4); //1 out of 3 chances
      if (chance == 1) { //this if makes the tubes equal so that the gap is in the middle
        var rectHUp = Math.floor(Math.random() * (190 - 150) + 150); //gives you a random number between 150-190 for the height of the rectangle being drawn
        var rectHLow = Math.floor(Math.random() * (190 - 150) + 150); //gives you a random number between 150-190 for the height of the rectangle being drawn
      }
      if (chance == 2) { //this if makes the bottom tube smaller and the top tube larger (height wise) so that the gap is near the bottom of the screen
        var rectHUp = Math.floor(Math.random() * (310 - 290) + 290); //gives you a random number between 290-310 for the height of the rectangle being drawn
        var rectHLow = Math.floor(Math.random() * (90 - 70) + 70); //gives you a random number between 70-90 for the height of the rectangle being drawn
      }
      if (chance == 3) { //this if makes the bottom tube larger and top tube smaller (height wise) so that the gap is near the top of the screen
        var rectHUp = Math.floor(Math.random() * (90 - 70) + 70); //gives you a random number between 70-90 for the height of the rectangle being drawn
        var rectHLow = Math.floor(Math.random() * (310 - 290) + 290); //gives you a random number between 290-310 for the height of the rectangle being drawn
      }
      var rectW = Math.floor(Math.random() * (125 - 100) + 100); //gives you a random number between 100-125 for the width of the rectangle being drawn
      var newRect = {xPosL: c.width-rectW, yPosL: c.height-rectHLow, widthL: rectW, heightL: rectHLow, xPosU: c.width-rectW, yPosU: 0, widthU: rectW, heightU: rectHUp}; //stores specification for a 'set' of pipes
      rectArray.push(newRect); //pushes the set of pipe into an array so it can be used later in a for loop to access and go through
      timer = 0; //restarts the timer
    }
    for (var i = 0; i < rectArray.length; i++) { //goes through the array and makes new pipes (or adds on pipe) to show on screen using makePipe too
      makePipe(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU); //draws the pipes
      rectArray[i].xPosL --; //gives illusion of moving rectangles from the right to left
      rectArray[i].xPosU --; //gives illusion of moving rectangles from the right to left
    }
    drawCircle(); //draws the circle
    if (ball.xPos + ball.xMove > c.width - ball.rad || ball.xPos + ball.xMove < ball.rad) { //checks to make sure the ball doesn't go outside of the screen in the x-direction
      ball.xMove = -ball.xMove; //if it does, make the ball go the opposite direction to make it stay inside
    }
    if (ball.yPos + ball.yMove > c.height - ball.rad || ball.yPos + ball.yMove < ball.rad) { //checks to make sure the ball doesn't go outside of the screen in the y-direction
      ball.yMove = -ball.yMove * damping; //if it does, make the ball go the opposite direction to make it stay inside
      //damping is used to make the ball's height shorter after each bounce
    }
    ball.yMove += gravity; //gravity is added to make ball come down and bounce again
    ball.xPos = 250; //allows the ball to move from left to right
    if (ball.yMove < -1) {
      imageCounter = 1;
    }
    else if (ball.yMove > 2) {
      imageCounter = 2;
    }
    else {
      imageCounter = 0;
    }
    if (((ball.yPos + ball.yMove) + ball.rad) <= c.height) { //makes sure that the ball doesn't 'sink' into the ground when it's rolling back and forth along the ground
      ball.yPos += ball.yMove;
    }
    for (var i = 0; i < rectArray.length; i++) { //checks for collision in the new pipes created and stored
      collisionCheck(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    }
    timer ++; //increments so that the timer will eventually equal 300 and implement the if
    difficultTimer ++;
  }
  if (gameState == 2) {
    drawEnd();
  }
}

setInterval(draw, 10); //like a loop that repeats the draw function to keep drawing the shapes after 10 milliseconds

document.addEventListener("keydown", makeBounce); //allows users to hit a key on keyboard to interact with the objects
function makeBounce(e) { //this function makes the ball bounce (or change direction in the x direction) when a key is pressed
  if (e.key == " ") { //if space bar is hit, then ball will bounce
    ball.yMove -= 5; //the amount the ball is changing directions by to give illusion of bounce
  }
  if (e.key == "r") { //if 'r' key is pressed, then ball will change direction
    gameState = 1;
  }
}
