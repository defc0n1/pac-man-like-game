class GameOverBehavior extends Sup.Behavior {
  awake() {
    this.actor.textRenderer.setText(`Score: ${Game.score}`);
    if (Game.won) {
      Sup.getActor("Game Over").textRenderer.setText("Congratulations!");
      Sup.Audio.playSound("Game Over/Victory");
    } else {
      Sup.Audio.playSound("Game Over/Game Over");
    }
  }

  update() {
    if (Sup.Input.wasKeyJustPressed("RETURN") || Sup.Input.wasKeyJustPressed("SPACE") ||
    Sup.Input.wasGamepadButtonJustPressed(0, 0) || Sup.Input.wasGamepadButtonJustPressed(0, 9)) {
      
      Sup.loadScene("Scene");
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
