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
	create : function(obj, generator) {
		return {
			get seed() {return obj},
			generate : function () { return generator.apply(this.seed) }
		};
	}
};

/**
 * Assuming that any non-string/non-number is another Generating graph.
 * Assuming any string is character data
 * Assuming any number means "Go this this line number where start gets line 0
 */

/*
var createGeneratingGraphFromFile = function (graphname) {
	var generators = generators || {};
	
	let file = get("../data/gen/" + graphname + ".gen");
	let end = new Node();
	
	let lines = file.split("\n")
		.map(function (element) { return element.split("|") }));
		
	lines.map(function (line) {
		line.map(function (node) {
			if (node === GENGRAPH) {
				return;
			}
			
			if (node.toInt().toString === node) {
				return node.toInt();
			}
			
			if (node === E) {
				return end;
			}
			
			if (node[0] === '"') {
				println(node);
				println(node.dropLastCharacter().dropFirstCharacter());
				return node.dropLastCharacter().dropFirstCharacter();
			}
			
			// Is a generator of its own.
			if (!generators.hasOwnProperty(node)) {
				// TODO
			}
			return "TODO";
		}
	}
};

/**
 * Assumming generators are in /data/gen/ and end in .gen
 *
var createGeneratorFromFile = function (filename) {
	let file = get("../data/gen/" + graphname + ".gen");
	let lines = file.split("\n")
	.map(function (element) { return element.split("|") }));
		
};

*/
