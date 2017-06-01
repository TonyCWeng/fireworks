const Howler = require('howler');
const Anime = require('animejs');

const Animations = (function(ctx, canvas) {

  const createCircle = (x, y) => {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0.1;
    p.alpha = .5;
    p.lineWidth = 6;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    return p;
  };



});

module.exports = Animations;
