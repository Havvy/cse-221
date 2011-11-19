LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Graph.js');

var sampleGraph = function () {

	var routeMap = get("../data/testRoute.txt");
	var routeElements = routeMap.split(" ");
	var routeLines = routeMap.split("\n");
	var routeLinesTWO = [];
	routeLines.forEach(function (element) {
		routeLinesTWO.append(element.split(" "))
	});

	var airportsWDupes = routeElements.filter(function (element, index, array) {
		return (element.charCodeAt(0) > 64 && element.charCodeAt(0) < 91);
	});

	var airports = airportsWDupes.removeDuplicates();

	var theWorld = [];

	for (let i = 0; i < airports.length; i++) {
		 theWorld.append(new Node({
			  name: airports[i]
		 }));
	}

	extend(theWorld, Graph);

	for (let i = 0; i < routeLinesTWO.length; i++) {
		if (routeLinesTWO[i][0] === "-") {
			theWorld.nodeWithName(routeLinesTWO[i][1]).addAcyclicEdge(theWorld.nodeWithName(routeLinesTWO[i][2]), [routeLinesTWO[i][3].valueOf()]);
		} else {
			theWorld.nodeWithName(routeLinesTWO[i][1]).addCyclicEdge(theWorld.nodeWithName(routeLinesTWO[i][2]), [routeLinesTWO[i][3].valueOf()]);

		 };
	};

	return theWorld;

}