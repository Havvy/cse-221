LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Transformation = function (input, output, def) {
	
	// PRECONDITIONS
	
	if (!(input.length === output.length)) {
		throw new TypeError("Input and output of Transformer must be of same length.\n Input/Output: " + input.length + "/" + output.length);
	}
	
	if (!isInAt("__default__", output)) {
		throw new Error("__default__ found in input");
	}
	
	for (let ix = 0; ix < input.length; ix++) {
		this[input[ix]] = output[ix];
	}
	
	this["__default__"] = def;
};

Transformation.prototype.transform = function (input) {
	return (this[input] || this["__default__"]);
};