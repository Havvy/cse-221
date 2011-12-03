LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let(gen = new TestSet(['obj/Generator.js'])) {

	gen.addTest("Initialize a generator, and generate it.", function () {
		let o = {data : "success"};		
		let g = Generator.create(o, function () {
			return this.data;
		});		
		let generated = g.generate();
		
		return (generated === "success");
	});
	
	gen.addTest("Generate different results on a recall.", function () {
		Math.seedrandom("test");
		let g = Generator.create(Math.random, function() {
			return this();
		});
		let generated = [g.generate(), g.generate()];		
		Math.seedrandom("test");
		return generated.equals([Math.random(), Math.random()]);
	});

	//gen.run();
	gen.urun();
}