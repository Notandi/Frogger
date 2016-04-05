function Butterfly(){
	var colors = [
    vec4( Math.random()* 1.0, Math.random()* 1.0, Math.random()* 1.0, 1.0 ),  
    vec4( Math.random()* 1.0, Math.random()* 1.0, Math.random()* 1.0, 1.0 ), 
    vec4( Math.random()* 1.0, Math.random()* 1.0, Math.random()* 1.0, 1.0 ),  
    vec4( Math.random()* 1.0, Math.random()* 1.0, Math.random()* 1.0, 1.0 )];
    var heading = vec3(Math.random(),Math.random(),Math.random());
};
Butterfly.prototype.update = function(du){

};
Butterfly.prototype.render = function(gl){

};
