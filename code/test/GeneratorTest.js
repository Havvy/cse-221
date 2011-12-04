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
		
		return (generated === "End");
	});

	//gen.run();
	gen.urun();
}