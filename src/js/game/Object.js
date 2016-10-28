/**
 * Created by alex on 26/03/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.Object = function (game, asset, id, message, x, y)
    {
        this.game = game;
        this.asset = asset;
        this.id = id;
        this.message = message;

        this.graphic = new createjs.Bitmap("assets/level/resources/"+this.asset);
        this.graphic.x = x;
        this.graphic.y = y;

        this.activate = function() {
            this.game.message.drawBubble(this.game.character.getPosition().x, this.game.character.getPosition().y, this.message);
        };
    }
})(this.erzatz);