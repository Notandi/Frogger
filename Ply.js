function Ply(){
	this.PR = PlyReader();
}
Ply.prototype.PR;

Ply.prototype.getPlayer = function(){
    var plyData = this.PR.read("frog.ply");
    return plyData.points;
};

Ply.prototype.getCar = function(){
	var plyData = this.PR.read("car.ply");
    return plyData.points;
};

Ply.prototype.getLog = function(){
	var plyData = this.PR.read("Log_pine.ply");
    return plyData.points;
};

Ply.prototype.getFly = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};

Ply.prototype.getTurtle = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};

Ply.prototype.getWater = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};

Ply.prototype.getTarmac = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};

Ply.prototype.getFinishSlot = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};

Ply.prototype.getTree = function(){
    var plyData = this.PR.read("log.ply");
    return plyData.points;
};
