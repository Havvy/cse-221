LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');
Exec('../code/obj/HashTest.js');

let (hash = new TestSet(['obj/HashTest.js'])) {
	hash.addTest("add a hash function", function () {
		var h = new HashTest([1, 2, 3]);
		
		var constFn = function () { return 0; }
		
		h.addFn("const 0", constFn);
		
		return h.fns.equals([constFn]);
	});
	
	hash.addTest("hashed array has proper length", function () {
		var h = new HashTest([1, 2, 3]);
		
		return h.hashed.length === 3;
	});
	
	hash.addTest("simple guaranteed to work hash", function () {
		var h = new HashTest([1, 2, 3]);
		
		h.addFn("location", function (val) {
			return (val - 1);
		});
		
		h.run();
		
		return true;
	});
	
	hash.addTest("const 1 with 3 values", function () {
		var h = new HashTest([1, 2, 3]);
		
		h.addFn("const 1", function (val) {
			return 1;
		});
		
		h.run();
		
		return true;
	});
	
	hash.addTest("const 3 with 3 values", function () {
		var h = new HashTest([1, 2, 3]);
		
		h.addFn("const 3", function (val) {
			return 3;
		});
		
		h.run();
		
		println("FAILED: " + h.fail.toFullString());
		
		return true;
	});
	
	//hash.run();
	hash.urun();
}