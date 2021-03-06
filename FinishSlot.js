function FinishSlot(descr){
	this.setup(descr);
}

FinishSlot.prototype.loc;
FinishSlot.prototype.scale;
FinishSlot.prototype.xwidth = 1/2.0;
FinishSlot.prototype.color = vec4(1.0, 0.0, 0.0, 1.0);
FinishSlot.prototype.buffer;
FinishSlot.prototype.bufferlength;
FinishSlot.prototype.isAvailable = true;


FinishSlot.prototype.update = function(du){
	//console.log("log");
   

};
FinishSlot.prototype.getStatus = function (){
    return this.isAvailable;
}

FinishSlot.prototype.setup = function (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    };
};
FinishSlot.prototype.getX = function (){
    return this.loc[0];
};
FinishSlot.prototype.getZ = function (){
    return this.loc[2];
};
FinishSlot.prototype.getXwidth = function(){
    return this.xwidth;
};
FinishSlot.prototype.changeStatus = function(){
    this.isAvailable = false;
    this.color = vec4(0.0, 1.0, 0.0, 1.0 );
    this.buffer = playerBuffer;
    this.bufferlength = numPlayerVertices;
    this.scale = vec3(0.1/0.5, 0.1/0.5, 0.1/0.5);
};



FinishSlot.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );
    //console.log("Rendering finish slot");

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.loc));
        mv1 = mult(mv1, scalem(0.5,0.5,0.5));

    mv1 = mult(mv1, scalem(this.scale));



    gl.uniform4fv( colorLoc, this.color );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, this.bufferlength );
};