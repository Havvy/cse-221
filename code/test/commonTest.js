LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/obj/TestSet.js');

let (common = new TestSet(['common/common.js'])) {
	common.addTest("Array.prototype.insert()", function () {
		var a = [0, 1, 2, 3];
		a.insert(1, 4);
		
		return (a[1] === 4 && a[2] === 1 && a[4] === 3);
	});
	
	common.addTest("Array.prototype.rest", function () {
		var a = [0, 1, 2];
		a = a.rest();
		return (a[0] === 1 && a[1] === 2 && a[2] === undefined && a.length === 2);
	});
	
	common.addTest("isFileType('location.js', '.js')", function () {
		return isFileType('location.js', '.js');
	});
	
	common.addTest("Two equal arrays are equal", function () {
		var a1 = [1, 3, 5], a2 = [1, 3, 5];
		
		return (a1.equals(a2) && a2.equals(a1));
	});
	
	common.addTest("Two equal arrays are equal", function () {
		var array = [1, 2, 3];
		
		return (array.equals([1, 2, 3]));
	});
	
	common.addTest("Two unequal arrays are unequal", function () {
		var a1 = [2, 4, 6], a2 = [1, 3, 5];
		
		return !(a1.equals(a2) || a2.equals(a1));
	});
	
	common.addTest("Two unequal length arrays are unequal", function () {
		var a1 = [1, 1, 1], a2 = [1, 1];
		
		return !(a1.equals(a2) || a2.equals(a1));
	});
	
	common.addTest("remove duplicates from array", function () {
		var array = [1, 1, 1, 2, 3];
		
		var pure = array.removeDuplicates();
		
		return (pure.equals([1, 2, 3]));
	});
	
	common.addTest("array tostring", function () {
		var array = ["a", "b"];
		
		return array.toString() === '[a, b]';
	});
	
	common.addTest("array tostring around data", function () {
		var array = ["a", "b"];
		var string = "test" + array + "test";
		
		return string === "test[a, b]test";
	});
	
	common.addTest("object toFullString", function () {
		var o = {a : 1};
		
		return (o.toFullString() === "{:a 1}");
	});
	
	common.addTest("object isElementOf positive", function () {
		var o = {};
		var array = [o];
		
		return (o.isElementOf(array));
	});
	
	common.addTest("object isElementOf negative", function () {
		var o = {};
		var array = [];
		
		return !(o.isElementOf(array));
	});
	
	common.addTest("append an object to an empty array", function () {
		var o = {a : 1};
		var array = [];
		
		array.append(o);
		
		return ("" + array === "[[object Object]]");
	});
	
	common.addTest("copy an empty array and append an object", function () {
		var o = {a : 1};
		var array = [];
		
		var copy = array.copy();
		
		copy.append(o);
		
		return ("" + copy === "[[object Object]]");
	});
	
	common.addTest("comparisons.notEqual()", function () {
		var ne5 = comparisons.notEquals(5);
		
		return ne5(0);
	});
	
	common.addTest("array removeElement", function () {
		var array = [1, 2, 3];
		
		array.removeElement(1);
		
		return (array.equals([2, 3]));
	});
	
	common.addTest("swap for objects", function () {
		var o = {a : 1, b : 2};
		
		o.swap("a", "b");
		
		return (o.a === 2 && o.b === 1);
	});
	
	common.addTest("swap for arrays", function () {
		var array = [1, 2];
		
		array.swap(0, 1);
		
		return array.equals([2, 1]);
	});
	
	common.addTest("array isEmpty", function () {
		var arr0 = [], arr1 = [0];
		
		return (arr0.isEmpty() && !arr1.isEmpty());
	});
	
	common.addTest("array pop", function () {
		var arr = [1, 2, 3];
		
		var three = arr.pop();
		
		return (arr.equals([1, 2]) && three === 3);
	});
	
	//common.urun();
	common.run();
}