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
			}
		};
	}
};

/**
 * Assuming that any non-string/non-number is another Generator.
 * Assuming any string is character data
 * Assuming any number means "Go this this line number where start gets line 0
 */
var addGeneratingGraph = function createGeneratingGraph(graphtable, genmap) {
	printline();
	printval("TABLE", graphtable);
	printval("MAP", genmap, true);
	
	let start = new Node({name:"Start"}), end = new Node({name:"End"});
	
	function createNodes(graphtable, genmap) {
		println("Creating nodes from graphtable");
		return graphtable.map(function (line) {
			return line.map(function map2(node) {
			
				printval("\tNODE", node);
				
				// Catch the initial node.
				if (node === "GENGRAPH") {
					println("\t\tNode is GENGRAPH!");
					return start;
				} else {
					println("\t\tNode not GENGRAPH");
				}
				
				//If the node is a number, coerce it to it.
				if (node.toInt().toString() === node) {
					println("\t\tNode is a number.");
					return node.toInt();
				} else {
					println("\t\tNode is not a number.");
				}
				
				//If the node is E, then it is the end.
				if (node === "E") {
					println("\t\tNode is the end.");
					return end;
				} else {
					println("\t\tNode is not the end.");
				}
				
				//If the beginning starts with a quote mark, it's character data.
				if (node[0] === '"') {
					println("\t\tNode is a string.");
					return node.dropLastChar().dropFirstChar();
				} else {
					println("\t\tNode is not a string.");
				}
				
				println("\t\tTherefore, node is a graph.");
				// Otherwise, is a generator of its own.
				if (!genmap.hasOwnProperty(node)) {
					genmap[node] = createGeneratorFromFile(node);
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
		
		printval("Graph", graph);
	}
	
	let nodes = createNodes(graphtable, genmap);
	printline();
	printval("nodes", nodes);
	let graph = createGraph(nodes);
	let generator = Generator.create(graph, function () {
		// TODO Random walk through the maze. TODO //
	});
	
	return "TODO";
};

/**
 * Assumming generators are in /data/gen/ and end in .gen
 */
var createGeneratorFromFile = function (filename, genmap) {
	printline();
	var fns = {
		"GENGRAPH" : addGeneratingGraph
	};
	
	let file = get("../data/gen/" + filename + ".gen");
	printval("file type", typeof file);
	let nodes = file.splitMultiple('\n', '|');
	printval("nodes[0][0]", nodes[0][0]);
	printval("type[0][0]", typeof nodes[0][0]);
	for (let ix = 0; ix < nodes.length; ix++) {
		for (let jx = 0; jx < nodes[ix].length; jx++) {
			if (typeof nodes[ix][jx] !== "object") {
				println("nodes[" + ix + "][" + jx + "] is of type " + (typeof nodes[ix][jx]) + ".");
			}
		}
	}
	let generator = fns[nodes[0][0]].apply(undefined, [nodes, genmap]);
	genmap[filename] = generator;	
	return generator;
};
