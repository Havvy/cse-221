LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let (sorted = new TestSet(['/obj/Sorted.js', '/obj/Vector.js'])) {

	sorted.addTest("sort an empty collection", function () {
		var v = new Vector();
		var s = new Sorted(v, function (_) { });
		
		return (s.toString() === "[]");
	});
	
	sorted.addTest("sorting two sorted numbers", function() {
		var v = new Vector();
		v.append("1");
		v.append("2");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[1, 2]");
	});
	
	sorted.addTest("sorting two unsorted numbers", function() {
		var v = new Vector();
		v.append("2");
		v.append("1");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[1, 2]");
	});
	
	sorted.addTest("sort two sorted strings", function() {
		var v = new Vector();
		v.append("a");
		v.append("b");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[a, b]");
	});
	
	sorted.addTest("sort two unsorted strings", function() {
		var v = new Vector();
		v.append("b");
		v.append("a");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[a, b]");
	});
	
	sorted.addTest("sort identical entries", function() {
		var v = new Vector();
		v.append("2");
		v.append("2");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[2, 2]");
	});
	
	sorted.addTest("sort two similar strings", function() {
		var v = new Vector();
		v.append("alex");
		v.append("anthony");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[alex, anthony]");
	});
	
	sorted.addTest("sort two similar strings", function() {
		var v = new Vector();
		v.append("arthur");
		v.append("anthony");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[anthony, arthur]");
	});
	
	sorted.addTest("sort four strings", function() {
		var v = new Vector();
		v.append("yo").append("mamma").append("so").append("fat");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[fat, mamma, so, yo]");
	});
	
	sorted.addTest("sort [221, 246, 2000, 246] numerically", function() {
		var v = new Vector();
		v.append(221);
		v.append(246);
		v.append(2000);
		v.append(246);
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[221, 246, 246, 2000]");
	});
		
	sorted.addTest("sort [221, 246, 3000, 246] alphabetically", function() {
		var v = new Vector();
		v.append("221");
		v.append("246");
		v.append("3000");
		v.append("246");
		var s = new Sorted(v, function(e1, e2) {
			return (e1 < e2);
		});
		
		return (s.toString() === "[221, 246, 246, 3000]");
	});
	
	sorted.addTest("sorting arrays by length", function () {
		var v = new Vector();
		v.append([]).append([1]).append([1, 2, 3, 4]).append([1, 2, 3]).append([1, 2]);
		
		var s = new Sorted(v, function (a1, a2) {
			return (a1.length < a2.length);
		});
		
		return (s.toString() === "[[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4]]")
	});
	
	sorted.addTest("sorting 3 elements", function () {
		var v = new Vector().append(1).append(2).append(3);
		
		var s = new Sorted(v, function (e1, e2) {
			return (e1 > e2);
		});
		
		return (s.toString() === "[3, 2, 1]")
	});
	
	sorted.addTest("sorting 5 elements", function () {
		var v = new Vector().append(5).append(4).append(3).append(2).append(1);
		
		var s = new Sorted(v, function (e1, e2) {
			return (e1 < e2);
		});
	
		return (s.toString() === "[1, 2, 3, 4, 5]");
	});
	
	sorted.urun()
	
}