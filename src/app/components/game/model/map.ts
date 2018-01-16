import {Cell} from "./cell";

export class Map {

  public cells: Cell[];
  public objects: any[];
  public width: number;
  public height: number;
  public cell_width = 40;
  public cell_height = 40;

  public constructor(data: { height: number, width: number, tiles: any[], objects: any[] }) {
    if (data
      && data.height
      && data.width
      && data.tiles
      && data.objects
    ) {
      this.cells = [];
      this.objects = [];
      this.width = data.width;
      this.height = data.height;
      this.cell_width = 40;
      this.cell_height = 40;
    }


    /*this.pathfinder = new Erzatz.PathFinder(this);
    this.pathfinder.setStartPoint(0, 0);


    var data = {
      images: datas.images,
      frames: datas.frames,
      animations: datas.animations
    };

    this.spriteSheet = new createjs.SpriteSheet(data);

    //Cells Management
    for (var i = 0; i < (this.width * this.height); i++)
  {
    var animation = new createjs.Sprite(this.spriteSheet, "cell" + datas.tiles[i]);
    //TODO Real cell freedom test
    if(datas.tiles[i] === 14)
    this.pathfinder.obstacles.push(i);

    animation.x = 40 * (i % this.width);
    animation.y = 40 * Math.floor(i / this.width);
    this.cells.push(animation);
    this.game.stage.addChild(animation);
  }

  for (var i = 0; i < this.cells.length; i++)
  {
    this.game.stage.addChild(this.cells[i]);
  }

  //Object management
  for(var i = 0; i < datas.objects.length; i++)
  {
    this.objects.push(game.resourceManager.createObject(datas.objects[i].id, datas.objects[i].message, datas.objects[i].uri, datas.objects[i].x, datas.objects[i].y));
  }

  //Add objects onto the stage
  for(var i = 0; i < this.objects.length; i++)
  {
    this.game.stage.addChild(this.objects[i].graphic);
  }
  }

  // Get cell number by x and y positions

  this.getCell = function(x, y)
  {
    var cell = { x: 0, y: 0 };
    if(x > 0) cell.x = Math.floor(x / this.cell_width);
    if(y > 0) cell.y = Math.floor(y / this.cell_height);

    return cell;
  };

  this.getPath = function(x, y)
  {
    this.pathfinder.setEndPoint(x, y);
    return this.pathfinder.getPath();
  };*/
  }
}
