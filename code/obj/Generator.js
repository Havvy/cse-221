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
	create : function create(base, generator) {
		return {
			base : function() {
				return base;
			},
			generate : function (seed) {
				Math.seedrandom(seed);
				return generator.apply(this.base())
			},
			toString : function () {
				return "[Generator generator]";
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
var addGeneratingGraph = function (graphtable, genmap) {
	//printline();
	//printval("TABLE", graphtable);
	//printval("MAP", genmap, true);
	
	let start = new Node({name:"Start"}), end = new Node({name:"End"});
	
	function createNodes(graphtable, genmap) {
		//println("3a. Creating nodes from graphtable");
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
				
				//printval("\tNODE", node);
				//println("\t\tNode is another generator of some type.");
				// Otherwise, is a generator of its own.
				if (!genmap.hasOwnProperty(node)) {
					//printval("\t\tgenmap", genmap, true);
					//printval("\t\tnode", node);
					genmap[node] = createGeneratorFromFile(node, genmap);
					//printval("\t\tGENERATOR END", genmap[node]);
				} else {
					//printval("\t\tgenmap", genmap, true);
					//printval("\t\tnode", node);
				}
				return genmap[node];
			})
		});
	}
	
	function createGraph(nodes) {
		var graph = [start];
		
		for (let lx = 1; lx < nodes.length; lx++) {
			graph.push(new Node({
				data : nodes[lx].first(),
				name : lx.toString()
			}));
		}
		
		graph.push(end);
		//printval("4a. Graph", graph);
		
		for (let ix = 0; ix < nodes.length; ix++) {
			let node = graph[ix];
			//printval("4b. line", nodes[ix]);
			//printval("\tnode", node);
			for (let jx = 1; jx < nodes[ix].length; jx++) {
				let nextVal = nodes[ix][jx]
				
				//printval("\tnextVal", nextVal);
				if (typeof nextVal=== "number") {
					//println("\tValue is a number.");
					node.addAcyclicEdge(graph[nextVal]);
					//println("\tAdding edge between " + node + " & " + graph[nextVal]);
				} else if (nextVal === end) {
					node.addAcyclicEdge(end);
					//println("\tAdding edge between " + node + " & " + end);
				} else {
					let newNode = new Node({data : nextVal})
					//printval("\tnewNode", newNode);
					graph.push(newNode);
					node.addAcyclicEdge(newNode);
					//println("\tAdding edge between " + node + " & " + newNode);
					node = newNode;
				}
			}
		}
		
		//printline();
		return extend(graph, Graph);
	}
	
	let nodes = createNodes(graphtable, genmap);
	//printline();
	//printval("3. nodes", nodes);
	let graph = createGraph(nodes);
	//printval("4. final graph", graph);
	let generator = Generator.create(graph, function () {
		var theGeneration = ""; 
		let currentNode = start;
		while (currentNode != end){
			//printval("Current", currentNode);
			let adjacents = currentNode.adjacents();
			// Adjacents := the list of nodes currentNode has an edge to.
			//printval("\tadjacents", adjacents); 
			if (currentNode != start){
				if (currentNode.data.constructor === Generator) {
					theGeneration += "" + currentNode.data.generate();
				} else {
					theGeneration += "" + currentNode.data;
				}
			}
			currentNode = adjacents[Math.floor(Math.random() * adjacents.length)];
		}
		//printline();
		return theGeneration;
	});
	//printline();
	return generator;
};

var addGeneratingList = function (graphtable, genmap) {
	printval("graphtable", graphtable);
};

var addGeneratingSet = function (graphtable, genmap) {
	//We convert the set to a graphtable and then return the
	//graphtable generator. This is a quick hack.
	
	//printval("graphtable", graphtable);
	
	graphtable[0][0] = "GENGRAPH";
	for (let ix = 1; ix < graphtable.length; ix++) {
		graphtable[0][ix] = ix.toString();
		graphtable[ix][0] = '"' + graphtable[ix][0] + '"';
		graphtable[ix][1] = 'E';
	}
	
	//printval("graphtable modified", graphtable);
	
	return addGeneratingGraph(graphtable, genmap);
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
	printval("filename", filename);
	let file = get("gen/" + filename + ".gen"); //show Bob this fun bug.  :P
	let graphtable = file.splitMultiple('\n', '|');
	//printval("1. graphtable", graphtable);
	//printval("genmap", genmap, true);
	//printval("2. graphtable[0][0]", graphtable[0][0]);
	let generator = fns[graphtable[0][0]](graphtable, genmap);
	genmap[filename] = generator;
	return generator;
};
