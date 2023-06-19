class Ball {
  constructor(x, y) {
    var balloptions = {
      isStatic: true,
    };

    this.x = x;
    this.y = y;
    this.r = 30;
    this.Body = Bodies.circle(this.x, this.y, this.r, balloptions);
    World.add(world, this.Body);
    this.Image = loadImage("assets/cannonball.png");
  }
  shoot() {
    var newAngle = canh.angle - 28;
    newAngle = newAngle * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.Body, false);
    Matter.Body.setVelocity(this.Body, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14),
    });
  }
  show() {
    var pos = this.Body.position;
    push();
    imageMode(CENTER);
    image(this.Image, pos.x, pos.y, this.r, this.r);
    pop();
  }

  rmv(index) {
    setTimeout(() => {
      World.remove(world, this.Body);
      delete balls[index];
    }, 1000);
  }
}
