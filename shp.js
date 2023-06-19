class Barco {
  constructor(x, y, w, h, pos) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.w = w;
    this.h = h;
    this.pos = pos;

    this.image = loadImage("assets/boat.png");
    World.add(world, this.body);
  }
  show() {
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.pos, this.w, this.h);
    pop();
  }

  rmv(index) {
    setTimeout(() => {
      World.remove(world, barcos[index].body);
      barcos.splice(index, 1);
    }, 2000);
  }
}
