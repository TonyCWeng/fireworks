
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * .9;


function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function line(x, y, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function Rectangle(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  this.draw = function() {
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    this.draw();
  };
}

function createCircle(x, y, dx, dy, radius, color) {
  return new Circle(x, y, dx, dy, radius, color);
}

function createCircles() {
  var circleArray = [];
  for (var i = 0; i < 10; i++) {
    const colorArr = [ '#ADD8E6','#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'];
    var radius = 10;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * .2;
    var dy = (Math.random() - 0.5) * .2;
    var cirColor = colorArr[Math.floor(Math.random() * colorArr.length)];

    circleArray.push(new Circle(x, y, dx, dy, radius, cirColor));
  }
  return circleArray;
}

var animations = [];

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var k = 0; k < animations.length; k++) {
    animations[k].update();
  }
  requestAnimationFrame(animate);
}

function removeAnimation(object) {
  let pos = animations.indexOf(object);
  if (pos > -1) animations.splice(pos, 1);
}

function changeBG() {
  $("canvas").removeClass('cyan');
  $("canvas").removeClass('red');
  $("canvas").removeClass('lilac');
  $("canvas").removeClass('green');
  $("canvas").removeClass('pink');
  let classes = ['red', 'cyan', 'lilac', 'green', 'pink'];
  let rand = classes[Math.floor(Math.random() * classes.length)];
  $("canvas").addClass(rand);
}

function flash(color) {
  $("canvas").css("background-color", color);
}


$(document).keydown(function(e) {
  var circle1 = new Circle(600, 100, 0, 3, 100, "orange");
  var circle3 = new Circle (400, 400, 0 ,0 , 150, "purple");
  // var rectangle1 = new Rectangle(200, 450, 200, 200, "#ADD8E6");
  var rectangle2 = new Rectangle(450, 450, 200, 200, "#ADD8E6");
  var rectangle3 = new Rectangle(450, 200, 200, 200, "#ADD8E6");
  var rectangle4 = new Rectangle(200, 200, 200, 200, "#ADD8E6");

  switch (e.keyCode) {
    case 32:
      changeBG();
      break;
    case 65:
      animations.push(circle1);
      setTimeout(removeAnimation.bind(null, circle1), 2000);
      break;
    case 66:
      flash('black');
      setTimeout(() => $("canvas").css("background-color", ""), 100);
      break;
    case 67:
      var circle2 = new Circle (100, 400, 3, 0, 100, "orange");
      animations.push(circle2);
      setTimeout(removeAnimation.bind(null, circle2), 2000);
      break;
    case 68:
      // animations.push(rectangle1);
      animations.push(rectangle2);
      animations.push(rectangle3);
      animations.push(rectangle4);
      // setTimeout(removeAnimation.bind(null, rectangle1), 1000);
      setTimeout(removeAnimation.bind(null, rectangle2), 1000);
      setTimeout(removeAnimation.bind(null, rectangle3), 1000);
      setTimeout(removeAnimation.bind(null, rectangle4), 1000);
      break;
    case 69:
      flash('pink');
      setTimeout(() => $("canvas").css("background-color", ""), 100);
      break;
    case 70:
      let circleArray = createCircles();
      for (var z = 0; z < circleArray.length; z++) {
        animations.push(circleArray[z]);
        setTimeout(removeAnimation.bind(null, circleArray[z]), 1500);
      }
      break;
    case 71:
      animations = [];
      break;
    case 72:


  }

  animate();
});
