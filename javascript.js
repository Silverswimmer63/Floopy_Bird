var timmer = 0;
//Commenting note
// @thing  : start of declarations with thing saying what it is variable,object,class and so on
// [] : tells what it is/ what it is for
// {} : restrictions, info, types, ect.
// {restricted} : states that the said thing is restricted in some way shape or form

//@variable c [Object] : Canvas elements
var c = document.getElementById("myCanvas");
//@variable ctx [object] : Canvas elements 2d
var ctx = c.getContext("2d");

//@variable ball [object] : ball position and restrictions
var ball = {xPos: c.width/20, yPos: c.height/20, xMove: 5, yMove: 5, rad: 20};

//@variable gravity [integer] {retricted :>1} : Gravity control 
var gravity = 0.2;

//@variable damping [integer] {restricted: >1} : changes the frictional forces on the x value
var damping = 0.01;

//@variable rad [integer] : radius of the ball
var rad = 20; 

//function drawCircle();
//@purpose [draw] : draws and refreshes the ball/birb
function drawCircle() {
  ctx.beginPath();//beggins dawing
  ctx.arc(ball.xPos, ball.yPos, rad, 0, Math.PI*2);//starts arc for ball
  ctx.fillStyle = "red";// changes the collor to red
  ctx.fill();//sets the fill
  ctx.stroke();//ends drawing
}


/*
Use this for gradient coloring of the tubes
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "green");
grd.addColorStop(1, "white");
ctx.fillStyle = grd;
ctx.fillRect(rect.xPos, rect.yPos, rect.width, rect.height);
*/

var numberOfTimes = 0;
var pipeArray = [];

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
        if ((this.gapWidth % 2) == 0) {
            var topHalf = (this.gapWidth/2)-1;
            var bottomHalf = this.gapWidth/2;
            console.log(topHalf + " Top");
            console.log(bottomHalf + " Bottom");
        }else{
            var topHalf = Math.floor(this.gapWidth/2)+1;
            var bottomHalf = Math.floor(this.gapWidth/2);
            console.log(topHalf + " Top");
            console.log(bottomHalf + " Bottom");
        }
            var topY = Math.abs(topHalf-this.pipeGapY);
            var bottomY = (topY+bottomHalf+this.gapWidth);
            console.log(topY + " TopY");
            console.log(bottomY + " BottomY");
            var pipeObj = {topPipeY:topY,bottomPipeY:bottomY};
            return pipeObj;
    }
}

function makeNewPipe(px,py,gy,gw,pw,ph) {
    numberOfTimes++;
    var newPipe = new Pipes(numberOfTimes,px,py,gy,gw,pw,ph);
    pipeArray.push(newPipe);
    return newPipe;
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
    ctx.rect(pipeArray[i].pipeX, pipeArray[i].pipeYpoints.bottomPipeY, pipeArray[i].pipeWidth, Math.abs(pipeArray[i].pipeYpoints.bottomPipeY-c.height));
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the top of the pipe on the bottom of the screen
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX - 15, pipeArray[i].pipeYpoints.bottomPipeY-20, pipeArray[i].pipeWidth+30, 40);
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills it with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the long pipe moving on the top of the canvas
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX, 0, pipeArray[i].pipeWidth, pipeArray[i].pipeYpoints.topPipeY);
    ctx.fillStyle = "green"; //Sets the color to green.
    ctx.fill(); //Fills it in with the color provided in fillStyle.
    ctx.stroke(); //finish drawing the rectangle
    
    //code for the bottom of the top pipe
    ctx.beginPath(); //starts drawing the rectangle
    ctx.rect(pipeArray[i].pipeX - 15, pipeArray[i].pipeYpoints.topPipeY-40, pipeArray[i].pipeWidth+30, 40);
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
  for (var i = 0; i < pipeArray.length; i++) {
    var rect = pipeArray[i];
  if ((ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad < pipeArray[i].pipeHeight)||
  (ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad > pipeArray[i].pipeYpoints.bottomPipeY)||
 (ball.xPos + rad > pipeArray[i].pipeX) && (ball.yPos + rad > pipeArray[i].pipeYpoints.bottomPipeY) ||
 (ball.yPos + ball.yMove + rad > pipeArray[i].pipeYpoints.bottomPipeY) && (ball.xPos + rad < pipeArray[i].pipeWidth + pipeArray[i].pipeX) && (rad + ball.xPos > pipeArray[i].pipeX)|| //collides with the top of the bottom pipe
  (ball.yPos + ball.yMove - rad < pipeArray[i].pipeHeight) && (ball.xPos + rad < pipeArray[i].pipeWidth + pipeArray[i].pipeX) && (rad + ball.xPos > pipeArray[i].pipeX) //collides with the top of the bottom pipe
     ){
    window.alert("The Game Has Ended");
    throw new Error("GameEnd");
  }
  }
  timmer++;
  if (timmer == 300) {
//@variable rectWidth [integer:random] {restricted} : rectangele width raqndomizer
var rectWidth = Math.floor(Math.random() * (150 - 100) + 100);

//@variable rectHeight [integer:random] {restricted} : rectangle height randomizer
var rectHeight = Math.floor(Math.random() * (190 - 90) + 90);

    makeNewPipe(c.width-rectWidth,c.height-rectHeight,Math.floor(Math.random()*(c.height-200)+100),85,rectWidth,rectHeight);
  timmer = 0;
  }
}
setInterval(draw, 10);//draw() [Interval : start] {type:function Call, time:10ms}

//event handeler [keydown] {function : makeBounce()}
document.addEventListener("keyup", makeBounce);
function makeBounce(e) {
  //e.key [string] {space_bar : " ", r_key: "r"};
  if (e.key == " ") {
    ball.yMove -= 5;//adding to the change in the y position to make the ball jump
    
  }
  if (e.key == "r") {
    ball.xMove = -ball.xMove;//changing the direction of the x value
  }
}
