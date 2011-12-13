LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let(binary = new TestSet(['/obj/BinaryNode.js'])) {
	
	binary.addTest("empty node is leaf", function () {
		var b = new BinaryNode(0);
		
		return b.isLeaf();
	});
	
	binary.addTest("non-empty node is not leaf", function () {
		var b = new BinaryNode(0);
		
		b.addChild(1);
		
		return !(b.isLeaf());
	});
	
	binary.addTest("getting data", function () {
		var b = new BinaryNode(1);
		
		return (b.value === 1);
	});
	
	binary.addTest("adding lesser node", function () {
		var b = new BinaryNode(1);
		b.addChild(0);
		
		return (b.lesser().value === 0);
	});
	
	binary.addTest("adding greater node", function () {
		var b = new BinaryNode(1);
		b.addChild(2);
		
		return (b.greater().value === 2);
	});
	
	binary.addTest("null greater node when adding lesser node", function () {
		var b = new BinaryNode(1);
		b.addChild(0);
		
		return (b.greater() === null);
	});
	
	binary.addTest("added lesser node is a leaf", function () {
		var b = new BinaryNode(1);
		b.addChild(0);
		
		return (b.lesser().isLeaf());
	});
	
	binary.addTest("add two lesser nodes", function () {
		var b = new BinaryNode(2);
		b.addChild(1);
		b.addChild(0);
		
		return (b.lesser().lesser().value === 0);
	});
	
	binary.addTest("add lesser and greater node", function () {
		var b = new BinaryNode(1);
		
		b.addChild(0);
		b.addChild(2);
		
		return ((b.lesser().value === 0) && (b.greater().value === 2));
	});
	
	binary.addTest("find a subnode", function () {
		var b = new BinaryNode("Four");
		b.addChild("score");
		b.addChild("and");
		b.addChild("seven");
		b.addChild("years");
		b.addChild("ago");
		
		return (b.findSubnode("ago").value === "ago");
	});
	
	binary.addTest("find itself as subnode", function () {
		var b = new BinaryNode(0);
		
		return (b.findSubnode(0) === b);
	});
	
	binary.addTest("return false if no subnode", function () {
		var b = new BinaryNode(0);
		
		return !(b.findSubnode(1));
	});
	
	binary.addTest("six sample data", function () {
		var b = new BinaryNode("four");
		
		b.addChild("score");
		b.addChild("and");
		b.addChild("seven");
		b.addChild("years");
		b.addChild("ago");
		
		return (b.value === "four" && 
						b.greater().value === "score" &&
						b.lesser().value === "and" &&
						b.greater().greater().value === "seven" &&
						b.greater().greater().greater().value === "years" &&
						b.lesser().lesser().value === "ago");
	});
	
	binary.addTest("addChildren", function () {
		var b1 = new BinaryNode("four"),
			  b2 = new BinaryNode("four");
		b1.addChildren(["score", "and", "seven", "years", "ago"]);
		
		b2.addChild("score");
		b2.addChild("and");
		b2.addChild("seven");
		b2.addChild("years");
		b2.addChild("ago");
		
		return (b1.toString() === b2.toString());
	});
	
	binary.addTest("depth() of 'four score...' === 4", function () {
		var b = new BinaryNode("four");
		
		b.addChildren(["score", "and", "seven", "years", "ago"]);
		
		return (b.depth() === 4);
	});
	
	binary.addTest("nodeCount on a single node", function () {
		var b = new BinaryNode(0);
		
		return (b.count() === 1);
	});
	
	binary.addTest("nodeCount on node with single left child", function () {
		var b = new BinaryNode(1);
		
		b.addChild(0);
		
		return (b.count() === 2);
	});
	
	binary.addTest("testing nodeCount with two left children", function () {
		var b = new BinaryNode(2);
		b.addChild(1);
		b.addChild(0);
		
		return (b.count() === 3);
	});
	
	binary.addTest("testing nodeCount with greater & lesser", function () {
		var b = new BinaryNode(1);
		b.addChild(4);
		b.addChild(0);
		b.addChild(2);
		b.addChild(5);
		b.addChild(3);
		
		return (b.count() === 6);
	});
	
	binary.addTest("iterate and print values", function () {
		var b = new BinaryNode("four"), str = "";
		
		b.addChildren(["score", "and", "seven", "years", "ago"]);
		
		b.iterate(function () {
			str += this.value + " ";
		});
		
		return (str === "ago and four score seven years ");
	});
	
	binary.addTest("height from root", function () {
		var b = new BinaryNode(0);
		
		return (b.heightOf(0) === 0);
	});
	
	binary.addTest("height from child of root", function () {
		var b = new BinaryNode(1);
		b.addChild(0);
		
		return (b.heightOf(0) === 1);
	});
	
	binary.addTest("height from null node", function () {
		var b = new BinaryNode(0);
		
		return !(b.heightOf(-1));
	});
	
	binary.addTest("height of complex traversal", function () {
		var b = new BinaryNode(1);
		
		b.addChildren([0, 4, 2, 5, 3]);
		
		return (b.heightOf(3) === 3);
	});
	
	binary.addTest("depthList of single node", function () {
		var b = new BinaryNode(1);
		
		return (b.depthList().equals([1]));
	});
	
	binary.addTest("depthList of two nodes", function () {
		var b = new BinaryNode(1);
		
		b.addChild(0);
		
		return (b.depthList().equals([1, 1]));
	});
	
	binary.addTest("depthList of balanced tree of three nodes", function () {
		var b = new BinaryNode(1);
		
		b.addChildren([0, 2]);
		
		return (b.depthList().equals([1, 2]));
	});
	
	binary.addTest("depthList of complex tree", function () {
		var b = new BinaryNode(1);
		
		b.addChildren([0, 4, 2, 5, 3]);
		
		return (b.depthList().equals([1, 2, 2, 1]));
	});
	
	binary.addTest("print table of a complex tree", function () {
		var b = new BinaryNode(1);
		
		b.addChildren([0, 4, 2, 5, 3]);
		
		//println(printTreeData(b));
		
		return true;
	});
	
	binary.addTest("index of iteration", function () {
		var b = new BinaryNode(1);
		
		b.addChildren([0, 4, 2, 5, 3]);
		
		var indexes = [];
		
		b.iterate(function (value, node, index) {
			indexes[index] = index;
		});
		
		return (indexes.equals([0, 1, 2, 3, 4, 5]));
	});
	
	binary.addTest("index of interation on single node", function () {
		var b = new BinaryNode(1);
		
		var indexes = [];
		
		b.iterate(function (value, node, index) {
			indexes[index] = index;
		});
		
		return (indexes.equals([0]));
	});
	
	binary.addTest("index of iteration on root with lesser", function () {
		var b = new BinaryNode(1);
		b.addChild(0);
		
		var indexes = [];
		
		b.iterate(function (value, node, index) {
			indexes[index] = index;
		});
		
		return (indexes.equals([0, 1]));
	});
	
	binary.addTest("index of interation on root with lessers", function () {
		var b = new BinaryNode(5);
		b.addChildren([4, 3, 2, 1, 0]);
		
		var indexes = [];
		
		b.iterate(function (value, node, index) {
			indexes[index] = index;
		});
		
		return (indexes.equals([0, 1, 2, 3, 4, 5]));
	});
	
	binary.run();

}