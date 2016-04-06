/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Fiðrildi sem blakar vængjunum.  Hægt er að snúa með
//     músinni og færa til með upp- og niður-örvum (eða
//     músarhjóli).
//
//    Hjálmtýr Hafsteinsson, febrúar 2016
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var NumVertices  = 4;

// Hnútar eins vængs sem liggur í xz-planinu
var vertices = [
    vec4( 0.0, 0.0, -0.5, 1.0 ),
    vec4( 0.75,  0.0, -1.0, 1.0 ),
    vec4( 0.5,  0.0,  0.5, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 )
];

// Litir hnútanna
var colors = [
    vec4( 1.0, 0.2, 0.0, 1.0 ),  // appelsínugulur
    vec4( 0.8, 0.2, 1.0, 1.0 ),  // fjólublár
    vec4( 1.0, 0.7, 0.3, 1.0 ),  // ljós appelsínugulur
    vec4( 1.0, 0.2, 0.0, 1.0 )   // appelsínugulur
];

var movement = false;     // Er músarhnappur niðri?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var rotWing = 0.0;        // Snúningshorn vængjanna
var incWing = 2.0;        // Breyting á snúningshorni

var zView = -4.0;         // Staðsetning áhorfanda í z-hniti

var proLoc;
var mvLoc;


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    // Setjum ofanvarpsfylki hér í upphafi
    var proj = perspective( 90.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

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
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 38:	// upp ör
                zView += 0.2;
                break;
            case 40:	// niður ör
                zView -= 0.2;
                break;
         }
     }  );  

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
    /*gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = lookAt( vec3(0.0, 1.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    rotWing += incWing;
    if( rotWing > 35.0  || rotWing < -85.0 )
        incWing *= -1;
    
    // Teikna einn væng
    var mv1 = mult( mv, rotateZ( rotWing ) );
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_FAN, 0, NumVertices );

    // Teikna hinn vænginn (speglaðann)
    var mv2 = mult( mv, rotateZ( -rotWing ) );
    mv2 = mult( mv2, scalem( -1.0, 1.0, 1.0 ) );
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLE_FAN, 0, NumVertices );*/
    entityManager.render(gl);
};
