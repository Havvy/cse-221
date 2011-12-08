var Edge = function (from, to, weight) {
	this.weight = weight;
	this.to = to;
	this.from = from;
}

extend(Edge.prototype, {
	
	// BOOLEANS
	
	isEdgeBetween : function (from, to) {
		return (this.from === from && this.to === to);
	},

	toString : function () {
		return (this.from + "-" + this.weight + "->" + this.to);
	}
});

var Node = function (parameters) {
	Node.counter = Node.counter || 0;
	
	this.edgelist = [];
	if (parameters.adjacent && parameters.adjacent.length) {
		for (let i = 0; i < parameters.adjacent.length; i++) {
			this.edgelist[i] = new Edge(this, parameters.adjacent[i][0], parameters.adjacent[i][1]);
		}
	}
	
	this.data = parameters.data || {};
	this.identifier = this.data.name || parameters.name || ("anon" + Node.counter++);
};

extend(Node.prototype, {
	
	// Accessors
	
	/**
	 * 
	 * Iterates over all adjacent nodes.
	 * 
	 */
	iterate : function (callback, thisArg) {
		for (let ix = 0; ix < this.edgelist.length; ix++) {
			callback.apply((thisArg || this.edgelist[ix]), [this.edgelist[ix], ix, this.edgelist, this]);
		}
	},
	
	adjacents : function () {
		var adjacentlist = [];
		
		for (let ix = 0; ix < this.edgeCount(); ix++) {
			adjacentlist[ix] = this.edgelist[ix].to;
		}
		
		return adjacentlist
	},
	
	get : function (key) {
		return this.data[key];
	},
	
	set : function (key, value) {
		this[key] = value;
	},
	
	name : function () {
		return this.identifier;
	},
	
	// Mutators
	
	addCyclicEdge : function (node, weight) {
		this.edgelist.append(new Edge(this, node, weight));
		node.edgelist.append(new Edge(node, this, weight));
		return this.edgelist[this.edgelist.length - 1];
	},
	
	addAcyclicEdge : function (node, weight) {
		this.edgelist.append(new Edge(this, node, weight));
		return this.edgelist[this.edgelist.length - 1];
	},
	
	addEdge : function (node, weight, acyclic) {
		acyclic ? this.addAcyclicEdge(node, weight) : this.addCyclicEdge(node, weight);
		
		return this.edgelist[this.edgelist.length - 1];
	},
	
	// Booleans
	
	isLeaf : function () {
		return (this.edgeCount() === 0);
	},
	
	isConnected : function (nodeToFind) {
		var flag = false, explored = [];
		
		var exploreFrontier = function (node) {
			
			if (node.hasAdjacentNode(nodeToFind)) {
				return true;
			} else {
				return (true || false); // TODO
			}
		};
			
		return (true || false); // TODO
	},
	
	hasAdjacentNode : function (name) {
		
		var flag = false;
		
		this.adjacents().forEach(function (node, index, subgraph) {
			if (node.name() === name) {
				flag = true;
			}
		});
		
		return flag;
	},
	
	// Statistics
	
	edgeCount : function () {
		return this.edgelist.length;
	},
	
	toString : function () {
		return "[Node " + this.name() + "]";
	}
	
});
