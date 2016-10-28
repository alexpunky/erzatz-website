/**
 * Created by alexandre on 14/09/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.PathFinder = function (width, height)
    {

        this.width = width;
        this.height = height;
        this.start = 0;
        this.end = width * height - 1;

        this.obstacles = [];

        this.prerun = function()
        {
            var pathfinder = this;
            var html = '<table>';
            for(var i = 0; i < this.height; i++)
            {
                html += "<tr>";
                for(var j = 0; j < this.width; j++)
                {
                    html += '<td id="t'+(j+(i * this.width))+'"></td>'
                }
                html+= "</tr>";
            }
            html += "</table>";

            $('body').append(html);

            $('#run').click(function() {
               pathfinder.run();
            });

            $('#t'+this.start).addClass('start');
            $('#t'+this.end).addClass('end');


            /*$('td').bind('mouseout', function() {
                $('.over').removeClass('over');
            });

            $('td').bind('mouseover', function() {
                $('.over').removeClass('over');
                $(this).addClass('over');
                var parent = $(this).data('parent');
                while(parent !== undefined && parent !== null) {
                    if($('#t'+parent).length > 0)
                    {
                        $('#t'+parent).addClass('over');
                        parent = $('#t'+parent).data('parent');
                    }
                }

            });*/

            $('td').click(function() {

                var mode = $('input[name=type]:checked').val();


                switch(mode)
                {
                    case "start":
                        $(this).data('obstacle', false);
                        $(this).removeClass('obstacle');
                        $('.start').removeClass('start');
                        $(this).removeClass().addClass('start');
                        pathfinder.start = parseInt($(this).attr('id').replace('t', ''));
                        break;
                    case "end":
                        $(this).data('obstacle', false);
                        $(this).removeClass('obstacle');
                        $('.end').removeClass('end');
                        $(this).removeClass().addClass('end');
                        pathfinder.end = parseInt($(this).attr('id').replace('t', ''));
                        break;
                    case "obstacle":
                        if(!$(this).hasClass('start') && !$(this).hasClass('end')) {
                            if ($(this).data('obstacle') === undefined || $(this).data('obstacle') !== true) {
                                $(this).data('obstacle', true);
                                $(this).removeClass().addClass('obstacle');
                            }
                            else {
                                $(this).data('obstacle', false);
                                $(this).removeClass('obstacle');
                            }
                        }
                        break;
                }


                pathfinder.obstacles = [];
                $('td').each(function(){
                    $(this).removeClass('visited over').html('');
                    if($(this).data('obstacle'))
                        pathfinder.obstacles.push(parseInt($(this).attr('id').replace('t', '')));
                });


                console.log(pathfinder.obstacles);
            });
        };

        this.reinitialize = function()
        {
            $('td').each(function() {
                $(this).html('');
                if(($(this).data('obstacle') === undefined || $(this).data('obstacle') === false) && !$(this).hasClass('start') && !$(this).hasClass('end'))
                {
                    $(this).removeClass();
                }
            });
        };

        this.run = function() {

            this.reinitialize();

           var pathfinder = this;

            var frontier = [];
            frontier.push(this.start);

            var new_frontier = [];

            var came_from = {};
            came_from[this.start] = null;

            var current = null;

            var neighbors = [];

            var number = 0;

            var colors = [];
            var color;

            var found = false;


            while (frontier.length > 0 && !found) {

                new_frontier = [];
                for (var i = 0; i < frontier.length && !found; i++) {
                    current = frontier[i];
                    //color = { current: current, neighbors: []};

                    if(current === pathfinder.end) {
                        found = true;
                    }
                    else {
                        if(current !== pathfinder.start && current !== pathfinder.end)
                            $('#t'+current).removeClass().addClass('visited');
                    }



                    neighbors = this.getNeighbors(current);
                    for(var j = 0; j < neighbors.length && !found; j++)
                    {
                        if(came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] === undefined)
                        {
                            //color.neighbors.push(this.getCellNumber(neighbors[j].x, neighbors[j].y));
                            number++;

                            $('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('step', number);
                            $('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('parent', current);
                            $('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('parent-direction', neighbors[j].parent);
                            $('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('cell', this.getCellNumber(neighbors[j].x, neighbors[j].y));
                            new_frontier.push(this.getCellNumber(neighbors[j].x, neighbors[j].y));
                            came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] = current;

                            if(this.getCellNumber(neighbors[j].x, neighbors[j].y) !== pathfinder.start && this.getCellNumber(neighbors[j].x, neighbors[j].y) !== pathfinder.end) {
                                $('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).removeClass().addClass('frontier');
                            }
                            $('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).html($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('step') + "<br />" + pathfinder.getArrow($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('parent-direction')));
                            //$('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).html("Step : " + number + "<br />Cell : " + this.getCellNumber(neighbors[j].x, neighbors[j].y) +  "<br />Parent :" + current);
                        }
                    }
                    //colors.push(color);
                }

                frontier = new_frontier;
            }


            //Display path
            var parent = $('#t'+pathfinder.end).data('parent');
            while(parent !== undefined && parent !== null) {
                if($('#t'+parent).length > 0)
                {
                    $('#t'+parent).addClass('over');
                    parent = $('#t'+parent).data('parent');
                }
            }
        };

        this.getCoordinates = function(cell_number)
        {
            var x = cell_number % this.width;
            var y = parseInt(Math.floor(cell_number / this.width));
            return { x: x, y: y};
        };

        this.getCellNumber = function(x, y)
        {
            return y * this.width + x;
        };

        this.getNeighbors = function(cell_number)
        {
            var coordinates = this.getCoordinates(cell_number);
            var neighbors = [];

            if(coordinates.y - 1 >= 0 && this.isCellFree(coordinates.x, coordinates.y - 1))
                neighbors.push({ x: coordinates.x, y: coordinates.y - 1, parent: 'down' });
            if(coordinates.x + 1 < this.width && this.isCellFree(coordinates.x + 1, coordinates.y))
                neighbors.push({ x: coordinates.x + 1, y: coordinates.y, parent: 'left' });
            if(coordinates.y + 1 < this.height && this.isCellFree(coordinates.x, coordinates.y + 1))
                neighbors.push({ x: coordinates.x , y: coordinates.y + 1, parent: 'up' });
            if(coordinates.x - 1 >= 0 && this.isCellFree(coordinates.x - 1, coordinates.y))
                neighbors.push({ x: coordinates.x - 1, y: coordinates.y, parent: 'right' });

            return neighbors;
        };

        this.getArrow = function(direction)
        {
            var arrow = "&#8592";
            switch(direction)
            {
                case "up":
                    arrow = "&#8593;";
                    break;
                case "down":
                    arrow = "&#8595;";
                    break;
                case "left":
                    arrow = "&#8592;";
                    break;
                case "right":
                    arrow = "&#8594;";
                    break;
            }

            return arrow;
        };

        this.isCellFree = function(x, y)
        {
            return this.obstacles.indexOf(this.getCellNumber(x,y)) === -1;
        }
    }
})(this.erzatz);