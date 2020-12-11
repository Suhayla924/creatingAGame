'use strict';

let state = 'title';
let cnv;
let points = 0;
let w = 800;
let h = 550;
let player;
let coins = [];
let flopydisks = [];
let playerImg;
let coinImg;
let flopyImg;
let bgImg;
let numberKeysPressed = 0;
let glitch;

function preload() {
  playerImg = loadImage("assets/player.png");
  coinImg = loadImage("assets/hourglass.png");
  flopyImg = loadImage("assets/flopydisk.png");
  bgImg = loadImage("assets/bench2.png");

  player = new Player();
  //  coins[0] = new coins();
  coins.push(new Coin());
  flopydisks.push(new Flopydisk());

  glitch = new Glitch();
  loadImage('assets/bench.png', function(im) {
    glitch.loadImage(im);
  });

  image(glitch.image, 200, 200)
  glitch.resetBytes();

  glitch.replaceBytes(190, 15); // swap all decimal byte 100 for 104
  glitch.randomBytes(100); // add one random byte for movement

  glitch.buildImage();
}

function setup() {
  cnv = createCanvas(w, h);
  frameRate(40);
  imageMode(CENTER);
  rectMode(CENTER);
  textFont('Courier New');
  text(color(255));
}


function draw() {
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'intro':
      intro();
      cnv.mouseClicked(introMouseClicked);
      break;
    case 'story':
      story();
      cnv.mouseClicked(storyMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    default:
      break;
  }

}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  }
  if (key == ' ') {
    player.jump();
  }
}

function keyReleased() {
  if (keyIsDown(LEFT_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(DOWN_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(UP_ARROW)) {
    numberKeysPressed++;
  }
  console.log(numberKeysPressed);

  player.direction = 'still';
}


function title() {
  background(255);
  textSize(60);
  textAlign(CENTER);
  fill(14, 17, 44);
  text('GLITCHED MEMORIES', w / 2, h / 5);
  textSize(25);
  text('click anywhere to begin', w / 2, h / 2);
}

function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'intro'
}

function intro() {
  background(255);
  textAlign(CENTER);
  fill(14, 17, 44);
  textSize(35);
  text('Read the descriptions for details.', w / 2, h / 2);
  textSize(25);
  text('click anywhere to begin', w / 2, h / 1.5);
}

function introMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1() {
  frameRate(40);
  image(glitch.image, 450, 350);
  //glitch.resetBytes();
  //glitch.replaceBytes(3, 15); // swap all decimal byte 100 for 104
  //glitch.randomBytes(10); // add one random byte for movement
  //glitch.buildImage();
  if (random(1) <= 0.06) {
    coins.push(new Coin());
  }

  if (random(1) <= 0.02) {
    flopydisks.push(new Flopydisk());
  }

  player.display();
  player.move();

  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < flopydisks.length; i++) {
    flopydisks[i].display();
    flopydisks[i].move();
  }


  for (let i = coins.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
    coins.splice(i, 1);
    //console.log('coin is out of town');
  }

  for (let i = flopydisks.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, flopydisks[i].x, flopydisks[i].y) <= (player.r + flopydisks[i].r) / 2) {
      points--;
      flopydisks.splice(i, 1);
    } else if (flopydisks[i].y > h) {
    flopydisks.splice(i, 1);
  }
  textSize(20, color(255, 255, 255));
  text(`time: ${points}`, w / 2, h / 6);


  if (points >= 20) {
    level2();
  }
}

function level2() {
  frameRate(80);

  image(glitch.image, 300, 300)
  glitch.resetBytes();

	glitch.replaceBytes(100, 104); // swap all decimal byte 100 for 104
	glitch.randomBytes(1); // add one random byte for movement

  if (random(1) <= 0.06) {
    coins.push(new Coin());
  }

  if (random(1) <= 0.02) {
    flopydisks.push(new Flopydisk());
  }

  player.display();
  player.move();

  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < flopydisks.length; i++) {
    flopydisks[i].display();
    flopydisks[i].move();
  }


  for (let i = coins.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
    coins.splice(i, 1);
    //console.log('coin is out of town');
  }

  for (let i = flopydisks.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, flopydisks[i].x, flopydisks[i].y) <= (player.r + flopydisks[i].r) / 2) {
      points--;
      flopydisks.splice(i, 1);
    } else if (flopydisks[i].y > h) {
    flopydisks.splice(i, 1);
  }
  textSize(20, color(255, 255, 255));
    text(`time: ${points}`, w / 2, h / 6);

  if (points >= 25) {
    level3();
  }
}

function level3() {
  frameRate(80);

  image(glitch.image, 300, 300)
  glitch.resetBytes();
  //glitch.replaceBytes(3, 15); // swap all decimal byte 100 for 104
  glitch.randomBytes(5); // add one random byte for movement
  glitch.buildImage();

  if (random(1) <= 0.06) {
    coins.push(new Coin());
  }

  if (random(1) <= 0.02) {
    flopydisks.push(new Flopydisk());
  }

  player.display();
  player.move();

  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < flopydisks.length; i++) {
    flopydisks[i].display();
    flopydisks[i].move();
  }


  for (let i = coins.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
    coins.splice(i, 1);
    //console.log('coin is out of town');
  }

  for (let i = flopydisks.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, flopydisks[i].x, flopydisks[i].y) <= (player.r + flopydisks[i].r) / 2) {
      points--;
      flopydisks.splice(i, 1);
    } else if (flopydisks[i].y > h) {
    flopydisks.splice(i, 1);
  }
  textSize(20, color(255, 255, 255));
    text(`time: ${points}`, w / 2, h / 6);

  if (points >= 3) {
    level4();
  }
}

function level4() {
  frameRate(80);

  image(glitch.image, 300, 300)
  glitch.resetBytes();
  glitch.replaceBytes(40, 15); // swap all decimal byte 100 for 104
  glitch.randomBytes(170); // add one random byte for movement
  glitch.buildImage();

  if (random(1) <= 0.06) {
    coins.push(new Coin());
  }

  if (random(1) <= 0.02) {
    flopydisks.push(new Flopydisk());
  }

  player.display();
  player.move();

  for (let i = 0; i < coins.length; i++) {
    coins[i].display();
    coins[i].move();
  }

  for (let i = 0; i < flopydisks.length; i++) {
    flopydisks[i].display();
    flopydisks[i].move();
  }


  for (let i = coins.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
    coins.splice(i, 1);
    //console.log('coin is out of town');
  }

  for (let i = flopydisks.length - 1; i >= 0; i--)
    if (dist(player.x, player.y, flopydisks[i].x, flopydisks[i].y) <= (player.r + flopydisks[i].r) / 2) {
      points--;
      flopydisks.splice(i, 1);
    } else if (flopydisks[i].y > h) {
    flopydisks.splice(i, 1);
  }
  textSize(20, color(255, 255, 255));
    text(`time: ${points}`, w / 2, h / 6);
  if (points >= 45) {
    level4();
  }
}

function level1MouseClicked() {
  //points++;
  //  console.log('points = ' + points);
  //  if (points >= 10) {
  //  state = 'you win'
  //}
  //n:points = points += 1; short hand is --> points++;
}