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
_finishSlots : [],

// "PRIVATE" METHODS

// PUBLIC METHODS


// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._players,this._cars, this._logs, this._turtles, this._flies, this._water, this._tarmac, this._finishSlots];
},

init: function() {
    this.generatePlayers();
    this.generateCars();
    this.generateLogs();
    this.generateTurtles();
    this.generateFlies();
    this.generateWater();
    this.generateTarmac();
    this.generateFinishSlots();

},

generatePlayers : function() {
    this._players.push(new Player());
},
generateCars : function() {
    //1.25, -0.4, 1.0 - starting location after car reaches end
    /*   Röð 1    */

    this._cars.push(new Car({
        loc : vec3(0.0,-0.4,1.0),
        speed : 0.03
    }));
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,1.0),
        speed : 0.03
    }));
    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,1.0),
        speed : 0.03
    }));

     /*   Röð 2    */

       this._cars.push(new Car({
        loc : vec3(0.0,-0.4,2.0),
        speed : -0.02
    }));
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,2.0),
        speed : -0.02
    }));
    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,2.0),
        speed : -0.02
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
        speed : -0.1
    }));
       
    this._cars.push(new Car({
        loc : vec3(-5.0,-0.4,4.0),
        speed : -0.1
    }));

    this._cars.push(new Car({
        loc : vec3(-8.0,-0.4,4.0),
        speed : -0.1
    }));
    
},
surfaceCollision : function(k,x,xwidth,z, zwidth){
    
    for (var c = k; c < k+1; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        for (var i = 0; i < aCategory.length; ++i) {

            var xloc = aCategory[i].getX();
            var zloc = aCategory[i].getZ();
            var xlocwidth = aCategory[i].getXwidth();
            var zlocwidth = aCategory[i].getZwidth();
            if (((xloc + xlocwidth > x + xwidth)&& (xloc - xlocwidth < x + xwidth) && (zloc == z))
                || 
                ((xloc + xlocwidth > x - xwidth)&& (xloc - xlocwidth < x - xwidth)) && (zloc == z))
            {
                if(k === 7)//colliding block is a finish slot
                {
                    aCategory[i].changeStatus(); 
                    //Changed color on finish slot
                }                 

                return true;
            }
        }
    }
},
logcollision : function(x,xwidth,z, zwidth){
    for (var c = 2; c < 3; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        for (var i = 0; i < aCategory.length; ++i) {

            var xloc = aCategory[i].getX();
            var zloc = aCategory[i].getZ();
            var xlocwidth = aCategory[i].getXwidth() - 0.2;
            var zlocwidth = aCategory[i].getZwidth();
            if (((xloc + xlocwidth > x + xwidth)&& (xloc - xlocwidth < x + xwidth) && (zloc == z))
                || 
                ((xloc + xlocwidth > x - xwidth)&& (xloc - xlocwidth < x - xwidth)) && (zloc == z)){
                    return -aCategory[i].getSpeed();
            }
        }
        return 0.0;
    }
},
generateLogs : function() {
       /*   Röð 1    */

    this._logs.push(new Log({
        loc : vec3(0.0,-0.59,6.0),
        speed : 0.03
    }));
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,6.0),
        speed : 0.03
    }));
    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,6.0),
        speed : 0.03
    }));

     /*   Röð 2    */

       this._logs.push(new Log({
        loc : vec3(0.0,-0.59,7.0),
        speed : -0.02
    }));
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,7.0),
        speed : -0.02
    }));
    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,7.0),
        speed : -0.02
    }));

    /*   Röð 3    */
    this._logs.push(new Log({
        loc : vec3(0.0,-0.59,8.0),
        speed : 0.05
    }));
       
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,8.0),
        speed : 0.05
    }));

    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,8.0),
        speed : 0.05
    }));


    /*   Röð 4    */
    this._logs.push(new Log({
        loc : vec3(0.0,-0.59,9.0),
        speed : -0.1
    }));
       
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,9.0),
        speed : -0.1
    }));

    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,9.0),
        speed : -0.1
    }));

     /*   Röð 5    */
    this._logs.push(new Log({
        loc : vec3(0.0,-0.59,10.0),
        speed : 0.03
    }));
       
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,10.0),
        speed : 0.03
    }));

    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,10.0),
        speed : 0.03
    }));

       /*   Röð 6    */
    this._logs.push(new Log({
        loc : vec3(0.0,-0.59,11.0),
        speed : -0.06
    }));
       
    this._logs.push(new Log({
        loc : vec3(-5.0,-0.59,11.0),
        speed : -0.06
    }));

    this._logs.push(new Log({
        loc : vec3(-8.0,-0.59,11.0),
        speed : -0.06
    }));

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
    //Starting tarmac strip
    this._tarmac.push(new Tarmac({
        loc : vec3(-5.5, -0.6, 2.5),
        scale : vec3(12, 0.1, 6)
    }));



    //Finish line
    this._tarmac.push(new Tarmac({
        loc : vec3(-5.5, -0.6, 12.0),
        scale : vec3(12, 0.1, 1)
    }));

},

generateFinishSlots : function() {
    console.log("Generated finish slot");
    //Leftmost finish slot
    this._finishSlots.push(new FinishSlot({
        loc : vec3(-1.0, -0.45, 12.0),
        scale : vec3(0.5, 0.25, 0.5),
        buffer : finishSlotBuffer,
        bufferlength : numFinishSlotVertices
    }));

    this._finishSlots.push(new FinishSlot({
        loc : vec3(-4.0, -0.45, 12.0),
        scale : vec3(0.5, 0.25, 0.5),
        buffer : finishSlotBuffer,
        bufferlength : numFinishSlotVertices
    }));

    this._finishSlots.push(new FinishSlot({
        loc : vec3(-7.0, -0.45, 12.0),
        scale : vec3(0.5, 0.25, 0.5),
        buffer : finishSlotBuffer,
        bufferlength : numFinishSlotVertices
    }));

    this._finishSlots.push(new FinishSlot({
        loc : vec3(-10.0, -0.45, 12.0),
        scale : vec3(0.5, 0.25, 0.5),
        buffer : finishSlotBuffer,
        bufferlength : numFinishSlotVertices
    }));

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

