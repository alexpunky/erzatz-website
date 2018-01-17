export class Item {
  public asset: string;
  public id: string;
  public message: string;
  public uri: string;

  public graphic: createjs.Bitmap;


  public constructor(id: string, asset: string, message: string, uri: string, x: number, y: number) {
    this.asset = asset;
    this.id = id;
    this.message = message;
    this.uri = uri;
    this.graphic = new createjs.Bitmap('assets/level/resources/' + this.asset);
    this.graphic.x = x;
    this.graphic.y = y;
  }


  public activate() {
    // TODO Event to ask for bubble display
    /*this.game.message.drawBubble(this.game.character.getPosition().x, this.game.character.getPosition().y, this.message);
    if (this.uri !== null && this.uri !== undefined) {
      if (that.game.overlay.isOpen()) {
        that.game.overlay.close();
      }
      else {
        this.game.overlay.loadContent(uri).then(function () {
          that.game.overlay.open();
        });
      }
    }*/
  }
}
