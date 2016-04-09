function Ply(){
	this.colorCube();
	this.PR = PlyReader();
}
Ply.prototype.PR;
Ply.prototype.points = [];

Ply.prototype.getPlayer = function(){
    var plyData = this.PR.read("frog.ply");
    return plyData.points;
};
Ply.prototype.getCar = function(){
	var plyData = this.PR.read("car.ply");
    return plyData.points;
};
Ply.prototype.getLog = function(){
	var plyData = this.PR.read("log.ply");
    return plyData.points;
};
Ply.prototype.getFly = function(){
	return this.points;
};
Ply.prototype.getTurtle = function(){
	return this.points;
};
Ply.prototype.getWater = function(){
	return this.points;
};
Ply.prototype.getTarmac = function(){
	return this.points;
};
Ply.prototype.getFinishSlot = function(){
	return this.points;
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

    // We need to partition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    //vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        this.points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );
    
        // for solid colored faces use 
        //colors.push(vertexColors[a]);
        
    }
};

Ply.prototype.colorCube = function()
{
    this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 4, 5, 6, 7 );
    this.quad( 5, 4, 0, 1 );
}