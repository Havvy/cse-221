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
		Math.seedrandom("test");
		let g = Generator.create(Math.random, function() {
			return this();
		});
		let generated = [g.generate("test"), g.generate("test")];
		println(generated);
		return generated[0] === generated[1];
	});

	//gen.run();
	gen.urun();
}