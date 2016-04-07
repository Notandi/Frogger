function Car(){
	
}
Car.prototype.update = function(du){
	//console.log("car");

};
Car.prototype.render = function(gl){
	//setju upp sjónarhornið 
	var mv = lookAt( vec3(0.0, 1.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;

    gl.uniform4fv( colorLoc, vec4(0.4, 0.4, 0.4, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numCarVertices );
};