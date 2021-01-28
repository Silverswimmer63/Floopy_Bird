//Commenting note
// @thing  : start of declarations with thing saying what it is variable,object,class and so on
// [] : tells what it is/ what it is for
// {} : restrictions, info, types, ect.
// {restricted} : states that the said thing is restricted in some way shape or form

var timmer = 0;//making an itterator for time 

var score = 0;//score counter;
//@variable c [Object] : Canvas elements
var c = document.getElementById("myCanvas");
//@variable ctx [object] : Canvas elements 2d
var ctx = c.getContext("2d");

//@variable ball [object] : ball position and restrictions
var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20};

 var flipFlap = new Image;//make an image
flipFlap.onload = function(){//load the image
 drawCircle();//call drawCircle
 }
 flipFlap.src = "flipFlapBird.png";//this is where the image goes
//@variable gravity [integer] {retricted :>1} : Gravity control 
var gravity = 0.15;

//@variable damping [integer] {restricted: >1} : changes the frictional forces on the x value
var damping = 0.01;

//@variable rad [integer] : radius of the ball
var rad = 20; 

var direction = "Forward";
//function drawCircle();
//@purpose [draw] : draws and refreshes the ball/birb
function drawCircle() {
 ctx.save();
  ctx.beginPath();//beggins dawing
  if (ball.yMove < -1) {
   flipFlap.src = "flipFlapBirdUp.png";//this is where the image goes
    direction = "Up"
  }else if (ball.yMove > 2) {
     flipFlap.src = "flipFlapBirdown.png";//this is where the image goes
  direction = "Down";
  }
  else{
    flipFlap.src = "flipFlapBird.png";//this is where the image goes
    direction = "Forward";
  }
//this was where the circle was
//ctx.arc(ball.xPos, ball.yPos, rad, 0, Math.PI*2);//starts arc for ball
 if (direction == "Forward") {
ctx.drawImage(flipFlap, (ball.xPos-(rad+10)),(ball.yPos-(rad+18)),(rad*2)+30,(rad*2)+30);//Atemping to drawing an image 
 }else if (direction == "Up") {
ctx.drawImage(flipFlap, (ball.xPos-(rad+3)),(ball.yPos-(rad+9)),(rad)+30,(rad)+30);//Atemping to drawing an image 
 }
 else if (direction == "Down") {
ctx.drawImage(flipFlap, (ball.xPos-(rad+3)),(ball.yPos-(rad+7)),(rad)+30,(rad)+30);//Atemping to drawing an image 
 }
  //ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fill();//sets the fill
  ctx.stroke();//ends drawing
  ctx.restore();
}


/*
Use this for gradient coloring of the tubes
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "green");
grd.addColorStop(1, "white");
ctx.fillStyle = grd;
ctx.fillRect(rect.xPos, rect.yPos, rect.width, rect.height);
*/
var numberOfTimes = 0;//Making an itterator
var pipeArray = [];//making an array that can hold all the pipes and there respective class call 

//@class Pipes
//@constructor_param pipeSetNum [integer] {index-start: 0, index-end:Never} : says the pipe number like a bar code
//@constructor_param pipeX [integer] {coordinate-x_Restrictions : 0 - canvas.width}
//@constructor_param pipeYpoints [object] {coordinate-y_definedBy : gapY && gapWidth} : returned object that tells the y-coord or the bottom and width of the top
//@constructor_param pipeGapY [integer] {Recommended : Value != 0, != canvas.height, (pipeGapWidth/2) (+/-) pipeGapY (>=/<=)[respectively] canvas.height || 0 } : the gap starting point 
//@constructor_param pipegapWidth [integer] {Recommended : Value != 0, != canvas.height, (pipeGapWidth/2) (+/-) pipeGapY (>=/<=)[respectively] canvas.height || 0 } : width of the gap
//@constructor_param pipeHeight [integer] {Recommended : Value != 0, != canvas.height, > 90, < canvas.height-90} : The height but not really;
class Pipes{
    constructor(pipeSetNum,pipeX,pipeYpoints,pipeGapY, gapWidth,pipeWidth,pipeHeight){
        this.pipeSetNum = pipeSetNum;//pipe number like a serial code
        this.pipeGapY = pipeGapY;//middle of the gap and the y value of it
        this.gapWidth = gapWidth;//middle of the pipe height gap width kind of value of it
        this.pipeHeight = pipeHeight;//Height of pipe
        this.pipeWidth = pipeWidth;//Width of pipe
        this.pipeX = pipeX;//x value of the pipe
        this.pipeYpoints = this.calculateGap(pipeGapY);//bottom pipe y value
    }
    calculateGap(gapY){
        if ((this.gapWidth % 2) == 0) {//if the gap is a even number
            var topHalf = (this.gapWidth/2)-1;//then make the gap have a shorter top part taller bottom
            var bottomHalf = this.gapWidth/2;
        }else{//else it is odd
            var topHalf = Math.floor(this.gapWidth/2)+1;//add one to top
            var bottomHalf = Math.floor(this.gapWidth/2);//gap width div by 2 is the bottom height
        }
            var topY = Math.abs(topHalf-this.pipeGapY);//make variable for implimentation perposes
            var bottomY = (topY+bottomHalf+this.gapWidth);//again
            var pipeObj = {topPipeY:topY,bottomPipeY:bottomY};//make a object
            return pipeObj;//return the object
    }
}

