function Water(){
	
}
Water.prototype.update = function(du){
	//console.log("car");

};
Water.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(-5.5, -0.6, 8.5));
    mv1 = mult(mv1, scalem( 12, 0.1, 6 ));


    gl.uniform4fv( colorLoc, vec4(0.0, 0.0, 1.0, 1.0 ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, waterBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numWaterVertices );
};