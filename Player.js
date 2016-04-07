function Player(){
	
}
Player.prototype.Key_forward = 'W'.charCodeAt(0) ;
Player.prototype.Key_Backward = 'S'.charCodeAt(0);
Player.prototype.Key_Left = 'A'.charCodeAt(0);
Player.prototype.Key_Right = 'D'.charCodeAt(0);
Player.prototype.update = function(du){
	if (keys[this.Key_forward]) {
        console.log("Virkar framm");
    }
    if (keys[this.Key_Backward]) {
        console.log("Virkar aftur");
    }
    if (keys[this.Key_Left]) {
        console.log("Virkar vinstri");
    }
    if (keys[this.Key_Right]) {
        console.log("Virkar hægri");
    }
};
Player.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( vec3(0.0, 1.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;

    gl.uniform4fv( colorLoc, vec4(0.4, 0.4, 0.4, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numLogVertices );

};