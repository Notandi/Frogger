function Player(){
	at = vec3(-5.5,0.0,0.0);
	eye = vec3(-5.5,1.0,-4.0);
}

Player.prototype.Key_forward = 'W'.charCodeAt(0) ;
Player.prototype.Key_Backward = 'S'.charCodeAt(0);
Player.prototype.Key_Left = 'A'.charCodeAt(0);
Player.prototype.Key_Right = 'D'.charCodeAt(0);
Player.prototype.Loc = vec3(-5.5,0.0,0.0);
Player.prototype.xwidth = 0.25/2.0;
Player.prototype.speed = 0.1;
Player.prototype.extraspeed = 0.0;
Player.prototype.Zmax = 12.0;
Player.prototype.Xmax = -11.0;
Player.prototype.Zmin = 0.0;
Player.prototype.Xmin = 0.0;
Player.prototype.score = 5000;
Player.prototype.totalscore = 0;
Player.prototype.life = 3;
Player.prototype.win = false;
Player.prototype.resetcount = 0;


Player.prototype.respawn = function(){
    this.life--;
	this.Loc = vec3(-5.5,0.0,0.0);
	at = vec3(-5.5,0.0,0.0);
	eye = vec3(-5.5,1.0,-4.0);
    this.score = 5000;
};
Player.prototype.reset = function(){
    this.resetcount++;
    this.totalscore += this.score
    this.Loc = vec3(-5.5,0.0,0.0);
    at = vec3(-5.5,0.0,0.0);
    eye = vec3(-5.5,1.0,-4.0);
    this.score = 5000;
    document.getElementById("totalscore").innerHTML = "Total score" + " : "+ Math.ceil(this.totalscore);
};


Player.prototype.update = function(du){
    if (this.resetcount === 4){
        document.getElementById("score").innerHTML = "You won !!!!!!";
        eye =  vec3(-5.5,1.0,2.0);
        at = vec3(-5.5,1.0,8.0);
        return;
    }
    if (this.life < 0){
        document.getElementById("score").innerHTML = "You lost :( ";
        this.Loc = vec3(0.0,-1.0,0.0)
        eye =  vec3(-5.5,1.0,-4.0);
        at = vec3(-5.5,0.0,0.0);
        return;
    }
    this.score -= du;
    document.getElementById("score").innerHTML = "score" + " : "+ Math.ceil(this.score);
    document.getElementById("life").innerHTML = "Life" + " : "+ this.life;

	if (eatKey(this.Key_forward)) {
        
        if(this.Loc[2] <= this.Zmax)
       	{
        	this.Loc = add(this.Loc,vec3(0.0,0.0,1.0));
        	eye[2] += 1.0;
        	at[2] += 1.0;
    	}
    }
    if (eatKey(this.Key_Backward)) {
    	if(this.Loc[2] > this.Zmin)
    	{
    		 this.Loc = add(this.Loc,vec3(0.0,0.0,-1.0));
        	eye[2] -= 1.0;
        	at[2] -= 1.0;
    	}
       
    }
    if (keys[this.Key_Left]) {

    	if(this.Loc[0] <= this.Xmin)
    	{
    		this.Loc = add(this.Loc,vec3(this.speed*du,0.0,0.0));
        	eye[0] += this.speed*du;
        	at[0] += this.speed*du;
    	}
        
    }
    if (keys[this.Key_Right]) {

    	if(this.Loc[0] >= this.Xmax)
    	{
    		this.Loc = add(this.Loc,vec3(-(this.speed*du),0.0,0.0));
        	eye[0] -= this.speed*du;
        	at[0] -= this.speed*du;
    	}
        
    }
	if (entityManager.surfaceCollision(1,this.Loc[0],this.xwidth,this.Loc[2])){
		this.respawn();	
	}
	
	if(this.Loc[0] >= this.Xmax && this.Loc[0] <= this.Xmin)
	{
		this.extraspeed = entityManager.logcollision(this.Loc[0],this.xwidth,this.Loc[2]);
    	this.Loc = add(this.Loc,vec3(this.extraspeed*du,0.0,0.0));
    	eye[0] += this.extraspeed*du;
    	at[0] += this.extraspeed*du;
    }
    

    if(this.Loc[2] === 12){
    	//console.log("made it to finish line");
    	if(entityManager.surfaceCollision(7,this.Loc[0],this.xwidth,this.Loc[2])){
            this.reset();
            return;
        }

    	this.respawn();

    }
    if((this.Loc[2] >= 6) && (this.extraspeed == 0.0)){
        this.respawn();
      }
};

Player.prototype.render = function(gl){
	//setja upp sjónarhornið 
    gl.bindBuffer( gl.ARRAY_BUFFER, playerBuffer );
	var mv = lookAt( eye, at, vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );

    // færa hlut
    var mv1 = mv;
    mv1 = mult(mv1, translate(this.Loc));
    mv1 = mult(mv1, scalem(0.1, 0.1, 0.1));
    mv1 = mult(mv1, translate(0.0, -4.5, 0.0));

    gl.uniform4fv( colorLoc, vec4(0.0, 1.0, 0.0, 1.0 ) );
    
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays( gl.TRIANGLES, 0, numPlayerVertices );
    /*var mv2 = mv;

    mv2 = mult(mv2, translate(this.Loc));
    mv2 = mult(mv2, translate(0.0,-0.5,0.0))
    //mv2 = mult(mv2, scalem( 0.1, 0.1, 0.1 ));
    mv2 = mult(mv2, scalem(0.5, 0.5, 0.5));
    mv2 = mult(mv2, scalem( 0.25, 0.25, 0.25 ));

    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );
    gl.bindBuffer( gl.ARRAY_BUFFER, tarmacBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, 0, numTarmacVertices );*/

};