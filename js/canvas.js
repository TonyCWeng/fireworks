var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var cx = ctx.canvas.width / 2;
var cy = ctx.canvas.height / 2;

function setCanvasSize() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

const MUSIC = {
    32: ['./sounds/kick.wav'],
    65: ['./sounds/kick.wav'],
    66: ['./sounds/heavy.wav'],
    67: ['./sounds/whoosh.wav'],
    68: ['./sounds/boom.wav'],
    69: ['./sounds/heavy2.wav'],
    70: ['./sounds/swed.wav'],
    71: ['./sounds/snare1.wav'],
    72: ['./sounds/snare2.wav'],
    73: ['./sounds/sub.wav'],
    74: ['./sounds/chord2.wav'],
    75: ['./sounds/chord.wav'],
    76: ['./sounds/lightsaber.mp3'],
    77: ['./sounds/snap.wav'],
    78: ['./sounds/plastic.wav'],
    79: ['./sounds/swing.wav'],
    80: ['./sounds/saber.wav'],
    81: ['./sounds/swoosh.wav'],
    82: ['./sounds/chime.wav'],
    83: ['./sounds/correct.wav'],
    84: ['./sounds/drum.wav'],
    85: ['./sounds/bodyfall.wav'],
    86: ['./sounds/amb.wav'],
    87: ['./sounds/kk.wav'],
    88: ['./sounds/clap.wav'],
    89: ['./sounds/chop.wav'],
    90: ['./sounds/rattle.wav']
};


function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
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
      this.dx = -this.dx * 1.5;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy * 1.5;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function fadingCircle(x, y, radius, color) {
  this.x = x;
  this.y = y;
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
    this.radius -= 1;
    this.draw();
  };
}

function growingCircle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  this.update = function() {
    this.radius += 1;
    this.draw();
  };
}

function Line(x1, y1, x2, y2, vx, vy, width, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  this.update = function() {
    if (this.x > innerWidth || this.x - this.radius < 0) {
      removeAnimation(this);
      return;
    }
    this.x2 += this.vx;
    this.y2 += this.vy;
    this.draw();
  };
}

function movingLine(x1, y1, x2, y2, vx, vy, width, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  this.update = function() {
    if (this.x > innerWidth || this.x - this.radius < 0) {
      removeAnimation(this);
      return;
    }
    this.x1 += this.vx;
    this.y1 += this.vy;
    this.x2 += this.vx;
    this.y2 += this.vy;
    this.draw();
  };
}

function fadingLine(x1, y1, x2, y2, vx, vy, width, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.vx = vx;
  this.vy = vy;
  this.width = width;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  this.update = function() {
    if (this.x > innerWidth || this.x - this.radius < 0) {
      removeAnimation(this);
      return;
    }
    this.x1 -= this.vx;
    this.y1 -= this.vy;

    this.draw();
  };
}


function createHLines(x1, y1, x2, y2, vx, vy, width, color) {
  var line1 = new Line(x1, y1, x2, y2, vx, vy, width, color);
  var line2 = new Line(x1, y1+100, x2, y2+100, vx, vy, width, color);
  var line3 = new Line(x1, y1+200, x2, y2+200, vx, vy, width, color);
  var line4 = new Line(x1, y1+300, x2, y2+300, vx, vy, width, color);
  var line5 = new Line(x1, y1+400, x2, y2+400, vx, vy, width, color);
  var line6 = new Line(x1, y1+500, x2, y2+500, vx, vy, width, color);
  animations.push(line1);
  animations.push(line2);
  animations.push(line3);
  animations.push(line4);
  animations.push(line5);
  animations.push(line6);
  setTimeout(removeAnimation.bind(null, line1), 1500);
  setTimeout(removeAnimation.bind(null, line2), 1500);
  setTimeout(removeAnimation.bind(null, line3), 1500);
  setTimeout(removeAnimation.bind(null, line4), 1500);
  setTimeout(removeAnimation.bind(null, line5), 1500);
  setTimeout(removeAnimation.bind(null, line6), 1500);
}

function movingHLines(x1, y1, x2, y2, vx, vy, width, color) {
  var shot1 = new movingLine(x1, y1, x2, y2, vx, vy, width, color);
  var shot2 = new movingLine(x1, y1+40, x2, y2+40, vx, vy, width, color);
  var shot3 = new movingLine(x1, y1+80, x2, y2+80, vx, vy, width, color);
  var shot4 = new movingLine(x1, y1+120, x2, y2+120, vx, vy, width, color);
  var shot5 = new movingLine(x1, y1+160, x2, y2+160, vx, vy, width, color);
  var shot6 = new movingLine(x1, y1+200, x2, y2+200, vx, vy, width, color);
  animations.push(shot1);
  animations.push(shot2);
  animations.push(shot3);
  animations.push(shot4);
  animations.push(shot5);
  animations.push(shot6);
  setTimeout(removeAnimation.bind(null, shot1), 1500);
  setTimeout(removeAnimation.bind(null, shot2), 1500);
  setTimeout(removeAnimation.bind(null, shot3), 1500);
  setTimeout(removeAnimation.bind(null, shot4), 1500);
  setTimeout(removeAnimation.bind(null, shot5), 1500);
  setTimeout(removeAnimation.bind(null, shot6), 1500);
}

