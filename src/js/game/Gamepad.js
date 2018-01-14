/**
 * Created by alexandre on 11/03/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.Gamepad = function (canvas)
    {
        this.canvas = canvas;

        this.buttons = {
            up: { hitbox: { x1: 0, x2: 0, y1: 0, y2: 0 }, sprite: { up: 'up', down: 'down'} },
            down: { hitbox: { x1: 0, x2: 0, y1: 0, y2: 0 }, sprite: { up: 'up', down: 'down'} },
            left: { hitbox: { x1: 0, x2: 0, y1: 0, y2: 0 }, sprite: { up: 'up', down: 'down'} },
            right: { hitbox: { x1: 0, x2: 0, y1: 0, y2: 0 }, sprite: { up: 'up', down: 'down'} },

            a: { hitbox: { x1: 0, x2: 0, y1: 0, y2: 0 }, sprite: { up: 'up', down: 'down'} }
        };

        this.draw = function()
        {

        };

    };
})(this.erzatz);