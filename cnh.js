class Canhao {
  constructor(x, y, w, h, angle) {
    //propriedades
    //this.
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;

    this.cnh = loadImage("assets/canon.png");
    this.cnhbase = loadImage("assets/cannonBase.png");
  }

  show() {
    //base do canhao

    image(this.cnhbase, 70, 30, 200, 200);

    //topo do canhao
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cnh, 0, 0, this.w, this.h);
    pop();

    if (keyIsDown(UP_ARROW) && this.angle > -30) {
      this.angle -= 1;
    }

    if (keyIsDown(DOWN_ARROW) && this.angle < 60) {
      this.angle += 1;
    }
  }
}