function moving3HLines(x1, y1, x2, y2, vx, vy, width, color) {
  var shot1 = new movingLine(x1, y1, x2, y2, vx, vy, width, color);
  var shot3 = new movingLine(x1, y1+80, x2, y2+80, vx, vy, width, color);
  var shot5 = new movingLine(x1, y1+160, x2, y2+160, vx, vy, width, color);
  animations.push(shot1);
  animations.push(shot3);
  animations.push(shot5);
  setTimeout(removeAnimation.bind(null, shot1), 1500);
  setTimeout(removeAnimation.bind(null, shot3), 1500);
  setTimeout(removeAnimation.bind(null, shot5), 1500);
}

function fadingVLines(x1, y1, x2, y2, vx, vy, width, color) {
  var shot1 = new fadingLine(x1, y1, x2, y2, vx, vy, width, color);
  var shot3 = new fadingLine(x1+100, y1, x2+100, y2, vx, vy, width, color);
  var shot5 = new fadingLine(x1+200, y1, x2+200, y2, vx, vy, width, color);
  animations.push(shot1);
  animations.push(shot3);
  animations.push(shot5);
  setTimeout(removeAnimation.bind(null, shot1), 1500);
  setTimeout(removeAnimation.bind(null, shot3), 1500);
  setTimeout(removeAnimation.bind(null, shot5), 1500);
}

function createVLines(x1, y1, x2, y2, vx, vy, width, color) {
  var vline1 = new Line(x1, y1, x2, y2, vx, vy, width, color);
  var vline2 = new Line(x1+100, y1, x2+100, y2, vx, vy, width, color);
  var vline3 = new Line(x1+200, y1, x2+200, y2, vx, vy, width, color);
  var vline4 = new Line(x1+300, y1, x2+300, y2, vx, vy, width, color);
  var vline5 = new Line(x1+400, y1, x2+400, y2, vx, vy, width, color);
  var vline6 = new Line(x1+500, y1, x2+500, y2, vx, vy, width, color);
  animations.push(vline1);
  animations.push(vline2);
  animations.push(vline3);
  animations.push(vline4);
  animations.push(vline5);
  animations.push(vline6);
  setTimeout(removeAnimation.bind(null, vline1), 1500);
  setTimeout(removeAnimation.bind(null, vline2), 1500);
  setTimeout(removeAnimation.bind(null, vline3), 1500);
  setTimeout(removeAnimation.bind(null, vline4), 1500);
  setTimeout(removeAnimation.bind(null, vline5), 1500);
  setTimeout(removeAnimation.bind(null, vline6), 1500);
}

function Rectangle(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function() {
    this.width -= 5;
    this.height -= 5;
    this.draw();
  };
}

function animateRectangles() {
  var rectangleArray = [];
  for (var i = 0; i < 10; i++) {
    const colorArr2 = ['#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'];

    var x = Math.random() * (innerWidth - 50) + 50;
    var y = Math.random() * (innerHeight - 50) + 50;
    var rand = colorArr2[Math.floor(Math.random() * colorArr2.length)];

    rectangleArray.push(new Rectangle(x, y, 25, 25, rand));
  }
  for (var zx = 0; zx < 10; zx++) {
    animations.push(rectangleArray[zx]);
    setTimeout(removeAnimation.bind(null, rectangleArray[zx]), 1500);
  }
}

function createCircles() {
  var circleArray = [];
  for (var i = 0; i < 15; i++) {
    const colorArr = [ '#ADD8E6','#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'];
    var radius = 10;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var cirColor = colorArr[Math.floor(Math.random() * colorArr.length)];

    circleArray.push(new Circle(x, y, dx, dy, radius, cirColor));
  }
  return circleArray;
}

function createFallingCircles() {
  var circleArray = [];
  for (var i = 0; i < 20; i++) {
    const colorArr = [ '#ADD8E6','#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'];
    var radius = 10;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight / 4) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = Math.random() * 2;
    var cirColor = colorArr[Math.floor(Math.random() * colorArr.length)];

    circleArray.push(new Circle(x, y, dx, dy, radius, cirColor));
  }
  return circleArray;
}

function createFCircles() {
  var circleFArray = [];
  for (var i = 0; i < 15; i++) {
    const colorArr = [ '#ADD8E6','#ffaa33', '#99ffaaa', '#00ff00', '#4411aa', '#ff1100'];
    var radius = 75;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var cirColor = colorArr[Math.floor(Math.random() * colorArr.length)];

    circleFArray.push(new fadingCircle(x, y, radius, cirColor));
  }
  return circleFArray;
}

var animations = [];

