class Player {
  constructor() {
    this.r = 60;
    this.x = w / 2;
    this.y = h - this.r;
    this.speed = 2;
    this.direction = 'still';
  }

  display() {
    rect(this.x, this.y, this.r, this.r);
  }
  move() {
    switch (this.direction) {
      case 'still':
        //dont move anything
        break;
      case 'up':
        // decrease y pos
        this.y -= this.speed;
        break;
      case 'down':
        //increase y position
      this.y +=this.speed;
        break;
      case 'left':
        //increase x pos
        this.x -= this.speed;
        break;
      case 'right':
        //decrease x position
        this.x += this.speed;
        break;
    }
  }

}
