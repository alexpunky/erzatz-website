/**
 * Created by alex on 19/03/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.Message = function (game)
    {
        this.bubble_width = 300;
        this.bubble_height = 100;
        this.game = game;
        this.message = new createjs.Text(' ', "20px Arial", "#ffffff");
        this.bubble = new createjs.Shape();
        //this.bubble.graphics.beginFill("#444444");
        this.bubble.alpha = 0.8;
        this.bubble.x = 0;
        this.bubble.y = 0;
        this.bubble.visble = false;

        this.oldw = 1;
        this.oldh = 1;

        this.bubble_arrow = new createjs.Shape();
        this.bubble_arrow.graphics.beginFill("#444444");
        this.bubble_arrow.alpha = 0.8;
        this.bubble_arrow.x = Math.floor((game.width - this.bubble_width) / 2) + 25;
        this.bubble_arrow.y =  Math.floor((game.height - this.bubble_height) / 2) - 10;
        this.bubble_arrow.rotation = 45;
        this.bubble_arrow.visble = false;


        game.stage.addChild(this.bubble_arrow);
        game.stage.addChild(this.bubble);
        game.stage.addChild(this.message);

        this.displayText = function(text)
        {
            this.message.set({ text: text });
            if(text !== null && text !== '')
            {
                var b = this.message.getBounds();
                this.message.x = Math.floor((game.width - b.width) / 2);
                this.message.y = Math.floor((game.height - b.height) / 2);
            }
        };

        this.drawBubble = function(posx, posy,text)
        {
            this.message.set({ text: text });
            if(text !== null && text !== '')
            {
                this.bubble.visible = true;
                this.bubble_arrow.visible = true;
                var b = this.message.getBounds();
                var width =  b.width;
                var height = b.height;

                var x = 0;
                var y = 0;
                var ax = 0;
                var ay = 0;

                //Manage bubble position
                //Y position
                if(posy - (height) - 20 > 0) { //Display bubble above character
                    //console.log('above');
                    y = posy - height - 20;
                    ay = posy - height + 10;
                }
                else { //Display bubble under character
                    //console.log('under');
                    y = posy + 35;
                    ay = posy + 25;
                }

                //X position
                if(posx + width + 20 > this.game.width) { //Display bubble on the left
                    //console.log('left');
                    x = posx - width + 20;
                    ax = posx + 15;
                }
                else { //Display bubble on the right
                    //console.log('right');
                    x = posx - 5;
                    ax = x + 25;
                }

                this.bubble.x = x;
                this.bubble.y = y;

                this.bubble.graphics.clear();
                this.bubble.graphics.beginFill("#444444");
                this.bubble.graphics.drawRoundRect(0, 0, width + 20, height + 20, 2);

                this.bubble_arrow.graphics.clear();
                this.bubble_arrow.x = ax;
                this.bubble_arrow.y =  ay;
                this.bubble_arrow.graphics.beginFill("#444444");
                this.bubble_arrow.graphics.drawRect(0, 0, 15, 15);

                this.message.set({ x: x +10, y: y+10 });
            }
            else {
                this.hideText();
            }
        };

        this.hideText = function()
        {
            this.message.set({ text: '' });
            this.bubble.visible = false;
            this.bubble_arrow.visible = false;
        };
    }
})(this.erzatz);