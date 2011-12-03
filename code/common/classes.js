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

/**
 * Extend an object with another.
 * @mutates First parameter {@param o}
 * @param o Object to be extended. Use a prototype to extend a set of objects.
 * @param rest... Objects to extend with.
 * @return Extended object.
 */
function extend(o) {
	for (let i = 1; i < arguments.length; i++) {
		let source = arguments[i];
		for (let prop in source) {
			Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
		}
	}
	
	return o;
}