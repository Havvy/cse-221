LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Graph.js');

var routeMap = get("../data/routeMap.txt");
var routeElements = routeMap.split(" ");
var routeLines = routeMap.split("\n");
var routeLinesTWO = [];
routeLines.forEach(function(element){ routeLinesTWO.append(element.split(" "))});

var airportsWDupes = routeElements.filter(function (element, index, array) {
return (element.charCodeAt(0) > 64 && element.charCodeAt(0) < 91);
});

var airportNames = airportsWDupes.removeDuplicates();

var airports = [];

for (let i = 0; i < airportNames.length; i++){
airports.append(new Node({name : airportNames[i]}));
}

extend(airports, Graph);

var World = airports.hashGraph();

for (let i = 0; i < routeLinesTWO.length; i++){
	if (routeLinesTWO[i][0] === "-") {
		airports.nodeWithName(routeLinesTWO[i][1]).addAcyclicEdge(airports.nodeWithName(routeLinesTWO[i][2]),
			[parseInt(routeLinesTWO[i][3], 10), parseInt(routeLinesTWO[i][4], 10)]);
	} else {
		airports.nodeWithName(routeLinesTWO[i][1]).addCyclicEdge(airports.nodeWithName(routeLinesTWO[i][2]),
			[parseInt(routeLinesTWO[i][3], 10), parseInt(routeLinesTWO[i][4], 10)]);
	}
}
println("\n\nWelcome to the BobHavvy Trip Planning simulator. \nTo quit at any time, enter q at the first question. \nTo see a list of airports, enter l. \nTo see all airports and routes, enter w.") 
while (true) {
	print("\n\nWhere are you starting from?: ");
	var startingPoint = readln().toUpperCase();
	if (startingPoint === "Q"){
		println("Thank you. Now I can rest.");
		break; 
	}
	if (startingPoint === "L"){
		println(airportNames + "\n\n");
		continue;
	}
	if (startingPoint === "W") {
		println(airports);
		continue;
	}
	if (!airports.nodeWithName(startingPoint)){
		println("This is not an airport recognized by this program. Please start again.");
		continue;
	}
	print("Where are you trying to go?: ");
	var finalDestination = readln().toUpperCase();
	if (finalDestination === "Q"){
		println("Thank you. Now I can rest.");
		break; 
	}
	if (finalDestination === "L"){
		println(airportNames + "\n\n");
		continue;
	}
	if (startingPoint === "W") {
		println(airports);
		continue;
	}
	if (!airports.nodeWithName(finalDestination)){
		println("This is not an airport recognized by this program. Please start again.");
		continue;
	}
	print("What's more important to you, time, money, or luxury?: ");
	var weightChoice = readln().toLowerCase();
	switch (weightChoice){
	case "time":
		println("In a hurry eh? Then this is the route for you.");
		var bestPathEver = airports.shortestPath(airports.nodeWithName(startingPoint), airports.nodeWithName(finalDestination), Array.prototype.last);
		if (!bestPathEver){
			print("No such route exists. Try flapping your arms.")
			continue;
		}
		print(bestPathEver.path[0].from);
		for (let i = 0; i < bestPathEver.path.length; i++){
			print(" --> " + bestPathEver.path[i].destination);
		}
		println(", and it will only take " + bestPathEver.weight + " units of time.");
		continue;
	case "money":
		println("On a budget? Hope you don't mind screaming kids.");
		var bestPathEver = airports.shortestPath(airports.nodeWithName(startingPoint), airports.nodeWithName(finalDestination), Array.prototype.first);
		if (!bestPathEver){
			print("No such route exists. Maybe you can hitchhike there?")
		continue;
	}
		print(bestPathEver.path[0].from);
		for (let i = 0; i < bestPathEver.path.length; i++){
			print(" --> " + bestPathEver.path[i].destination);
		}
		println(", and it will only take " + bestPathEver.weight + " units of currency.");
		continue;
  case "luxury":	
		println("More money than God and all the time in the world? Here you go, also I hate you.")
		var bestPathEver = airports.shortestPath(airports.nodeWithName(startingPoint), airports.nodeWithName(finalDestination), function(){
			return -(this[0] + this[1])/2});
		if (!bestPathEver){
			print("No such route exists. Time to buy yourself a private jet.")
			continue;
		}
		print(bestPathEver.path[0].from);
		for (let i = 0; i < bestPathEver.path.length; i++){
			print(" --> " + bestPathEver.path[i].destination);
		}
		println("\nis on average the most expensive, time consuming route.")
		continue;
	default:
		println("No! You'll only pick what I tell you to pick!");
		continue;
	}
}


