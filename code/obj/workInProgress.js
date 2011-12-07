var edgeTally = function (from, to){
	for (let i = 0; i < from.edgelist.length; i++){
		if (from.edgelist[i].isEdgeBetween(from, to)){
				return from.edgelist[i].weight;
		}
	}
return false;	
};
	
var nodeTravel = function (from, to, weights, end){
	weights = weights || [0,0];
	let (tempWeights = edgeTally(from, to)){
		weights[0] += tempWeights[0]
		weights[1] += tempWeights[1]
	}
		return weights;
};
		
var graphTravel = function (start, end){
	var visited = {};
	var frontier = {World.nodes};
	 if (World[start].hasAdjacentNode(World[end]){
			return edgeTally (start, end);
		} else 	
			
		
	
	
	
	
	
	
/*	isConnected : function (nodeToFind) {
		var flag = false, explored = [];
		
		var exploreFrontier = function (node) {
			
			if (node.hasAdjacentNode(nodeToFind)) {
				return true;
			} else {
				return (true || false); // TODO
			}
		};
			
		return (true || false); // TODO/*
	},