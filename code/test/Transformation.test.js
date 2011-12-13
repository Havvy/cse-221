LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let (trans = new TestSet(['/obj/Transformation.js'])) {
	
	trans.addTest("Morse length converter", function () {
		var i = [".", "-", " "];
		var o = [2, 4, 2];
		var d = 0;
		var t = new Transformation(i, o, d);
		
		if (t.transform(".") !== 2) {
			println("It's the .");
			return false;
		}
		
		if (t.transform("-") !== 4) {
			println("It's the -");
			return false;
		}
		
		if (t.transform(" ") !== 2) {
			println("It's the space");
			return false;
		}
		
		if (t.transform("p") !== 0) {
			println("It's the bogus data.");
			return false;
		}
		
		return true;
	});
	
	trans.run();
}