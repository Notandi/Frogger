function Ply(){
	this.PR = PlyReader();
}
Ply.prototype.PR;

Ply.prototype.getPlayer = function(){
    var plyData = this.PR.read("frog.ply");
    return plyData.points;
};
Ply.prototype.getPlayerNormal = function(){
    var plyData = this.PR.read("frog.ply");
    return plyData.normals;
};
Ply.prototype.getCar = function(){
	var plyData = this.PR.read("car.ply");
    return plyData.points;
};
Ply.prototype.getCarNormal = function(){
    var plyData = this.PR.read("car.ply");
    return plyData.normals;
};
Ply.prototype.getLog = function(){
	var plyData = this.PR.read("Log_pine.ply");
    return plyData.points;
};
Ply.prototype.getLogNormal = function(){
    var plyData = this.PR.read("Log_pine.ply");
    return plyData.normals;
};
Ply.prototype.getFly = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};
Ply.prototype.getFlyNormal = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.normals;
};
Ply.prototype.getTurtle = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};
Ply.prototype.getTurtleNormal = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.normals;
};
Ply.prototype.getWater = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};
Ply.prototype.getWaterNormal = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.normals;
};
Ply.prototype.getTarmac = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};
Ply.prototype.getTarmacNormal = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.normals;
};
Ply.prototype.getFinishSlot = function(){
	var plyData = this.PR.read("cube.ply");
    return plyData.points;
};
Ply.prototype.getFinishSlotNormal = function(){
    var plyData = this.PR.read("cube.ply");
    return plyData.normals;
};