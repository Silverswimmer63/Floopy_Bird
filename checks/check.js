//Make a function that will take 2 sets of coordinates in form {x:number y:number} and determine the straight line distiance
//done on problem 27
function check1(start, end) {
  var one = start.x - end.x;
  var two = start.y - end.y;
  var dist = Math.sqrt(one * one + two * two);
  return dist;
}

//Make a function that will take a string and capitalize the first letter of each word, and return the result
//done on problem 13
function check2(string) {
  var words = string.split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    var out = words.join(" ");
  }
  return out;
}