function animate() {
  console.log("abc");
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (var k = 0; k < animations.length; k++) {
    animations[k].update();
  }
  setTimeout(function() {
    requestAnimationFrame(animate);
  }, 15);
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
  var circle1 = new Circle(cx-100, cy-100, 0, 10, 100, "#ffd1dc");

  var rectangle1 = new Rectangle(200, 200, 200, 200, "#ADD8E6");
  var rectangle2 = new Rectangle(200, 450, 200, 200, "#ADD8E6");
  var rectangle3 = new Rectangle(450, 200, 200, 200, "#ADD8E6");
  var rectangle4 = new Rectangle(450, 450, 200, 200, "#ADD8E6");
  var fcircles = new createFCircles();

  let howl = new Howl({
              src: MUSIC[e.keyCode]
            }).play();

  $(".instructions").hide();

  switch (e.keyCode) {
    case 32:
      animations = [];
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
      var circle2 = new Circle (100, 400, 10, 0, 100, "#ffd1dc");
      animations.push(circle2);
      setTimeout(removeAnimation.bind(null, circle2), 2000);
      break;
    case 68:
      animations.push(rectangle1);
      animations.push(rectangle2);
      animations.push(rectangle3);
      animations.push(rectangle4);
      setTimeout(removeAnimation.bind(null, rectangle1), 1000);
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
      changeBG();
      break;
    case 72:
      var fcircle1 = new fadingCircle (cx, 400, 200, "#9370DB");
      animations.push(fcircle1);
      setTimeout(removeAnimation.bind(null, fcircle1), 1000);
      break;
    case 73:
      var gcircle1 = new growingCircle(cx-100, cy-100, 100, "white");
      animations.push(gcircle1);
      setTimeout(removeAnimation.bind(null, gcircle1), 2500);
      break;
    case 74:
      createHLines(0, 100, 100, 100, 15, 0, 45, "black");
      break;
    case 75:
      for (var k = 0; k < fcircles.length; k++) {
        animations.push(fcircles[k]);
        setTimeout(removeAnimation.bind(null, fcircles[k]), 1000);
      }
      break;
    case 76:
      let fallingCircles = new createFallingCircles();
      for (var l = 0; l < fcircles.length; l++) {
        animations.push(fallingCircles[l]);
        setTimeout(removeAnimation.bind(null, fallingCircles[l]), 1000);
      }
      break;
    case 77:
      createVLines(100, 0, 100, 100, 0, 15, 45, "black");
      break;
    case 78:
      createVLines(100, ctx.canvas.height, 100, ctx.canvas.height-100, 0, -15, 45, "#DAF7A6");
      break;
    case 79:
      createHLines(ctx.canvas.width, 100, ctx.canvas.width-100, 100, -15, 0, 45, "#DAF7A6");
      break;
    case 80:
      createVLines(100, ctx.canvas.height, 100, ctx.canvas.height-100, -15, -15, 15, "#9370DB");
      createVLines(100, ctx.canvas.height, 100, ctx.canvas.height-100, 15, -15, 15, "#9370DB");
      break;
    case 81:
      createVLines(100, 0, 100, 100, 15, 15, 15, "#9370DB");
      createVLines(100, 0, 100, 100, -15, 15, 15, "#9370DB");
      break;
    case 82:
      movingHLines(-300, 450, 100, 450, 40, 0, 5, "black");
      break;
    case 83:
      moving3HLines(-600, 100, 100, 100, 15, 5, 5, "white");
      moving3HLines(-300, 400, 100, 100, 15, 5, 5, "white");
      moving3HLines(-600, 100, -300, 400, 15, 5, 5, "white");
      break;
    case 84:
      fadingVLines(50, ctx.canvas.height, 50, ctx.canvas.height-1000, 0, 15, 50, "#9370DB");
      fadingVLines(350, ctx.canvas.height, 350, ctx.canvas.height-1000, 0, 15, 50, "#9370DB");
      fadingVLines(650, ctx.canvas.height, 650, ctx.canvas.height-1000, 0, 15, 50, "#9370DB");
      break;
    case 85:
      fadingVLines(ctx.canvas.width, 150, ctx.canvas.width-2000, 150, 15, 0, 150, "#f5a6f7");
      fadingVLines(ctx.canvas.width, 350, ctx.canvas.width-2000, 350, 15, 0, 150, "#f5a6f7");
      fadingVLines(ctx.canvas.width, 550, ctx.canvas.width-2000, 550, 15, 0, 150, "#f5a6f7");
      break;
    case 86:
      flash('white');
      setTimeout(() => $("canvas").css("background-color", ""), 100);
      break;
    case 87:
      fadingVLines(-500, 150, ctx.canvas.width, 150, -30, 0, ctx.canvas.height * 3, "#white");
      break;
    case 88:
      fadingVLines(ctx.canvas.width, 150, ctx.canvas.width, 150, 30, 0, ctx.canvas.height * 3, "#black");
      break;
    case 89:
      animateRectangles();
      break;
    case 90:
      animations = [];
      break;
  }


});
window.addEventListener('resize', setCanvasSize, false);
animate();
