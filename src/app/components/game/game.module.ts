import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GameComponent} from "./game.component";
import {ResourceManagerService} from "./services/resource-manager.service";
import {PathfinderService} from "./services/pathfinder.service";




@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    GameComponent
  ],
  providers: [ResourceManagerService, PathfinderService],
  bootstrap: [GameComponent]
})
export class GameModule { }
