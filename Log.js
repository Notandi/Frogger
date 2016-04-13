function Log(descr){
	this.setup(descr);
}

Log.prototype.startLoc = 1.15;//vec3(1.15, -0.59, 6.0);
Log.prototype.endLoc = -12.15;//vec3(-12.15, -0.59, 6.0);
Log.prototype.loc;
Log.prototype.speed;
Log.prototype.xwidth = 1.25/2.0;
Log.prototype.zwidth = 0.6/2.0;


Log.prototype.getSpeed = function(){
    return this.speed;
}

Log.prototype.update = function(du){
	//console.log("log");
    var dist = vec3(-this.speed*du,0.0,0.0);
    this.loc = add(this.loc, dist);
    if (this.loc[0] < this.endLoc){
        this.loc[0] = this.startLoc;
    }
    if (this.loc[0] > this.startLoc){
        this.loc[0] = this.endLoc;
    }

};

Log.prototype.setup = function (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    };
};
Log.prototype.getX = function (){
    return this.loc[0];
};
Log.prototype.getZ = function (){
    return this.loc[2];
};
Log.prototype.getXwidth = function(){
    return this.xwidth;
};
Log.prototype.getZwidth = function(){
    return this.zwidth;
};



Log.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.loc));
    mv1 = mult(mv1, translate(0.0,-0.05,0.0,0.0))
    //mv1 = mult(mv1, scalem( 1.25, 1.25, 1.25 ));
    mv1 = mult(mv1, rotateZ(4));
    mv1 = mult(mv1, rotateX(90));
    mv1 = mult(mv1, rotateZ(90));

    gl.uniform4fv( colorLoc, vec4(0.5, 0.5, 0, 1.0 ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, logBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numLogVertices );
    

    /*mv2 = mv;
    mv2 = mult(mv2, translate(this.loc));
    mv2 = mult(mv2, translate(0.0,-0.5,0.0))
    //mv2 = mult(mv2, scalem( 0.1, 0.1, 0.1 ));
    mv2 = mult(mv2, scalem(0.5, 0.5, 0.5));
    mv2 = mult(mv2, scalem( 1.25, 1.25, 1.25 ));

    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, 0, numTarmacVertices );*/

};