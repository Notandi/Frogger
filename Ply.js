function Ply(){
	
}
Ply.prototype.getPlayer = function(){
	//console.log("playervert");
	return [];
};
Ply.prototype.getCar = function(){
	//console.log("carvert");
	return [vec4( 0.0, 0.0, -0.5, 1.0 ),
    vec4( 0.75,  0.0, -1.0, 1.0 ),
    vec4( 0.5,  0.0,  0.5, 1.0 ),
    vec4( 0.0, 0.0, 0.0, 1.0 )];
};
Ply.prototype.getLog = function(){
	//console.log("logvert");
	return [];
};
Ply.prototype.getFly = function(){
	//console.log("flyvert");
	return [];
};
Ply.prototype.getTurtle = function(){
	//console.log("turtlevert");
	return [];
};

Ply.prototype.quad = function(a, b, c, d) 
{
    var vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to partition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        colors.push(vertexColors[a]);
        
    }
};