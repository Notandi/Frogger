function Car(){
	
}

Car.prototype.startLoc = vec3(1.25, -0.4, 1.0);
Car.prototype.endLoc = vec3(-12.25, -0.4, 1.0);
Car.prototype.loc;

Car.prototype.update = function(du){
	//console.log("car");

};
Car.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(-12.25, -0.4, 1.0));
    mv1 = mult(mv1, scalem( 1.5, 0.3, 0.6 ));
    //mv1 = mult(mv1, scalem( 1.25, 0.1, 0.4 ));

    gl.uniform4fv( colorLoc, vec4(0.4, 0.4, 0.4, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numCarVertices );
};