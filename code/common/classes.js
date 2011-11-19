/**
* inherit() returns a newly created objet that inherits properties from the
* prototype object p.
*
* @author David Flanagan
* @source Javascript, the Definitive Guide 6th Edition
* @modified Does not use Object.create() due to JS version.
*/
function inherit(p) {
	// PRECONDITIONS
	if (p === null) throw TypeError();	
	var t = typeof p;
	if (t !== "object" && t !== "function") throw TypeError;
	
	// Return empty object with prototype of p.
	function f() {};
	f.prototype = p;
	return new f();
}

function extend(o) {
	for (let i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (let prop in source) {
			o[prop] = source[prop];
		}
	}
	
	return o;
}
	
/**
* A simple function for defining simple classes.
*
* @author David Flanagan
* @source Javascript, the Definitive Guide 6th Edition
*/
function defineclass(constructor, methods, statics) {
	if (methods) extend(constuctor.prototype, methods);
	if (statics) extend(constuctor, statics);
	return constructor;
}

function defineSubclas(superclass, constuctor, methods, statics) {
	constuctor.prototype = inherit(superclass.prototype);
	constructor.prototype.constructor = constructor;
	
	if (methods) {
		extend(constructor.prototype, methods);
	}
	
	if (statics) {
		extend(constuctor, statics);
	}
	
	return constructor;
}