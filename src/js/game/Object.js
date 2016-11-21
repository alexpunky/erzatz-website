/**
 * Created by alex on 26/03/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.Object = function (game, asset, id, message, uri, x, y)
    {
        this.game = game;
        this.asset = asset;
        this.id = id;
        this.message = message;
        this.uri = uri;

        this.graphic = new createjs.Bitmap("assets/level/resources/"+this.asset);
        this.graphic.x = x;
        this.graphic.y = y;

        var that = this;

        this.activate = function() {
            this.game.message.drawBubble(this.game.character.getPosition().x, this.game.character.getPosition().y, this.message);
            if(this.uri !== null && this.uri !== undefined)
            {
                this.game.overlay.loadContent(uri).then(function() {
                    that.game.overlay.open();
                });
            }
        };
    }
})(this.erzatz);