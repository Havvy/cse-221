LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');
Exec('../code/obj/Graph.js');

/**
 * @term Generator is an object which wraps another object, and has
 * one method (generate) which must return a new object of a class
 * of objects that the generater chooses.
 * @term Generating Graph is a digraph that has a start and end node
 * where a random walk through the nodes must eventually get from
 * start to end. A Generator for it must return an array of the nodes
 * passed through it.
 */


var Generator = {
	create : function create(base, generator, identifier) {
		return {
			base : function() {
				return base;
			},
			generate : function (seed) {
				if (seed) {
					Math.seedrandom(seed);
				}
				return generator.apply(this.base())
			},
			toString : function () {
				return "[Generator " + (identifier || "generator") + "]";
			},
			constructor : Generator
		};
	}
};

/**
 * Assuming that any non-string/non-number is another Generator.
 * Assuming any string is character data
 * Assuming any number means "Go this this line number where start gets line 0
 */
var addGeneratingGraph = function (graphtable, genmap, identifier) {
	//printline();
	//printval("TABLE", graphtable);
	//printval("MAP", genmap, true);
	
	let start = new Node({name:"Start", data : "S"}), 
		end = new Node({name:"End", data : "E"});
	
	function createNodes(graphtable, genmap) {
		//println("Creating nodes from graphtable");
		return graphtable.map(function (line) {
			return line.map(function map2(node) {
			
				//printval("\tNODE", node);
				
				// Catch the initial node.
				if (node === "GENGRAPH") {
					//println("\t\tNode is GENGRAPH!");
					return start;
				} else {
					//println("\t\tNode not GENGRAPH");
				}
				
				//If the node is a number, coerce it to a number.
				if (node.toInt().toString() === node) {
					//println("\t\tNode is a number.");
					return node.toInt();
				} else {
					//println("\t\tNode is not a number.");
				}
				
				//If the node is E, then it is the end.
				if (node === "E") {
					//println("\t\tNode is the end.");
					return end;
				} else {
					//println("\t\tNode is not the end.");
				}
				
				//If the beginning starts with a quote mark, it's character data.
				if (node[0] === '"') {
					//println("\t\tNode is a string.");
					return node.dropLastChar().dropFirstChar();
				} else {
					//println("\t\tNode is not a string.");
				}
				
				//println("\t\tTherefore, node is another generator of some type.");
				// Otherwise, is a generator of its own.
				if (!genmap.hasOwnProperty(node)) {
					//printval("genmap", genmap, true);
					//printval("node", node);
					genmap[node] = createGeneratorFromFile(node, genmap);
				}
				return genmap[node];
			})
		});
	}
	
	function createGraph(nodes, identifier) {
		//printval("Made it here with", identifier);
		var graph = [start];
		
		for (let lx = 1; lx < nodes.length; lx++) {
			graph.push(new Node({
				data : nodes[lx].first(),
				name : lx.toString()
			}));
		}
		
		graph.push(end);
		//printval("Graph", graph);
		
		for (let ix = 0; ix < nodes.length; ix++) {
			let node = graph[ix];
			//printval("line", nodes[ix]);
			//printval("\tnode", node);
			for (let jx = 1; jx < nodes[ix].length; jx++) {
				let nextVal = nodes[ix][jx]
				
				//printval("\tnextVal", nextVal);
				if (typeof nextVal=== "number") {
					//println("\tValue is a number.");
					graph[ix].addAcyclicEdge(graph[nextVal]);
				} else if (nextVal === end) {
					//println("\tValue is the end.");
					//printval("\tnode", node);
					node.addAcyclicEdge(end);
				} else {
					let newNode = new Node({data : nextVal})
					//printval("\tnewNode", newNode);
					graph.push(newNode);
					node.addAcyclicEdge(newNode);
					node = newNode;
				}
			}
		}
		
		//printline();
		return extend(graph, Graph);
	}
	
	let nodes = createNodes(graphtable, genmap);
	//printline();
	//printval("NODES TABLE", nodes);
	let graph = createGraph(nodes);
	//printval("GRAPH FOR", identifier.toUpperCase());
	//println(graph);
	let generator = Generator.create(graph, function () {
		var theGeneration = ""; 
		let currentNode = start;
		while (currentNode != end){
			//printval("Current", currentNode);
			//printval("\tValue", currentNode.data);
			let adjacents = currentNode.adjacents();
			// Adjacents := the list of nodes currentNode has an edge to.
			//printval("\tadjacents", adjacents); 
			if (currentNode != start){
				if (currentNode.data.constructor === Generator) {
					let g = currentNode.data.generate();
					//printval("\tg", g, true);
					if (typeof g === "object") {
						throw new TypeError("Return type of generator should be a String. Got Object instead.");
					}
					theGeneration += "" + g;
				} else {
					theGeneration += "" + currentNode.data;
				}
			}
			currentNode = adjacents[Math.floor(Math.random() * adjacents.length)];
			
			
		}
		//printval("generation", theGeneration);
		//printline();
		return theGeneration;
	},
	identifier);
	//printline();
	return generator;
};

/*
 * These two methods are quick hacks, and are inefficient.
 * They exist only to get the job done as quickly as possible.
 */
var addGeneratingList = function (graphtable, genlist, identifier) {
	graphtable[0][0] = "GENGRAPH";
	
	for (let ix = 1; ix < graphtable.length; ix++) {
		graphtable[0][ix] = ix.toString();
		graphtable[ix].append("E");
	};
	
	return addGeneratingGraph(graphtable, genlist, identifier);
};

var addGeneratingSet = function (graphtable, genlist, identifier) {
	graphtable[0][0] = "GENGRAPH";
	
	for (let ix = 1; ix < graphtable.length; ix++) {
		graphtable[ix][0] = '"' + graphtable[ix][0] + '"';
		graphtable[ix][1] = 'E';
		graphtable[0][ix] = ix.toString();
	}
	
	return addGeneratingGraph(graphtable, genlist, identifier);
};

/**
 * Assumming generators are in /data/gen/ and end in .gen
 */
var createGeneratorFromFile = function (filename, genmap) {
	
	//printline();
	
	var fns = {
		"GENGRAPH" : addGeneratingGraph,
		"GENLIST" : addGeneratingList,
		"SET" : addGeneratingSet
	};
	//printval("filename", filename);
	let file = get("gen/" + filename + ".gen");
	
	if (file.length === 0) {
		throw new ReferenceError("File not found.");
	}
	
	//printline();
	//printval("file", file);
	//printline();
	let graphtable = file.splitMultiple('\n', '|');
	//printval("graphtable", graphtable);
	//printval("genmap", genmap, true);
	//printval("graphtable[0][0]", graphtable);
	try {
		let generator = fns[graphtable[0][0]](graphtable, genmap, filename);
		genmap[filename] = generator;	
		return generator;
	} catch (e) {
		if (e.name === "TypeError") {
			println("Tried to call fns[" + graphtable[0][0] + "]() and failed.");
			printval("Filename", filename);
			throw new Error();
		} else {
			return null;
		}
	}
};
