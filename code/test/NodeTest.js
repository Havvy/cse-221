LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');
Exec('../code/obj/Graph.js');

let(node = new TestSet(['/obj/Graph.js', '/prog/routeTest.js'])) {
	
	node.addTest("construct a node with only a name", function () {
		var node = new Node({name : "NAME"});
		
		return (node.get("name") === "NAME");
	});
	
	node.addTest("construct a node with arbitrary data, and access it.", function () {
		var node = new Node({data : {a: 1, b: 2}, name: "partial alphabet"});
		
		return (node.get("a") === 1 &&
						node.get("b") === 2 &&
						node.get("name") === "partial alphabet");
	});
	
	node.addTest("'edgeCount' of a node with no edges", function () {
		var node = new Node({});
		
		return (node.edgeCount() === 0);
	});
	
	node.addTest("construct a node with an edge", function () {
		var node = new Node({adjacent : [[new Node({})]]});
		
		return (node.edgeCount() === 1);
	});
	
	node.addTest("construct a node with multiple edges", function () {
		var node = new Node({adjacent : [[new Node({})], [new Node({})]]});
		
		return (node.edgeCount() === 2);
	});
	
	node.addTest("iterate over a node", function () {
		var node1 = new Node({});
		var node2 = new Node({name : "2"});
		var node3 = new Node({name : "3"});
		
		node1.addCyclicEdge(node2);
		node1.addCyclicEdge(node3);
		
		var count = 0;
		
		node1.iterate(function (data, edges, node) {
			count += 1;
		});
		
		return count === 2;
	});
	
	node.addTest("get the name", function () {
		var node = new Node({name : "NAME"});
		
		return (node.name() === "NAME");
	});
	
	node.addTest("add acyclic edge", function () {
		var node1 = new Node({});
		var node2 = new Node({});
		
		node1.addAcyclicEdge(node2);
		
		return (node1.edgeCount() === 1 &&
						node2.edgeCount() === 0);
	});
	
	node.addTest("add acyclic edge 2", function () {
		var node1 = new Node({});
		var node2 = new Node({});
		
		node1.addEdge(node2, undefined, true);
		
		return (node1.edgeCount() === 1 &&
		node2.edgeCount() === 0);
	});
	
	node.addTest("create a cyclic edge", function () {
		var node1 = new Node({name : "1"});
		var node2 = new Node({name : "2"});
		
		node1.addCyclicEdge(node2);
		
		return (node1.edgeCount() === 1 &&
		node2.edgeCount() === 1);
	});
	
	node.addTest("add cyclic edge 2", function () {
		var node1 = new Node({});
		var node2 = new Node({});
		
		node1.addEdge(node2, undefined, false);
		
		return (node1.edgeCount() === 1 &&
						node2.edgeCount() === 1);
	});
	
	node.addTest("add cyclic edge 3", function () {
		var node1 = new Node({});
		var node2 = new Node({});
		
		node1.addEdge(node2);
		
		return (node1.edgeCount() === 1 &&
						node2.edgeCount() === 1);
	});
	
	node.addTest("has adjacent node", function () {
		var node1 = new Node({name : "P"});
		var node2 = new Node({name : "Q"});
		
		node2.addEdge(node1);
		
		return (node1.hasAdjacentNode("Q") && node2.hasAdjacentNode("P"));
	});
	
	node.addTest("does not have adjacent node", function () {
		var node1 = new Node({name : "P"});
		var node2 = new Node({name : "Q"});
		
		return !(node1.hasAdjacentNode("Q") || node2.hasAdjacentNode("P"));
	});
	
	node.addTest("two nodes are connected", function () {
		var node1 = new Node({name : "P"});
		var node2 = new Node({name : "Q"});
		var node3 = new Node({name : "R"});
		
		node1.addEdge(node2);
		node2.addEdge(node3);
		
		return node1.isConnected(node3);
	});
	
	node.addTest("create a medium-sized graph", function () {
		var g = [];
		
		g.append(new Node({name : "a"})); //0
		g.append(new Node({name : "b"})); //1
		g.append(new Node({name : "c"})); //2
		g.append(new Node({name : "d"})); //3
		g.append(new Node({name : "e"})); //4
		g.append(new Node({name : "f"})); //5
		g.append(new Node({name : "g"})); //6
		
		g[0].addEdge(g[6], [5]); //a-->g
		g[0].addEdge(g[2], [1]); //a-->c
		g[1].addEdge(g[2], [4]); //b-->c
		g[1].addEdge(g[3], [2]); //b-->d
		g[2].addEdge(g[4], [1]); //c-->e
		g[3].addEdge(g[4], [3]); //d-->e
		g[3].addEdge(g[5], [7]); //e-->f
		g[4].addEdge(g[6], [2]); //f-->g
		
		extend(g, Graph);
		
		return true;
	});
	
	node.addTest("sample graph", function () {
		var g = sampleGraph();
		
		return true;
	});
	
	node.addTest("shortest path algorithm", function () {
		var graph = [];
		
		var a = new Node({name : "a"}),
		b = new Node({name : "b"}),
		c = new Node({name : "c"}),
		d = new Node({name : "d"}),
		e = new Node({name : "e"}),
		f = new Node({name : "f"}),
		g = new Node({name : "g"});
		
		graph.append(a); //0
		graph.append(b); //1
		graph.append(c); //2
		graph.append(d); //3
		graph.append(e); //4
		graph.append(f); //5
		graph.append(g); //6
		
		var edge = a.addEdge(g, [5]); //a-->g
		a.addEdge(c, [1]); //a-->c
		b.addEdge(c, [4]); //b-->c
		b.addEdge(d, [2]); //b-->d
		c.addEdge(e, [12]); //c-->e
		d.addEdge(e, [3]); //d-->e
		e.addEdge(f, [1]); //e-->f
		f.addEdge(g, [2]); //f-->g
		
		extend(graph, Graph);
		
		var path = graph.shortestPath(a, g, function () {return this[0];});
		
		return (path.path.equals([edge]) && path.weight === 5);
	});
	
	node.addTest("shortest path algorithm 2", function () {
		var graph = [];
		
		var a = new Node({name : "a"}),
							 b = new Node({name : "b"}),
							 c = new Node({name : "c"}),
							 d = new Node({name : "d"}),
							 e = new Node({name : "e"}),
							 f = new Node({name : "f"}),
							 g = new Node({name : "g"});
							 
							 graph.append(a); //0
	graph.append(b); //1
	graph.append(c); //2
	graph.append(d); //3
	graph.append(e); //4
	graph.append(f); //5
	graph.append(g); //6
	
	a.addEdge(c, [1]); //a-->c
	var edgeAG = a.addEdge(g, [5]); //a-->g
	b.addEdge(c, [4]); //b-->c
	b.addEdge(d, [2]); //b-->d
	c.addEdge(e, [12]); //c-->e
	d.addEdge(e, [3]); //d-->e
	e.addEdge(f, [1]); //e-->f
	f.addEdge(g, [2]); //f-->g
	
	extend(graph, Graph);
	
	var edgeGF = graph.edgeBetween(g, f);
	var edgeFE = graph.edgeBetween(f, e);
	
	var shortPath = graph.shortestPath(a, e, Array.prototype.first);
	
	return (shortPath.path.equals([edgeAG, edgeGF, edgeFE]) && shortPath.weight === 8);
	});
	
	node.addTest("graph with vector of weights", function () {
		var a = new Node({name : "a"});
		var b = new Node({name : "b"});
		var c = new Node({name : "c", adjacent : [[a, [4, 5]], [b, [2, 3]]]});
		
		var graph = [a, b, c];
		
		extend(graph, Graph);
		
		return true;
	});
	
	node.addTest("graph can find edge between", function () {
		var a = new Node({name : "a"});
		var b = new Node({name : "b"});
		
		a.addEdge(b, []);
		
		var graph = extend([a, b], Graph);
		
		return (graph.isEdgeBetween(a, b));
	});
	
	node.addTest("addEdge returns edge from me to newly connected", function () {
		var a = new Node({name : "a"});
		var b = new Node({name : "b"});
		
		var e = a.addEdge(b, []);
		
		return (e === a.edgelist[0]);
	});
	
	node.addTest("can get edge between", function () {
		var a = new Node({name : "a"});
		var b = new Node({name : "b"});
		
		var e = a.addEdge(b, []);
		
		var graph = extend([a, b], Graph);
		
		return (e === graph.edgeBetween(a, b));
	});
	
	node.addTest("Graph.nodes()", function () {
		var graph = [];
		
		var a = new Node({name : "a"}),
		b = new Node({name : "b"}),
		c = new Node({name : "c"}),
		d = new Node({name : "d"}),
		e = new Node({name : "e"}),
		f = new Node({name : "f"}),
		g = new Node({name : "g"});
		
		graph.append(a); //0
		graph.append(b); //1
		graph.append(c); //2
		graph.append(d); //3
		graph.append(e); //4
		graph.append(f); //5
		graph.append(g); //6
		
		a.addEdge(g, [5]); //a-->g
		a.addEdge(c, [1]); //a-->c
		b.addEdge(c, [4]); //b-->c
		b.addEdge(d, [2]); //b-->d
		c.addEdge(e, [1]); //c-->e
		d.addEdge(e, [3]); //d-->e
		e.addEdge(f, [7]); //e-->f
		f.addEdge(g, [2]); //f-->g
		
		extend(graph, Graph);
		
		var nodes = graph.nodes();
		
		if (!(nodes.contains(a) && nodes.contains(b) &&
			nodes.contains(c) && nodes.contains(d) &&
			nodes.contains(e) && nodes.contains(f) &&
			nodes.contains(g))) {
			return false;
		}
		
		let (first = nodes[0]) {
			nodes = nodes.rest();
			
			if (!(graph.contains(first))) {
				return false;
			}
		}
		
		return true;
	});
	
	node.addTest("shortest path algorithm over a multi-value vector", function () {
		var graph = [];
		
		var a = new Node({name : "a"}),
							 b = new Node({name : "b"}),
							 c = new Node({name : "c"}),
							 d = new Node({name : "d"}),
							 e = new Node({name : "e"}),
							 f = new Node({name : "f"}),
							 g = new Node({name : "g"});
							 
							 graph.append(a); //0
							 graph.append(b); //1
	graph.append(c); //2
	graph.append(d); //3
	graph.append(e); //4
	graph.append(f); //5
	graph.append(g); //6
	
	a.addEdge(c, [1, 10]); //a-->c
	a.addEdge(g, [5, 20]); //a-->g
	b.addEdge(c, [4, 30]); //b-->c
	b.addEdge(d, [2, 40]); //b-->d
	c.addEdge(e, [12, 20]); //c-->e
	d.addEdge(e, [3, 10]); //d-->e
	e.addEdge(f, [1, 50]); //e-->f
	f.addEdge(g, [2, 0]); //f-->g
	
	extend(graph, Graph);
	
	var shortPath = graph.shortestPath(a, e, Array.prototype.last);
	
	return (shortPath.weight === 30);
	});
	
	node.addTest("graph with vector of weights", function () {
		var a = new Node({name : "a"});
		var b = new Node({name : "b"});
		var c = new Node({name : "c", adjacent : [[a, [4, 5]], [b, [2, 3]]]});
		
		var graph = [a, b, c];
		
		extend(graph, Graph);
		
		return true;
	});
	
	node.run();
	//node.urun();
}