//@function makeNewPipes();
//@param px [integer] {restricted : value > 0,< canvas.width} : tells the function where to start the bottom pipe
//@param py [integer] {restricted : value > 0, < canvas.height} : tells the function what to use for the y value
//@param gy [integer] {recomended : value !== 0, !== canvas.height} : tells the function the center of the gap in the middle
//@param gw [integer] {restricted : value !== 0, !== canvas.height} : tells the function how big the gap is "Note:I relized i put width and just went with it"
//@param pw [integer] {restricted : value !== canvas.width} : tells the function what to use for the width of the pipe
//@param ph [integer] {restricted : value !== canvas.height, recommended : value !== 0} : Tells the function the height of the pipes as a base
function makeNewPipe(px,py,gy,gw,pw,ph) {
    numberOfTimes++;//indexing the pipes so they all have their own unique number value
    var newPipe = new Pipes(numberOfTimes,px,py,gy,gw,pw,ph);//Calls the class to make a new pipe
    pipeArray.push(newPipe);//pushing it to an array
    return newPipe;//returning it [wasn't needed still exists just in case if actually does matter];
}

//@variable rectWidth [integer:random] {restricted} : rectangele width raqndomizer
var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);

//@variable rectHeight [integer:random] {restricted} : rectangle height randomizer
var rectHeight = Math.floor(Math.random() * (190 - 90) + 90);

//@variable rect [object] {requires:c[variable],rectWidth[variable],rectHeight[variable]} : makes an object fpr the rectangles that make the pipes;
//pipeSetNum,pipeX,pipeYpoints,pipeGapY, gapWidth,pipeWidth,pipeHeight
var makeOne = makeNewPipe(c.width-rectWidth,c.height-rectHeight,Math.floor(Math.random()*(c.height-200)+100),85,rectWidth,rectHeight);
makeOne;
//@variable bottomPipeLoc [object] {x:integer, y:integer} : makes the y value of the gap truely random;
var bottomPipeLoc = {};


//function makePipe();
//@purpose [draw] : draws and refreshes the pipes
  function makePipe(){
    ctx.clearRect(0, 0, c.width, c.height); //since it's a loop, this clears the canvas or else a lot of circles will be draw each time this function loops
    //code for the bottom, long pipe
for (var i = 0; i < pipeArray.length;i++) {
    //code
    ctx.beginPath(); //starts the draw/path
    ctx.rect(pipeArray[i].pipeX, pipeArray[i].pipeYpoints.bottomPipeY, pipeArray[i].pipeWidth, Math.abs(pipeArray[i].pipeYpoints.bottomPipeY-c.height));//makes the pipes
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the top of the pipe on the bottom of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX - 15, pipeArray[i].pipeYpoints.bottomPipeY-20, pipeArray[i].pipeWidth+30, 40);//makes the pipes 
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills it with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the long pipe moving on the top of the canvas
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX, 0, pipeArray[i].pipeWidth, pipeArray[i].pipeYpoints.topPipeY);//makes the pieps
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills it in with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the bottom of the top pipe
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX - 15, pipeArray[i].pipeYpoints.topPipeY-40, pipeArray[i].pipeWidth+30, 40);//makes the pieps 
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills it in with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    pipeArray[i].pipeX --;//moves the pipes to the west
    if ((pipeArray[i].pipeX + pipeArray[i].pipeWidth) == 0) {
      pipeArray.splice(i-1,i)//if it is off the canvas draw it on the opposites side
      //@note [change] {When : " pipes are turned into a class "} : this will instead just nuke them 
    }
   }
  }


