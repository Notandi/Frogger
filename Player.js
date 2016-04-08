function Player(){
	
}

Player.prototype.Key_forward = 'W'.charCodeAt(0) ;
Player.prototype.Key_Backward = 'S'.charCodeAt(0);
Player.prototype.Key_Left = 'A'.charCodeAt(0);
Player.prototype.Key_Right = 'D'.charCodeAt(0);
Player.prototype.Loc = vec3(0.0,0.0,0.0)
Player.prototype.xwidth = 0.25;
Player.prototype.zwidth = 0.25;
Player.prototype.speed = 0.1;
Player.prototype.extraspeed = 0.0;

Player.prototype.update = function(du){
	if (entityManager.carcollision(this.Loc[0],this.xwidth,this.Loc[2],this.zwidth)){
		this.Loc = vec3(0.0,0.0,0.0);
		at = vec3(0.0,0.0,0.0);
		eye = vec3(0.0,1.0,-4.0);	
	}
	this.extraspeed = entityManager.logcollision(this.Loc[0],this.xwidth,this.Loc[2],this.zwidth);
	if (eatKey(this.Key_forward)) {
        this.Loc = add(this.Loc,vec3(0.0,0.0,1.0));
        eye[2] += 1.0;
        at[2] += 1.0;
    }
    if (eatKey(this.Key_Backward)) {
        this.Loc = add(this.Loc,vec3(0.0,0.0,-1.0));
        eye[2] -= 1.0;
        at[2] -= 1.0;
    }
    if (keys[this.Key_Left]) {
        this.Loc = add(this.Loc,vec3(this.speed*du,0.0,0.0));
        eye[0] += this.speed*du;
        at[0] += this.speed*du;
    }
    if (keys[this.Key_Right]) {
        this.Loc = add(this.Loc,vec3(-(this.speed*du),0.0,0.0));
        eye[0] -= this.speed*du;
        at[0] -= this.speed*du;
    }
    this.Loc = add(this.Loc,vec3(this.extraspeed*du,0.0,0.0));
    eye[0] += this.extraspeed*du;
    at[0] += this.extraspeed*du;
    if((this.Loc[2] > 6) && (this.extraspeed == 0.0)){
    	this.Loc = vec3(0.0,0.0,0.0);
		at = vec3(0.0,0.0,0.0);
		eye = vec3(0.0,1.0,-4.0);
    }

};

Player.prototype.render = function(gl){
	//setja upp sjónarhornið 
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.Loc));
    mv1 = mult(mv1, scalem(0.5, 0.25, 0.5));
    mv1 = mult(mv1, translate(0.0, -1.7, 0.0));

    gl.uniform4fv( colorLoc, vec4(0.0, 1.0, 0.0, 1.0 ) );
    gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numPlayerVertices );

};