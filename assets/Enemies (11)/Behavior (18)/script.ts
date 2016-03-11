class EnemiesBehavior extends Sup.Behavior {
  private moveDirection: string = null;
  
  private position: Sup.Math.Vector2;
  
  awake() {
    this.position = this.actor.getPosition().toVector2().multiplyScalar(10);
    this.chooseDirection();
  }

  update() {
    if (this.moveDirection === "Right") {
      this.position.x += 1;
      if (this.position.x === Game.manager.tileMap.getWidth() * 10) this.position.x = -9;
    }
    
    if (this.moveDirection === "Left") {
      this.position.x -= 1;
      if (this.position.x === -10) this.position.x = Game.manager.tileMap.getWidth() * 10 - 1;
    }
    
    if (this.moveDirection === "Up") {
      this.position.y += 1;
    }
    
    if (this.moveDirection === "Down") {
      this.position.y -= 1;
    }
    
    // Check if we hit the player
    if (Math.abs(this.position.x - Game.player.position.x) < 5 &&
    Math.abs(this.position.y - Game.player.position.y) < 5) {
      Game.won = false;
      Sup.loadScene("Game Over/Scene");
    }
    
    // Check if we have to change direction
    if (this.position.x % 10 === 0 && this.position.y % 10 === 0) {
      this.chooseDirection();
    }
    
    // Update our actor's position
    this.actor.setPosition(this.position.x / 10, this.position.y / 10);
  }

  chooseDirection() {
    const availableDirections = [];
      
    const x = this.position.x / 10;
    const y = this.position.y / 10;

    if (this.moveDirection !== "Right") {
      const tile = Game.manager.tileMap.getTileAt(0, x - 1, y);
      if (tile === -1) availableDirections.push("Left");
    }

    if (this.moveDirection !== "Left") {
      const tile = Game.manager.tileMap.getTileAt(0, x + 1, y);
      if (tile === -1) availableDirections.push("Right");
    }

    if (this.moveDirection !== "Up") {
      const tile = Game.manager.tileMap.getTileAt(0, x, y - 1);
      if (tile === -1) availableDirections.push("Down");
    }

    if (this.moveDirection !== "Down") {
      const tile = Game.manager.tileMap.getTileAt(0, x, y + 1);
      if (tile === -1) availableDirections.push("Up");
    }

    this.moveDirection = Sup.Math.Random.sample(availableDirections);
    this.actor.spriteRenderer.setAnimation(`Walk ${this.moveDirection}`);
  }
}
Sup.registerBehavior(EnemiesBehavior);
