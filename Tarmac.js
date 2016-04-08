function Tarmac(descr){
    this.setup(descr);
	
}

Tarmac.prototype.update = function(du){
	//console.log("car");

};

Tarmac.prototype.loc;
Tarmac.prototype.scale;

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
    mv1 = mult(mv1, translate(this.loc));//Á EFTIR AÐ FÍNPÚSSA
    mv1 = mult(mv1, scalem(this.scale));


    gl.uniform4fv( colorLoc, vec4(0.0, 0.0, 0.0, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numWaterVertices );
};