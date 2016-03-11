class GameManagerBehavior extends Sup.Behavior {
  tileMap: Sup.TileMap;
  
  private coins: Sup.Actor[][] = [];
  private coinsLeft = 0;

  private scoreRenderer: Sup.TextRenderer;

  awake() {
    Game.manager = this;
    Game.score = 0;
    
    this.tileMap = this.actor.tileMapRenderer.getTileMap();
    this.actor.tileMapRenderer.setLayerOpacity(1, 0);
    
    for (let column = 0; column < this.tileMap.getWidth(); column++) {
      const columnActors: Sup.Actor[] = [];
      this.coins.push(columnActors);

      for (let row = 0; row < this.tileMap.getHeight(); row++) {
        const tile = this.tileMap.getTileAt(1, column, row);
        if (tile === 371) {
          this.coinsLeft++;
          
          const coinActor = new Sup.Actor("Coin");
          columnActors.push(coinActor);
          const coinRenderer = new Sup.SpriteRenderer(coinActor, "Coin/Sprite");
          coinRenderer.setAnimation("Animation");
          coinActor.setPosition(column + 0.5, row + 0.5, 1);
        } else {
          columnActors.push(null);
        }
      }
    }
    
    this.scoreRenderer = Sup.getActor("Score").textRenderer;
  }

  update() {
    
  }

  collectCoinAt(column: number, row: number) {
    const coinActor = this.coins[column][row];
    if (coinActor == null) return;
    
    coinActor.destroy();
    this.coins[column][row] = null;
    this.coinsLeft--;

    this.addScore(100);
    Sup.Audio.playSound("Coin/Sound");
    
    if (this.coinsLeft === 0) {
      Game.won = true;
      Sup.loadScene("Game Over/Scene");
    }
  }

  addScore(amount: number) {
    Game.score += amount;
    this.scoreRenderer.setText(`Score: ${Game.score}`);
  }
}
Sup.registerBehavior(GameManagerBehavior);
