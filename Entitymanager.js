/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_players   : [],
_cars : [],
_logs : [],
_turtles : [],
_flies : [],
_water : [],
_tarmac : [],

// "PRIVATE" METHODS

// PUBLIC METHODS


// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._players,this._cars, this._logs, this._turtles, this._flies, this._water, this._tarmac];
},

init: function() {
    this.generatePlayers();
    this.generateCars();
    this.generateLogs();
    this.generateTurtles();
    this.generateFlies();
    this.generateWater();
    this.generateTarmac();

},

generatePlayers : function() {
    this._players.push(new Player());
},
generateCars : function() {
    //1.25, -0.4, 1.0 - starting location after car reaches end
    /*   Röð 1    */

    this._cars.push(new Car({
        loc : vec3(0.0,-0.4,1.0),
        speed : 0.1
    }));
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,1.0),
        speed : 0.1
    }));
    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,1.0),
        speed : 0.1
    }));

     /*   Röð 2    */

       this._cars.push(new Car({
        loc : vec3(0.0,-0.4,2.0),
        speed : 0.02
    }));
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,2.0),
        speed : 0.02
    }));
    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,2.0),
        speed : 0.02
    }));

    /*   Röð 3    */
    this._cars.push(new Car({
        loc : vec3(0.0,-0.4,3.0),
        speed : 0.05
    }));
       
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,3.0),
        speed : 0.05
    }));

    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,3.0),
        speed : 0.05
    }));


    /*   Röð 4    */
    this._cars.push(new Car({
        loc : vec3(0.0,-0.4,4.0),
        speed : 0.03
    }));
       
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,4.0),
        speed : 0.03
    }));

    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,4.0),
        speed : 0.03
    }));



    
},
collision : function(x,z){
    for (var c = 1; c < 2; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        for (var i = 0; i < aCategory.length; ++i) {

            var colx = Math.ceil(aCategory[i].getX());
            var colx2 = Math.floor(aCategory[i].getX());
            var colz = Math.ceil(aCategory[i].getZ());
            if ((colx == x && colz == z )||(colx2 == x && colz == z )){
                return true;
            }
        }
    }
},
generateLogs : function() {
    this._logs.push(new Log());

},
generateTurtles : function() {
    this._turtles.push(new Turtle());
},
generateFlies : function(){
    this._flies.push(new Fly());
},
generateWater : function() {
    this._water.push(new Water());
},
generateTarmac : function() {
    this._tarmac.push(new Tarmac());
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].update(du);
        }
    }
},

render: function(gl) {


    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(gl);

        }
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

