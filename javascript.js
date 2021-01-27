var bird;//the bird!
var pipes = [];//the pipes!!

function setup() {
  createCanvas(640, 480);//black background canvas
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {//length of pipes as
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log('HIT');//this determines if the pipe has hit the bird "HIT"
    }

    if (pipes[i].offscreen()) {//this is getting rid of the pipes as they go offscreen (which is a self written function)
      pipes.splice(i, 1); //splice deletes the element from the array, in this case it is deleting the pipes as they go offscreen
    }
  }

  bird.update();//change in the bird or "update"
  bird.show();

  if (frameCount % 75 == 0) {//this makes pipes appear every so often
    pipes.push(new Pipe());//new pipe added for every divisible # by 75
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}
function Bird() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.7;//gravity is the force that is pushing the bird down
  this.lift = -12;//spent time tuneing the numbers to make it balance out
  this.velocity = 0;//gravity is the force that is causing the bird to decrease

  this.show = function() {
    fill(255);//this is the white rectangles (pipes)
    ellipse(this.x, this.y, 32, 32);
  };

  this.up = function() {
    this.velocity += this.lift; //this creates air volume for the ball and limit speed
  };

  this.update = function() {
    this.velocity += this.gravity;//this function will push the bird down
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {//this checks if the bird is less than the top of screen
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  };
}
function Pipe() {
  this.spacing = 175;
  this.top = random(height / 6, (3 / 4) * height);//random pipe size generator
  this.bottom = height - (this.top + this.spacing);
  this.x = width;//pipe width
  this.w = 80;
  this.speed = 6;//pipe speed

  this.highlight = false;

  this.hits = function(bird) {//this will recieve the bird object as its argument
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {//checks if it is actually in between the pipes
        this.highlight = true;//checking if this is actually in the proper area of the pipe
        return true;//it did return true
      }
    }
    this.highlight = false;//makes pipe turn red after the ball hits pipe
    return false;//feedback on the result of the code
  };

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);//area of the pipe
    rect(this.x, height - this.bottom, this.w, this.bottom);
  };

  this.update = function() {
    this.x -= this.speed;//changed the speed of the x var
  };

  this.offscreen = function() {//this creates the offscreen function
    if (this.x < -this.w) {//all the way off the screen before it goes away
      return true;//this evaluates the true or false aspect
    } else {//i found this section of the code online to help make it look more organized
      return false;
    }
  };
}
