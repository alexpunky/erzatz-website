/**
 * Created by alex on 22/02/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";


    /**
     * @param width
     * @param height
     * @param canvas_name
     * @constructor
     */
    Erzatz.Game = function (width, height, canvas_name) {
        this.width = width;
        this.height = height;
        this.canvas_name = canvas_name;
        this.character_speed = 8;
        this.path = [];
        this.interpolated_positions = [];
        this.interpolated_frames = 8;
        this.delay = 0;



        var KEY_UP = 38;
        var KEY_DOWN = 40;
        var KEY_LEFT = 37;
        var KEY_RIGHT = 39;


        //Initialization

        /**
         * @type {createjs.Stage}
         */
        this.stage = new createjs.Stage(canvas_name);

        /**
         * @type {Erzatz.Game}
         */
        var game = this;


        /**
         * @type {Erzatz.ResourceManager}
         */
        this.resourceManager = new Erzatz.ResourceManager(this, "assets/level/resources");

        /**
         * Call initializer then run callbacks
         */
        game.resourceManager.initialize().done(function () {
            //Add object to game object

            /**
             * @type {Erzatz.Map}
             */
            game.map = game.resourceManager.createMap();

            game.character = new erzatz.Character(game);
            game.message = new erzatz.Message(game);


            createjs.Ticker.addEventListener("tick", function (event) {
                game.update(event);
            });
            createjs.Ticker.setFPS(30);

            /**
             * Update method of the game loop
             * @param event
             */
            game.update = function (event) {
                // Actions carried out each tick (aka frame)
                if (!event.paused) {
                    var pos = game.character.getPosition();
                    var move = false;
                    var vertical = false;
                    if ((key.isPressed("up") || key.isPressed("z")) && this.canMoveUp(pos)) {
                        vertical = true;
                        move = true;
                        game.character.move_up();
                    }
                    if ((key.isPressed("down") || key.isPressed("s")) && this.canMoveDown(pos)) {
                        vertical = true;
                        move = true;
                        game.character.move_down();
                    }
                    if (!vertical && (key.isPressed("left") || key.isPressed("a")) && this.canMoveLeft(pos)) {
                        move = true;
                        game.character.move_left();
                    }
                    if (!vertical && (key.isPressed("right") || key.isPressed("d")) && this.canMoveRight(pos)) {
                        move = true;
                        game.character.move_right();
                    }

                    //Path Handler
                    if (game.path.length > 0 && ((game.delay + 20) <= Date.now()) )
                    {
                        if(game.interpolated_positions.length === 0) {
                            var current_cell = game.map.pathfinder.getCoordinates(game.path[0]);
                            var destination_cell = game.map.pathfinder.getCoordinates(game.path[1]);

                            var dist_x = Math.abs(current_cell.x - destination_cell.x) * game.map.cell_width / game.interpolated_frames;
                            var dist_y = Math.abs(current_cell.y - destination_cell.y) * game.map.cell_height / game.interpolated_frames;

                            var direction = game.getDirection(current_cell.x, current_cell.y, destination_cell.x, destination_cell.y);
                            //Interpolated position
                            for(var i = 0; i < game.interpolated_frames; i++)
                            {
                                var interpolated_position = { x: 0, y: 0 };
                                /*var new_dist_x = Math.sqrt((i+1)*game.interpolated_frames * dist_x);
                                var new_dist_y = Math.sqrt((i+1)*game.interpolated_frames * dist_y)*/;

                                if(current_cell.x > destination_cell.x)
                                {
                                    interpolated_position.x = current_cell.x * game.map.cell_width - (i+1) * dist_x;
                                }
                                else if(current_cell.x < destination_cell.x)
                                {
                                    interpolated_position.x = current_cell.x * game.map.cell_width + (i+1) * dist_x;
                                }
                                else
                                {
                                    interpolated_position.x = current_cell.x * game.map.cell_width;
                                }

                                if(current_cell.y > destination_cell.y)
                                {
                                    interpolated_position.y = current_cell.y * game.map.cell_height - (i+1) * dist_y;
                                }
                                else if(current_cell.y < destination_cell.y)
                                {
                                    interpolated_position.y = current_cell.y * game.map.cell_height + (i+1) * dist_y;
                                }
                                else
                                {
                                    interpolated_position.y = current_cell.y * game.map.cell_height;
                                }

                                game.interpolated_positions.push(interpolated_position);
                            }
                            game.path.shift();
                        }


                        //var cell = game.map.pathfinder.getCoordinates(game.path[0]);
                        /*game.character.currentAnimation.x = cell.x * game.map.cell_width+ 5;
                        game.character.currentAnimation.y = cell.y * game.map.cell_height - 20;*/
                        var position = game.interpolated_positions[0];
                        game.character.currentAnimation.x = position.x + 5;
                        game.character.currentAnimation.y = position.y - 20;
                        game.interpolated_positions.shift();

                        game.delay = Date.now();
                    }

                    if (!move)
                        game.character.stop();
                    else
                        game.message.hideText();

                    // Actions carried out when the Ticker is not paused.
                    game.stage.update();
                }
            };

            game.getDirection = function(start_x, start_y, end_x, end_y)
            {
                if(start_x > end_x)
                {
                    return "right";
                }
                else if(start_x < end_x)
                {
                    return "left";
                }
                if(start_y > end_y)
                {
                    return "down";
                }
                else
                {
                    return "up";
                }
                return null;
            };





            game.messages = [
                'Bonjour',
                'Bievenue sur mon site',
                "Moi c'est Alex",
                null
            ];

            game.currentMessage = 0;

            $(document).keyup(function (event) {
                if (event.keyCode == 32) //SPACE RELEASED
                {
                    $('.content-overlay').toggleClass('visible');
                    if (game.currentMessage >= game.messages.length) game.currentMessage = 0;

                    game.message.drawBubble(game.character.getPosition().x, game.character.getPosition().y, game.messages[game.currentMessage]);
                    game.currentMessage++;
                }
                else if(event.keyCode == 13) //RETURN RELEASED
                {
                    var activated_object = false;
                    for(var i = 0; !activated_object && i < game.map.objects.length; i++)
                    {
                        if(game.canBeActivated(game.character, game.map.objects[i])) {
                            game.map.objects[i].activate();
                            activated_object = true;
                        }
                    }
            }

            });


            game.canMoveUp = function (pos) {
                return pos.y - game.character_speed > 0
            };

            game.canMoveDown = function (pos) {
                return pos.y + game.character_speed + 48 < game.height;
            };

            game.canMoveLeft = function (pos) {
                return pos.x - game.character_speed > 0;
            };

            game.canMoveRight = function (pos) {
                return pos.x + game.character_speed + 33 < game.width;
            };

            game.canBeActivated = function (character, object)
            {
                if(Math.abs(character.getPosition().x - object.graphic.x) < 40 && Math.abs(character.getPosition().y - object.graphic.y) < 40)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            };

            game.canvas = document.getElementById(canvas_name);
            game.canvas_ctx = game.canvas.getContext('2d');

            /**
             * When window is resized, change display
             */
            game.resize = function()
            {
                /*game.canvas_ctx.width = window.innerWidth;
                game.canvas_ctx.height = window.innerHeight;

                game.canvas.width = window.innerWidth;
                game.canvas.height = window.innerHeight;

                console.log(window, game.canvas_ctx);*/
            };

            var previous = Date.now();
            var delay = 200;


            game.canvas.ontouchmove = function(event) {
                event.preventDefault();
                var now = Date.now();
                if(now - previous > delay) {
                    console.log(event.touches);
                    var pos = '';
                    for(var i = 0; i < event.touches.length; i++)
                    {
                        pos += i + ' x: '+event.touches[i].screenX + ' - y: '+event.touches[i].screenY+'<br />';
                    }
                    $('#touch').html(pos);
                }
            };

            game.stage.on("click", function(evt) {
                var x = evt.stageX;
                var y = evt.stageY;

                game.interpolated_positions = [];

                //Get cell number based on map centerview and current position
                var cell = game.map.getCell(x, y);
                game.path = game.map.getPath(cell.x, cell.y);
                game.map.pathfinder.setStartPoint(cell.x, cell.y);
            });



        }).fail(function () {
            console.log("Something went wrong");
        });

    }


})(this.erzatz);