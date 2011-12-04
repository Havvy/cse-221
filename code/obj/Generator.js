LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

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
	create : function create(obj, generator) {
		return {
			seed : function() {
				return obj;
			},
			generate : function (seed) {
				Math.seedrandom(seed);
				println("Seeding generator with " + seed + ".");
				return generator.apply(this.seed()) 
			}
		};
	}
};

/**
 * Assuming that any non-string/non-number is another Generator.
 * Assuming any string is character data
 * Assuming any number means "Go this this line number where start gets line 0
 */
var createGeneratingGraph = function createGeneratingGraph(graphtable, genmap) {
	let end = new Node();
	
	graphtable.map(function (line) {
		return line.map(function map2(node) {
		
			// Catch the initial node.
			if (node === GENGRAPH) {
				return;
			}
			
			//If the node is a number, coerce it to it.
			if (node.toInt().toString === node) {
				return node.toInt();
			}
			
			//If the node is E, then it is the end.
			if (node === E) {
				return end;
			}
			
			//If the beginning starts with a quote mark, it's character data.
			if (node[0] === '"') {
				println(node);
				println(node.dropLastCharacter().dropFirstCharacter());
				return node.dropLastCharacter().dropFirstCharacter();
			}
			
			// Otherwise, is a generator of its own.
			if (!genmap.hasOwnProperty(node)) {
				genmap[node] = createGeneratorFromFile(node);
			}
			
			return genmap[node] | "";
		})
	});
	
	return "TODO";
};

/**
 * Assumming generators are in /data/gen/ and end in .gen
 */
var createGeneratorFromFile = function (filename, genmap) {
	var fns = {
		"GENGRAPH" : createGeneratingGraph
	};
	
	let file = get("../data/gen/" + graphname + ".gen");
	let lines = file.split("\n")
	let nodes = file.splitMultiple('\n', '|');
	let generator = fns(nodes[0][0]).apply(undefined, [nodes]);
	genmap[filename] = generator;	
	return generator;
};
