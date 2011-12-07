LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');

var Graph = { 
	shortestPath : function (from, to, weightFn) {
		var visited = [], paths = {}, frontier = [from];
		// All nodes unvisited, frontier includes the initial node. No paths exist yet.
		
		function visit (me, myWeight, myPath) {
			
			function addPath(destination, path, weight) {
				paths[destination] = {
					weight : weight,
					path : path
				};
			}
			
			for (let ix = 0; ix < me.edgelist.length; ix++) {
				visited.append(me);
				
				let (edge = me.edgelist[ix]) {
					let (destination = edge.destination,
							 path = myPath.copy().append(edge),
							 weight = myWeight + weightFn.apply(edge.weight)
					) {
						if (!visited.contains(destination)) {
							if (!paths[destination]) { // If path to destination doesn't yet exist.
								addPath(destination, path, weight);
								frontier.append(destination);
							} else {
								if (weight < paths[destination].weight) {
									addPath(destination, path, weight);
								}
							}
						}
					}
				}
			}
		} // End visit
		
		// Simple case where we would otherwise return undefined.
		if (to === from) return {path : [], weight : 0};
		
		while (!frontier.isEmpty()) {
			let (node = frontier.first()) {
				visit(node, (paths[node] && paths[node].weight || 0),
								(paths[node] && paths[node].path || []));
			}
			
			frontier = frontier.rest().sort(function (a, b) {
				return (paths[a].weight - paths[b].weight);
			});
		}
		
		if (paths[to]) {
			return (paths[to]);
		} else {
			return undefined;
		}
	},
	
	/**
	 * Randomly walks through the graph, ignoring edge weights.
	 * @param from
	 * @param to
	 * @return Array of nodes visited in order. May contain duplicates.
	 */
	randomWalk : function(from, to) {
		var walk = [from];
		let currentNode = from;
		
		while (currentNode !== to) {
			let adjacents = currentNode.adjacents();
			let nextNode = adjacents[(Math.floor(Math.random() * adjacents.length))];
			walk.push(nextNode);
			currentNode = nextNode;
		}
		
		return walk;
	},
			
	
	// BOOLEANS
	
	isEdgeBetween : function (from, to) {
		return (from.adjacents().contains(to));
	},
	
	// ACCESSORS
	
	edgeBetween : function (from, to) {
		for (let edge = 0; edge < from.edgelist.length; edge++) {
			if (from.edgelist[edge].destination === to) {
				return from.edgelist[edge];
			}
		}
		
		return false;
	},
	
	hashGraph : function () {
		var hashGraph = {};
		
		for (let ix = 0; ix < this.length; ix++) {
			hashGraph[this[ix].name()] = this[ix];
		}
		
		return hashGraph;
	},
	
	nodeWithName : function (name) {
		for (let i = 0; i < this.length; i++) {
			if (this[i].name() === name) {
				return this[i];
			}
		}
		
		return undefined;
	},
	
	nodes : function () {
		return this.copy();
	},
	
	toString : function () {
		var ret = "";
		this.forEach(function (node, ix, graph) {			
			ret += node.name() + ": " + node.data + "\n";
			
			node.edgelist.forEach(function (edge, jx, adjacents) {
				ret += node.name() + "-" + (edge.weight || "") + "->" + edge.to.name() + "\n";
				if (edge.weight) {
					for (let ix = 0; ix < edge.weight.length; ix++) {
						ret += (typeof edge.weight[ix]) + " ";
					}
					ret += "\n";
				}
			});
		});
		
		return ret;
	}
}