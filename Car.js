function Car(descr){
	this.setup(descr);
    this.color = vec4(Math.random(),Math.random(),Math.random(),1.0)
}

Car.prototype.startLoc = 1.25;//vec3(1.25, -0.4, 1.0);
Car.prototype.endLoc = -12.25;//vec3(-12.25, -0.4, 1.0);
Car.prototype.loc;
Car.prototype.speed;
Car.prototype.xwidth = 1.25/2.0;
Car.prototype.zwidth = 1.0/2.0;
Car.prototype.color;

Car.prototype.update = function(du){
	//console.log("car");
	//console.log(this.time);
    var dist = vec3(-this.speed*du,0.0,0.0);
    this.loc = add(this.loc, dist);
    if (this.loc[0] < this.endLoc){
    	this.loc[0] = this.startLoc;
    }
    if (this.loc[0] > this.startLoc){
    	this.loc[0] = this.endLoc;
    }

};
Car.prototype.setup = function (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    };
};
Car.prototype.getX = function (){
	return this.loc[0];
};
Car.prototype.getZ = function (){
	return this.loc[2];
};
Car.prototype.getXwidth = function(){
	return this.xwidth;
};
Car.prototype.getZwidth = function(){
	return this.zwidth;
};

Car.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.loc));
    mv1 = mult(mv1, scalem( 0.201, 0.201, 0.201 ));
    //mv1 = mult(mv1, scalem( 1.25, 0.1, 0.4 ));

    if (this.speed > 0){
        mv1 = mult(mv1, rotateY(180))
    }

    gl.uniform4fv( colorLoc, this.color );
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numCarVertices );


    var mv2 = mv;
    mv2 = mult(mv2, translate(this.loc));
    //mv2 = mult(mv2, scalem( 0.1, 0.1, 0.1 ));
    mv2 = mult(mv2, scalem(0.5, 0.5, 0.5));
    mv2 = mult(mv2, scalem( 1.25, 0.1, 0.4 ));

    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, 0, numTarmacVertices );
};