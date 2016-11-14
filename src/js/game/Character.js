/**
 * Created by alex on 22/02/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    /**
     *
     * @param {Erzatz.Game} game
     * @constructor
     */
    Erzatz.Character = function (game)
    {
        /**
         * @type {Erzatz.Game}
         */
        this.game = game;
        this.state = 'down';

        var data = {
            framerate: 0.5,
            images: ["assets/characters/hero.png"],
            frames: {width: 33, height: 48, numFrames: 16},
            animations: {
                //Static stances
                down: 0,
                left: 4,
                right: 8,
                up: 12,
                //Dynamic animations
                run_down: [0, 3, 'run_down', 0.30],
                run_left: [4, 7, 'run_left', 0.30],
                run_right: [8, 11, 'run_right', 0.30],
                run_up: [12, 15, 'run_up', 0.25]
            }

        };

        /**
         * @type {createjs.SpriteSheet}
         */
        this.spriteSheet = new createjs.SpriteSheet(data);

        /**
         * @type {createjs.Sprite}
         */
        this.currentAnimation = new createjs.Sprite(this.spriteSheet, "down");

        this.game.stage.addChild(this.currentAnimation);

        this.move_down = function()
        {
            this.currentAnimation.y += this.game.character_speed;
            if(this.currentAnimation.currentAnimation != 'run_down')
            {
                this.currentAnimation.gotoAndPlay("run_down");
                this.state = 'run_down';
            }
        };

        this.move_up = function()
        {
            this.currentAnimation.y -= this.game.character_speed;
            if(this.currentAnimation.currentAnimation != 'run_up')
            {
                this.currentAnimation.gotoAndPlay("run_up");
                this.state = 'run_up';
            }
        };

        this.move_left = function()
        {
            this.currentAnimation.x -= this.game.character_speed;
            if(this.currentAnimation.currentAnimation != 'run_left')
            {
                this.currentAnimation.gotoAndPlay("run_left");
                this.state = 'run_left';
            }
        };

        this.move_right = function()
        {
            this.currentAnimation.x += this.game.character_speed;
            if(this.currentAnimation.currentAnimation != 'run_right')
            {
                this.currentAnimation.gotoAndPlay("run_right");
                this.state = 'run_right';
            }
        };

        this.stop = function()
        {
            if(this.state.indexOf('run_') === 0)
            {
                this.currentAnimation.gotoAndPlay(this.state.replace('run_', ''));
            }
        };

        this.getPosition = function()
        {
            return { x: this.currentAnimation.x, y: this.currentAnimation.y };
        }
    }
})(this.erzatz);