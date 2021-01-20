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

//this function draws the circle on the screen
function drawCircle() {
  ctx.beginPath(); //this starts the drawing for the circle
  ctx.arc(ball.xPos, ball.yPos, ball.rad, 0, Math.PI*2); //gives the specification for drawing the circle
  ctx.fillStyle = "red"; //gives the color to draw the ball in
  ctx.fill(); //actually uses that color to draw the ball in
  ctx.stroke(); //finishes drawing the ball
}

var widthRect = Math.floor(Math.random() * (150 - 100) + 100);
//gives you a random number between 100-150 for the width of the rectangle being drawn
var heightRect = Math.floor(Math.random() * (175 - 125) + 125);
//gives you a random number between 125-175 for the height of the rectangle being drawn
var rect = {xPos: c.width-widthRect, yPos: c.height-heightRect, width: widthRect, height: heightRect};
//gives specification to be used later for the rectangle (the pipes) that will be drawn
var score = 0;//tracks score and adds a point if ball passes through the tubes
var rectArray = [];//add the for loop in the makePipe function ... memphis says i don't need parameters for the makePipe

//this function makes the two pipes (one on top and one on bottom)
function makePipe(rectXPos, rectYPos, rectWidth, rectHeight){
  ctx.clearRect(0, 0, c.width, c.height); //clears the canvas each time it loops to give illusion of animation
  for (var i = 0; i < rectArray.length; i++) {
    //code for the bottom, long pipe
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPos, rectArray[i].yPos, rectArray[i].width, rectArray[i].height); //specifications for drawing the pipe
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the top of the pipe on the bottom of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPos - 15, rectArray[i].yPos, rectArray[i].width+30, 40); //gives specifications for drawing it
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the long pipe moving at the top of the canvas/screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPos, 0, rectArray[i].width, rectArray[i].height);
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
    //code for the top of the long/bigger pipe moving at the top of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(rectArray[i].xPos - 15, rectArray[i].height-40, rectArray[i].width+30, 40); //gives specifications for drawing it
    ctx.fillStyle = "green"; //sets the fill color of the rectangle to green
    ctx.fill(); //uses the color green mentioned above to fill in the rectangle
    ctx.stroke(); //finish drawing the rectangle
  }
}

function collisionCheck(rectXPos, rectYPos, rectWidth, rectHeight){
  if ((ball.xPos + ball.xMove + ball.rad > rectXPos) && (ball.xPos + ball.xMove + ball.rad < rectXPos + 2)) {//Checks to see if the ball has passed through the gap between the pipes
    score ++; //if it did, add a point to the score
    console.log(score); //log the score so it is visible and we can keep track of it
    document.getElementById('score').innerHTML = "Score = " + score;//shows the points (and updated points) on the top center of the screen
  }
  if ((ball.xPos + ball.xMove + ball.rad > rectXPos) && (ball.yPos + ball.rad < rectHeight) && (ball.rad + ball.xPos < rectXPos + rectWidth)) { //checks for collision with the top pipe on the left side
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //if there is contact, game ends and send up an alert box telling you to start over and your score
  }
  if ((ball.xPos + ball.xMove + ball.rad > rectXPos) && (ball.yPos + ball.rad > rectYPos) && (ball.rad + ball.xPos < rectXPos + rectWidth)) { //checks for the collision with the bottom pipe on the left side
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //if there is contact, game ends and send up an alert box telling you to start over and your score
  }
  if ((ball.yPos + ball.yMove + ball.rad > rectYPos) && (ball.xPos + ball.rad < rectWidth + rectXPos + 50) && (ball.rad + ball.xPos > rectXPos)) { //checks for collision with the top of the bottom pipe
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //if there is contact, game ends and send up an alert box telling you to start over and your score
  }
  if ((ball.yPos + ball.yMove - ball.rad < rectHeight) && (ball.xPos + ball.rad < rectWidth + rectXPos + 50) && (ball.rad + ball.xPos > rectXPos)) { //checks for collision with the top of the bottom pipe
    alert("GAME OVER! Your score is " + score + ". Refresh the screen to play again."); //if there is contact, game ends and send up an alert box telling you to start over and your score
  }
}

//this function uses the functions above to actually draw the shapes onto the canvas/screen
var timer = 0;
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //clears the screen
  makePipe(rect.xPos, rect.yPos, rect.width, rect.height); //draws the pipes
  rect.xPos --; //gives the illusion that the pipes are moving from the right to the left
  if (timer == 300) {
    var width = Math.floor(Math.random() * (150 - 100) + 100);
    //gives you a random number between 100-150 for the width of the rectangle being drawn
    var height = Math.floor(Math.random() * (175 - 125) + 125);
    //gives you a random number between 125-175 for the height of the rectangle being drawn
    var newRect = {xPos: c.width-width, yPos: c.height-height, width: width, height: height};
    //gives specification to be used later for the rectangle (the pipes) that will be drawn
    rectArray.push(newRect);
    timer = 0;
  }
  for (var i = 0; i < rectArray.length; i++) {
    makePipe(rectArray[i].xPos, rectArray[i].yPos, rectArray[i].width, rectArray[i].height); //draws the pipes
    rectArray[i].xPos --;
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
  ball.xPos = 250; //makes the ball bounce up and down in one stationary point (x-coordinate)
  if (((ball.yPos + ball.yMove) + ball.rad) <= c.height) { //makes sure that the ball doesn't 'sink' into the ground when it's rolling back and forth along the ground
    ball.yPos += ball.yMove;
  }
  for (var i = 0; i < rectArray.length; i++) {
    collisionCheck(rectArray[i].xPos, rectArray[i].yPos, rectArray[i].width, rectArray[i].height);

  }
  timer ++;
}

setInterval(draw, 10); //like a loop that repeats the draw function to keep drawing the shapes after 10 milliseconds

document.addEventListener("keydown", makeBounce); //allows users to hit a key on keyboard to interact with the objects
function makeBounce(e) { //this function makes the ball bounce (or change direction in the x direction) when a key is pressed
  if (e.key == " ") { //if space bar is hit, then ball will bounce
    ball.yMove -= 5; //the amount the ball is changing directions by to give illusion of bounce
  }
  if (e.key == "r") { //if 'r' key is pressed, then ball will change direction
    location.reload(); //it goes the opposite direction the ball was initally going in the x direction
  }
}
