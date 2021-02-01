//Make a function that will take 2 sets of coordinates in form {x:number y:number} and determine the straight line distiance
function check1(start, end) {
  var one = start.x - end.x;
  var two = start.y - end.y;
  var dist = Math.sqrt(one * one + two * two);
  return dist;
}
