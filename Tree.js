function Tree(descr){
	this.setup(descr);
}

Tree.prototype.startLoc = 1.15;//vec3(1.15, -0.59, 6.0);
Tree.prototype.endLoc = -12.15;//vec3(-12.15, -0.59, 6.0);
Tree.prototype.loc;
Tree.prototype.speed;
Tree.prototype.xwidth = 2.0/2.0;


Tree.prototype.update = function(du){
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
        mv1 = mult(mv1, scalem(0.5,0.5,0.5));

    mv1 = mult(mv1, scalem(this.scale));



    gl.uniform4fv( colorLoc, vec4(0.5, 0.5, 0, 1.0 ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, treeBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, numTreeVertices );
    

    /*mv2 = mv;
    mv2 = mult(mv2, translate(this.loc));
    mv2 = mult(mv2, translate(0.0,-0.5,0.0))
    //mv2 = mult(mv2, scalem( 0.1, 0.1, 0.1 ));
    mv2 = mult(mv2, scalem(0.5, 0.5, 0.5));
    mv2 = mult(mv2, scalem( 1.0, 1.0, 1.0));

    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, 0, numTarmacVertices );*/

};