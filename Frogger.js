var canvas;
var gl;


var movement = false;     // Er músarhnappur niðri?
var spinX = 0;
var spinY = 0;
var origX;
var origY;



var zView = -4.0;         // Staðsetning áhorfanda í z-hniti

var proLoc;
var mvLoc;

var playerVertices = [];
var carVertices = [];
var logVertices = [];
var flyVertices = [];
var turtleVertices = [];

window.onload = function init()
{
   canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.7, 1.0, 0.7, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    // VBO for the player(frog)
    playerBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(playerVertices), gl.STATIC_DRAW );
    
    // VBO for the car
    carBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(carVertices), gl.STATIC_DRAW );
    
    // VBO for the log
    logBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, logBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(logVertices), gl.STATIC_DRAW );

    // VBO for the fly
    flyBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, flyBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(flyVertices), gl.STATIC_DRAW );

    // VBO for the turtle
    turtleBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, turtleBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(turtleVertices), gl.STATIC_DRAW );


    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "vColor" );
    
    mvLoc = gl.getUniformLocation( program, "modelview" );

    // set projection
    pLoc = gl.getUniformLocation( program, "projection" );
    proj = perspective( 50.0, 1.0, 1.0, 500.0 );
    gl.uniformMatrix4fv(pLoc, false, flatten(proj));

    

    // Atburðaföll fyrir mús
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY += (e.offsetX - origX) % 360;
            spinX += (e.offsetY - origY) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    
    // Atburðafall fyrir lyklaborð
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
 

    // Atburðafall fyri músarhjól
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zView += 0.2;
         } else {
             zView -= 0.2;
         }
     }  );  

    entityManager.init();
    main.init();
};

// ========
// MAINLOOP
// ========
"use strict";


var main = {
    
    // "Frame Time" is a (potentially high-precision) frame-clock for animations
    _frameTime_ms : null,
    _frameTimeDelta_ms : null,

};

// Perform one iteration of the mainloop
main.iter = function (frameTime) {
    
    // Use the given frameTime to update all of our game-clocks
    this._updateClocks(frameTime);
    
    // Perform the iteration core to do all the "real" work
    this._iterCore(this._frameTimeDelta_ms);
    
    // Request the next iteration if needed
    if (!this._isGameOver) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
    
    // First-time initialisation
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
    
    // Track frameTime and its delta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

main._iterCore = function (dt) {
    
    update(dt);
    render(gl);
};


// Annoying shim for Firefox and Safari
window.requestAnimationFrame = 
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
    main.iter(frameTime);
}

main._requestNextIteration = function () {
    window.requestAnimationFrame(mainIterFrame);
};

main.init = function () {
    
    // Grabbing focus is good, but it sometimes screws up jsfiddle,
    // so it's a risky option during "development"
    //
    //window.focus(true);

    // We'll be working on a black background here,
    // so let's use a fillStyle which works against that...
    //

    this._requestNextIteration();
};

function updateSimulation(du){
    entityManager.update(du);
};
function renderSimulation(gl){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    entityManager.render(gl);
};
