/**
 * Created by alex on 26/03/2015.
 */
this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.ResourceManager = function (game, path)
    {
        this.game = game;
        this.path = path;
        this.map = null;
        this.pathfinder = null;

        this.objects = {};

        this.initialize = function() {
            var manager = this;

            var promise_objects = $.ajax({
                url: 'assets/level/objects.json',
                dataType: 'json'
            }).done(function (data) {
                for(var key in data)
                {
                    manager.objects[data[key].id] = data[key];
                }
                console.log('load objects');
            }).fail(function() {
                console.log('Oh no, what happened when we were loading objects?');
            });

            var promise_map = $.ajax({
                   url: 'assets/level/map.json',
                   dataType: 'json'
               }).done(function (data) {
                   console.log('load map');
                   manager.map = data;
               }).fail(function() {
                   console.log('Oh no, we failed to load the map!');
               });

            return $.when(promise_objects, promise_map);
        };

        this.createObject = function(id, message, x, y)
        {
            if(this.objects[id] !== null && this.objects[id] !== 'undefined') {
                return new Erzatz.Object(this.game, this.objects[id].asset, this.objects[id].id, message, x ,y);
            }
            else {
                return null;
            }
        };

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
})(this.erzatz);