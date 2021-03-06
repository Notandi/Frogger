function Tree(descr){
	this.setup(descr);
    this.rot = Math.random()*360;
    
}

Tree.prototype.loc;
Tree.prototype.speed;
Tree.prototype.xwidth = 2.0/2.0;
Tree.prototype.color;
Tree.prototype.scale;
Tree.prototype.rot;

Tree.prototype.update = function(du){

};

Tree.prototype.setup = function (descr) {
    for (var property in descr) {
        this[property] = descr[property];
    };
};
Tree.prototype.getX = function (){
    return this.loc[0];
};
Tree.prototype.getZ = function (){
    return this.loc[2];
};
Tree.prototype.getXwidth = function(){
    return this.xwidth;
};



Tree.prototype.render = function(gl){
	//setja upp sjónarhornið 
    var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.loc));

    mv1 = mult(mv1, scalem(this.scale));

    mv1 = mult(mv1, rotateY(this.rot));



    gl.uniform4fv( colorLoc, vec4(this.color) );
    gl.bindBuffer( gl.ARRAY_BUFFER, treeBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numTreeVertices );

   


};