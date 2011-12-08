LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Node.js');
Exec('../code/obj/Graph.js');
Exec('../code/obj/Generator.js');

let (gens = {}) {
	let seed = Math.random().toString();
	let flag = true;
	let roomsTraveled = 1;
	Math.seedrandom(seed);
	createGeneratorFromFile("creature", gens);
	createGeneratorFromFile("nonUnique", gens);
	
	println("You wake up in a dark cave. In front of you is a door.");
	
	while (flag !== false) {
		println();
		println("Dare ye venture into yonder room?");
		print(">");
		let input = readln();
		
		switch (input.toLowerCase()) {
			case "seed":
				printval("seed", seed);
				break;
			case "yes":
			case "y":
				println();
				println(gens["nonUnique"].generate());
				roomsTraveled++;
				break;
			case "n":
			case "no":
				println();
				println("You have given up.");
				println("You made it through " + roomsTraveled + " rooms.");
				println("You are a " + gens["creature"].generate() + ".");
				flag = false;
				break;
		}
	}
}