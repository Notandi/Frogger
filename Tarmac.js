function Tarmac(descr){
    this.setup(descr);
	
}

Tarmac.prototype.update = function(du){
	//console.log("car");

};

Tarmac.prototype.loc;
Tarmac.prototype.scale;
Tarmac.prototype.color;

Tarmac.prototype.setup = function (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    };
};

Tarmac.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.loc));
        mv1 = mult(mv1, scalem(0.5,0.5,0.5));

    mv1 = mult(mv1, scalem(this.scale));


    gl.uniform4fv( colorLoc, this.color );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numWaterVertices );
};