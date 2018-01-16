import {Map} from './map';

export class PathFinder {
  public map: Map;
  public start: { x: number, y: number } = {x: 0, y: 0};
  public end: { x: number, y: number } = {x: this.map.width - 1, y: this.map.height - 1};
  public obstacles = [];

  public constructor(map: Map) {
    this.map = map;
  }

  public setStartPoint(x: number, y: number) {
    this.start.x = x;
    this.start.y = y;
  }

  public setEndPoint(x: number, y: number) {
    this.end.x = x;
    this.end.y = y;
  }

  public getPath() {

    const pathfinder = this;
    let frontier = [];
    frontier.push(this.getCellNumber(this.start.x, this.start.y));
    let new_frontier = [];
    const came_from = {};
    came_from[this.getCellNumber(this.start.x, this.start.y)] = null;
    let current = null;
    let neighbors = [];
    let number = 0;
    const parents = {};
    let found = false;


    while (frontier.length > 0 && !found) {

      new_frontier = [];
      for (var i = 0; i < frontier.length && !found; i++) {
        current = frontier[i];

        if (current === pathfinder.getCellNumber(pathfinder.end.x, pathfinder.end.y)) {
          found = true;
        } else {
          if (current !== pathfinder.getCellNumber(pathfinder.start.x, pathfinder.start.y)
            && current !== pathfinder.getCellNumber(pathfinder.end.x, pathfinder.end.y)) {
            // TODO mark as visited
          }
        }


        neighbors = this.getNeighbors(current);

        for (let j = 0; j < neighbors.length && !found; j++) {
          if (came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] === undefined) {
            number++;

            new_frontier.push(this.getCellNumber(neighbors[j].x, neighbors[j].y));
            came_from[this.getCellNumber(neighbors[j].x, neighbors[j].y)] = current;

            if (this.getCellNumber(neighbors[j].x, neighbors[j].y) !== this.getCellNumber(this.start.x, this.start.y)
              && this.getCellNumber(neighbors[j].x, neighbors[j].y) !== this.getCellNumber(this.end.x, this.end.y)) {
              /*$('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).removeClass().addClass('frontier');
              //TODO mark a new frontier
              */
            }
            /*$('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).html($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('step') + "<br />" + pathfinder.getArrow($('#t' + this.getCellNumber(neighbors[j].x, neighbors[j].y)).data('parent-direction')));
            $('#t'+this.getCellNumber(neighbors[j].x, neighbors[j].y)).html("Step : " + number + "<br />Cell : " + this.getCellNumber(neighbors[j].x, neighbors[j].y) +  "<br />Parent :" + current);*/
          }
        }
      }

      frontier = new_frontier;
    }

    const path = [];
    current = this.end;

    path.push(this.getCellNumber(this.end.x, this.end.y));

    while (current !== this.start && came_from[this.getCellNumber(current.x, current.y)] !== undefined
    && came_from[this.getCellNumber(current.x, current.y)] !== null) {
      path.push(came_from[this.getCellNumber(current.x, current.y)]);
      current = this.getCoordinates(came_from[this.getCellNumber(current.x, current.y)]);
    }

    return path.reverse();
  }

  public getCoordinates(cell_number) {
    const x = cell_number % this.map.width;
    const y = Math.floor(cell_number / this.map.width);
    return {x: x, y: y};
  }

  public getCellNumber(x: number, y: number) {
    return y * this.map.width + x;
  }

  public getNeighbors(cell_number) {
    const coordinates = this.getCoordinates(cell_number);
    const neighbors = [];

    if (coordinates.y - 1 >= 0 && this.isCellFree(coordinates.x, coordinates.y - 1)) {
      neighbors.push({x: coordinates.x, y: coordinates.y - 1, parent: "down"});
    }
    if (coordinates.x + 1 < this.map.width && this.isCellFree(coordinates.x + 1, coordinates.y)) {
      neighbors.push({x: coordinates.x + 1, y: coordinates.y, parent: "left"});
    }
    if (coordinates.y + 1 < this.map.height && this.isCellFree(coordinates.x, coordinates.y + 1)) {
      neighbors.push({x: coordinates.x, y: coordinates.y + 1, parent: "up"});
    }
    if (coordinates.x - 1 >= 0 && this.isCellFree(coordinates.x - 1, coordinates.y)) {
      neighbors.push({x: coordinates.x - 1, y: coordinates.y, parent: "right"});
    }


    return neighbors;
  }

  public isCellFree(x: number, y: number) {
    return this.obstacles.indexOf(this.getCellNumber(x, y)) === -1;
  }
}
