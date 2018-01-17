import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Item} from "../model/item";

@Injectable()
export class ResourceManagerService {

  constructor(public http: HttpClient) { }

  public path:string ;

  // TODO Parse map
  public map: any;

  public objects: any = {};

  public initialize(): Promise<boolean> {
    const objects = this.http.get('assets/level/objects.json').subscribe(data => {
      if (data) {
        for (let key in data) {
          this.objects[key] = data[key];
        }
      }
    }, error => {
      console.log(error);
    });
    const map = this.http.get('assets/level/map.json').subscribe(data => {
      this.map = data;
    }, error => {
      console.log(error);
    });


    return Observable.forkJoin(objects, map).subscribe(() => true, () => false).toPromise();
  }

  public createObject(id, message, uri, x, y)
  {
    if(this.objects[id] !== null && this.objects[id] !== 'undefined') {
      const item = this.objects[id];
      return new Item(id, item.asset, item.message, item.uri, x, y);
    } else {
      return null;
    }
  };

  /**
   *
   * @returns {Erzatz.Map}
   */
  this.createMap = function()
  {
    if(this.map !== null && typeof this.map !== 'undefined')
    {
      return new Erzatz.Map(game, this.map);
    }
    else {
      return null;
    }
  }


}
