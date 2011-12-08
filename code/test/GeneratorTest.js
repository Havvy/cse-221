LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let(gen = new TestSet(['obj/Generator.js'])) {

	gen.addTest("Initialize a generator, and generate it.", function () {
		let o = {data : "success"};		
		let g = Generator.create(o, function () {
			return this.data;
		});
		let generated = g.generate("_");
		
		return (generated === "success");
	});
	
	gen.addTest("Generate same results on a recall with same seed.", function () {
		let g = Generator.create({}, function() {
			return Math.random();
		});
		let generated = [g.generate("test"), g.generate("test")];
		return generated[0] === generated[1];
	});
	
	gen.addTest("Generate simple GenGraph.", function () {
		let g = {};
		createGeneratorFromFile('simpleTest', g);
		
		let generated = g['simpleTest'].generate("_");
		
		return (generated === "aStrbStr");
	});
	
	
	gen.addTest("Generate complex GenGraph 1", function () {
		let g = {};
		createGeneratorFromFile('complexTest', g);
		
		let generated = g['complexTest'].generate("_");
		
		return "cow";
	});
	
	gen.addTest("Generate complex GenGraph. 3", function () {
		let g = {};
		createGeneratorFromFile('complexTest', g);
		
		let generated = g['complexTest'].generate("Bob");
		
		return (generated === "chickenaStrbStr");
	});
	
	gen.addTest("Generate complex GenGraph 2.", function () {
		let g = {};
		createGeneratorFromFile('complexTest', g);
		
		let generated = g['complexTest'].generate(NOESCAPE);
		
		return (generated === "aStrbStr");
	});
	
	gen.addTest("Generate chicken GenGraph 3.", function () {
	
		let g = {};
		createGeneratorFromFile('chickenTest', g);
		
		let generated = g['chickenTest'].generate("Bob");
		
		return (generated === "chickenaStrbStr");
	});
	
	gen.addTest("setTest.gen", function () {
		let g = {};
		createGeneratorFromFile('setTest', g);
		let c = g['setTest'].generate("Bob");
		return c = "c";
	});
	
	gen.addTest("listTest.gen", function () {
		let g = {};
		createGeneratorFromFile('listTest', g);
		let generated = g['listTest'].generate("_");
		return generated === "aStrbStrcStr";
	});

	//gen.run();
	gen.urun();
}