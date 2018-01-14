/**
 * Created by alexandre on 14/09/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.PathFinder = function (map)
    {

        this.map = map;
        this.start = { x : 0, y : 0};
        this.end = { x : this.map.width - 1, y : this.map.height - 1 };

        this.setStartPoint = function(x, y)
        {
            this.start.x = x;
            this.start.y = y;
        };

        this.setEndPoint = function(x, y)
        {
            this.end.x = x;
            this.end.y = y;
        };

        this.obstacles = [];

        this.getPath = function() {

           var pathfinder = this;

            var frontier = [];
            frontier.push(this.getCellNumber(this.start.x, this.start.y));

            var new_frontier = [];

            var came_from = {};
            came_from[this.getCellNumber(this.start.x, this.start.y)] = null;

            var current = null;

            var neighbors = [];

            var number = 0;

            var parents = {};

            var found = false;


            while (frontier.length > 0 && !found) {

                new_frontier = [];
                for (var i = 0; i < frontier.length && !found; i++) {
                    current = frontier[i];

                    if(current === pathfinder.getCellNumber(pathfinder.end.x, pathfinder.end.y)) {
                        found = true;
                    }
                    else {
                        if(current !== pathfinder.getCellNumber(pathfinder.start.x, pathfinder.start.y) && current !== pathfinder.getCellNumber(pathfinder.end.x, pathfinder.end.y)) {
                            //TODO mark as visited
                        }
                    }



                    neighbors = this.getNeighbors(current);

                    for(var j = 0; j < neighbors.length && !found; j++)
                    {
                        if(came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] === undefined)
                        {
                            number++;

                            new_frontier.push(this.getCellNumber(neighbors[j].x, neighbors[j].y));
                            came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] = current;

                            if(this.getCellNumber(neighbors[j].x, neighbors[j].y) !== pathfinder.start && this.getCellNumber(neighbors[j].x, neighbors[j].y) !== pathfinder.end) {
                                //$('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).removeClass().addClass('frontier');
                                //TODO mark a new frontier
                            }
                            //$('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).html($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('step') + "<br />" + pathfinder.getArrow($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('parent-direction')));
                            //$('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).html("Step : " + number + "<br />Cell : " + this.getCellNumber(neighbors[j].x, neighbors[j].y) +  "<br />Parent :" + current);
                        }
                    }
                }

                frontier = new_frontier;
            }


            //Display path
            /*var parent = $('#t'+pathfinder.end).data('parent');
            while(parent !== undefined && parent !== null) {
                if($('#t'+parent).length > 0)
                {
                    $('#t'+parent).addClass('over');
                    parent = $('#t'+parent).data('parent');
                }
            }*/

            var path = [];
            var current = this.end;

            path.push(this.getCellNumber(this.end.x, this.end.y));

            while(current !== this.start && came_from[this.getCellNumber(current.x, current.y)] !== undefined && came_from[this.getCellNumber(current.x, current.y)] !== null)
            {
                path.push(came_from[this.getCellNumber(current.x, current.y)]);
                current = this.getCoordinates(came_from[this.getCellNumber(current.x, current.y)]);
            }

            return path.reverse();
        };

        this.getCoordinates = function(cell_number)
        {
            var x = cell_number % this.map.width;
            var y = parseInt(Math.floor(cell_number / this.map.width));
            return { x: x, y: y};
        };

        this.getCellNumber = function(x, y)
        {
            return y * this.map.width + x;
        };

        this.getNeighbors = function(cell_number)
        {
            var coordinates = this.getCoordinates(cell_number);
            var neighbors = [];

            if(coordinates.y - 1 >= 0 && this.isCellFree(coordinates.x, coordinates.y - 1))
                neighbors.push({ x: coordinates.x, y: coordinates.y - 1, parent: 'down' });
            if(coordinates.x + 1 < this.map.width && this.isCellFree(coordinates.x + 1, coordinates.y))
                neighbors.push({ x: coordinates.x + 1, y: coordinates.y, parent: 'left' });
            if(coordinates.y + 1 < this.map.height && this.isCellFree(coordinates.x, coordinates.y + 1))
                neighbors.push({ x: coordinates.x , y: coordinates.y + 1, parent: 'up' });
            if(coordinates.x - 1 >= 0 && this.isCellFree(coordinates.x - 1, coordinates.y))
                neighbors.push({ x: coordinates.x - 1, y: coordinates.y, parent: 'right' });


            return neighbors;
        };



        this.isCellFree = function(x, y)
        {
            return this.obstacles.indexOf(this.getCellNumber(x,y)) === -1;
        };
    }
})(this.erzatz);