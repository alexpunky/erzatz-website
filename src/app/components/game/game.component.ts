/// <reference path="../../../../node_modules/@types/createjs/index.d.ts" />
/// <reference path="../../../../node_modules/@types/soundjs/index.d.ts" />
/// <reference path="../../../../node_modules/@types/easeljs/index.d.ts" />
/// <reference path="../../../../node_modules/@types/preloadjs/index.d.ts" />
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private stage: createjs.Stage = null;

  constructor() { }

  ngOnInit() {
    this.stage = new createjs.Stage('stage');

    createjs.Ticker.addEventListener("tick", event => {
      this.update(event);
    });
    createjs.Ticker.framerate = 2;

  }

  private update(event): void {
    console.log(event);
  }

}
