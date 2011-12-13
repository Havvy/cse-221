LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let(vector = new TestSet(['obj/Vector.js'])) {
	vector.addTest("append to initial vector", function () {
		var v = new Vector();
		
		v.append("string");
		
		return (v.toString() === "[string]");
	});
	
	vector.addTest("show empty vector", function () {
		var v = new Vector();
		
		return (v.toString() === "[]");
	});
	
	vector.addTest("prepend to initial vector", function () {
		var v = new Vector();
		
		v.prepend("string");
		
		return (v.toString() === "[string]");
	});
	
	vector.addTest("insert at 0th position in intial vector", function () {
		var v = new Vector();
		
		v.insertAt(0, "string");
		
		return (v.toString() === "[string]");
	});
	
	vector.addTest("insert zero into a vector", function () {
		var v = new Vector();
		
		v.append(0);
		
		return (v.toString() === "[0]");
	});
	
	vector.addTest("insert one into a vector", function () {
		var v = new Vector();
		
		v.append(1);
		
		return (v.toString() === "[1]");
	});
	
	vector.addTest("peek at a vector with one element from both sides", function () {
		var v = new Vector(), o = {};
		
		v.append(o);
		
		return ((v.peekOver() === o) && (v.peekUnder() === o));
	});
	
	vector.addTest("initialize a vector with an array", function () {
		var a = [1, 2, 3];
		var v = new Vector(a);
		
		return (v.toString() === "[1, 2, 3]");
	});
	
	//vector.run()
	vector.run();
}