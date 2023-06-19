const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var fundo;
var tower, towerImg;
var canh;
var ball;
var balls = [];
var barcos = [];

function preload() {
  fundo = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);

  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  canh = new Canhao(180, 130, 130, 100, 20);
}

function draw() {
  background(189);

  image(fundo, 0, 0, 1200, 600);

  canh.show();

  gnrtshp();

  push();

  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showballs(balls[i], i);
    cllsion(i);
  }

  Engine.update(engine);
}

function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var ball = new Ball(canh.x, canh.y);
    balls.push(ball);
  }
}

function showballs(ball, i) {
  if (ball) {
    ball.show();

    if (ball.Body.position.x >= width || ball.Body.position.y >= height - 50) {
      ball.rmv(i);
    }
  }
}

function gnrtshp() {
  if (barcos.length > 0) {
    if (
      barcos.length < 4 &&
      barcos[barcos.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -50, -70, -80];
      var position = random(positions);
      var barco = new Barco(width, height - 100, 170, 170, position);
      barcos.push(barco);
    }
  } else {
    var barco = new Barco(width, height - 100, 170, 170, -60);
    barcos.push(barco);
  }

  for (var i = 0; i < barcos.length; i++) {
    Matter.Body.setVelocity(barcos[i].body, {
      x: -0.9,
      y: 0,
    });

    barcos[i].show();
  }
}

function cllsion(index) {
  for (var i = 0; i < barcos.length; i++) {
    if (balls[index] !== undefined && barcos[i] !== undefined) {
      var colisao = Matter.SAT.collides(balls[index].Body, barcos[i].body);
      if (colisao.collided) {
        barcos[i].rmv(i);
        World.remove(world, balls[index].Body);
        delete balls[index];
      }
    }
  }
}