//function draw()
//@purpose [handeler] {handels : makePipe() [function], drawCircle() [function],clearing, ball updates}
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);//clears to allow clean updates
  makePipe();//draws pipes
  drawCircle();//draws birb/ball
  if (ball.xPos + ball.xMove > c.width - rad || ball.xPos + ball.xMove < rad) {
    ball.xMove = -ball.xMove;//changes ball/birb position x updator
  }
  if (ball.yPos + ball.yMove > c.height - rad || ball.yPos + ball.yMove < rad) {
    ball.yMove = -ball.yMove * damping;//changes ball y position updator
  }
  ball.yMove += gravity;//adds the gravity into the equation
  //ball.xPos += ball.xMove;//makes the ball move around 
  if (((ball.yPos + ball.yMove) + rad) <= c.height) {
    ball.yPos += ball.yMove; //Wall collition dirrection change
  }
  for (var i = 0; i < pipeArray.length; i++) {//for loop that itterates through the pipeArray to check for collitions
  if (ball.xPos == (pipeArray[i].pipeX+(pipeArray[i].pipeWidth/2)) && (ball.yPos >= pipeArray[i].pipeYpoints.topPipeY && ball.yPos <= pipeArray[i].pipeYpoints.bottomPipeY)) {
    score++;
    var scoreTarget = document.getElementsByClassName("score");
    scoreTarget[0].innerText = "Score : " + score;
  }
  if ((ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad < pipeArray[i].pipeHeight)||
  (ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad > pipeArray[i].pipeYpoints.bottomPipeY)||
 (ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad > pipeArray[i].pipeYpoints.bottomPipeY) ||
 (ball.yPos + ball.yMove + rad > pipeArray[i].pipeYpoints.bottomPipeY) && (ball.xPos + rad < pipeArray[i].pipeWidth + pipeArray[i].pipeX) && (rad + ball.xPos > pipeArray[i].pipeX)|| //collides with the top of the bottom pipe
  (ball.yPos + ball.yMove - rad < pipeArray[i].pipeHeight) && (ball.xPos + rad < pipeArray[i].pipeWidth + pipeArray[i].pipeX) && (rad + ball.xPos > pipeArray[i].pipeX) //collides with the top of the bottom pipe
     ){//entire line of if statements that don't allow the ball to pass through the pipes : AKA Collitions
     window.location.reload(true);//Reloads page so that it can reset 
  }
  }
  timmer++;//adding to an itter to test and check for timming 
  if (timmer == 300) {//if the time is at 3 seconds [timmer == 300 : (timmer x 10)/ 1000 = seconds];
//@variable rectWidth [integer:random] {restricted} : rectangele width raqndomizer
var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);

//@variable rectHeight [integer:random] {restricted} : rectangle height randomizer
var rectHeight = Math.floor(Math.random() * (190 - 90) + 90);

    makeNewPipe(c.width-rectWidth,c.height-rectHeight,Math.floor(Math.random()*(c.height-200)+100),85,rectWidth,rectHeight);//makes a new pipe
  timmer = 0;//reset timmer to allow for reitteration 
  }
}
setInterval(draw, 10);//draw() [Interval : start] {type:function Call, time:10ms}

//event handeler [keydown] {function : makeBounce()}
document.addEventListener("keyup", makeBounce);
function makeBounce(e) {
  //e.key [string] {r_key: "r"};
  if (e.key == " ") {
    ball.yMove -= 5;//adding to the change in the y position to make the ball jump
  }
  //e.key [string] {space_bar : " "}
  if (e.key == "r") {
    ball.xMove = -ball.xMove;//changing the direction of the x value
  }
}
