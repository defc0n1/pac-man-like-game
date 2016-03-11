class PlayerBehavior extends Sup.Behavior {
  private desiredDirection = "Down";
  private moveDirection = "Down";

  position: Sup.Math.Vector2;
  
  awake() {
    Game.player = this;
    
    this.position = this.actor.getPosition().toVector2().multiplyScalar(10);
  }

  update() {
    // Set desired direction
    if (Sup.Input.wasKeyJustPressed("RIGHT") || Sup.Input.wasGamepadAxisJustPressed(0, 0, true)) {
      this.desiredDirection = "Right";
    }
    if (Sup.Input.wasKeyJustPressed("LEFT") || Sup.Input.wasGamepadAxisJustPressed(0, 0, false)) {
      this.desiredDirection = "Left";
    }
    if (Sup.Input.wasKeyJustPressed("UP") || Sup.Input.wasGamepadAxisJustPressed(0, 1, false)) {
      this.desiredDirection = "Up";
    }
    if (Sup.Input.wasKeyJustPressed("DOWN") || Sup.Input.wasGamepadAxisJustPressed(0, 1, true)) {
      this.desiredDirection = "Down";
    }
    
    // Check if we can change direction
    if (this.desiredDirection === "Right" && this.canMove(1, 0)) {
      this.applyDesiredDirection();
    }

    if (this.desiredDirection === "Left" && this.canMove(-1, 0)) {
      this.applyDesiredDirection();
    }
    
    if (this.desiredDirection === "Up" && this.canMove(0, 1)) {
      this.applyDesiredDirection();
    }

    if (this.desiredDirection === "Down" && this.canMove(0, -1)) {
      this.applyDesiredDirection();
    }

    // Apply our current movement direction
    if (this.moveDirection === "Right" && this.canMove(1, 0)) {
      this.position.x += 1;
      if (this.position.x === Game.manager.tileMap.getWidth() * 10) this.position.x = -10;
    }
    
    if (this.moveDirection === "Left" && this.canMove(-1, 0)) {
      this.position.x -= 1;
      if (this.position.x === -10) this.position.x = Game.manager.tileMap.getWidth() * 10;
    }
    
    if (this.moveDirection === "Up" && this.canMove(0, 1)) {
      this.position.y += 1;
    }
    
    if (this.moveDirection === "Down" && this.canMove(0, -1)) {
      this.position.y -= 1;
    }
    
    // Check if we just collected a coin
    if (this.position.x % 10 === 0 && this.position.y % 10 === 0) {
      const column = this.position.x / 10;
      const row = this.position.y / 10;
      
      Game.manager.collectCoinAt(column, row);
    }
    
    // Update our actor's position
    this.actor.setPosition(this.position.x / 10, this.position.y / 10);
  }

  canMove(moveX: number, moveY: number) {
    if (moveX !== 0) {
      if (this.position.y % 10 !== 0) return false;
    }
    
    if (moveY !== 0) {
      if (this.position.x % 10 !== 0) return false;
    }
    
    let posX = this.position.x;
    let posY = this.position.y;
    if (moveX > 0) posX += 10;
    else if(moveX < 0) posX -= 1;

    if (moveY > 0) posY += 10;
    else if(moveY < 0) posY -= 1;
    
    const tileX = Math.floor(posX / 10);
    const tileY = Math.floor(posY / 10);
    
    const tile = Game.manager.tileMap.getTileAt(0, tileX, tileY);
    if (tile !== -1) return false;

    return true;
  }

  applyDesiredDirection() {
    this.moveDirection = this.desiredDirection;
    this.actor.spriteRenderer.setAnimation(`Walk ${this.moveDirection}`);
  }
}
Sup.registerBehavior(PlayerBehavior);
