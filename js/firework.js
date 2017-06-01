function Firework() {

  this.firework = new Particle(random(width), height);

  this.update() = function() {
    firework.applyForce(gravity);
    firework.update();
  }
}
