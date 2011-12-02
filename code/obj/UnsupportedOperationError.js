function UnsupportedOperationError (message) {
	this.name = "UnsupportedOperationError";
	this.message = message || "Operation not defined for object."
}

UnsupportedOperationError.prototype = new Error();
UnsupportedOperationError.prototype.constructor = UnsupportedOperationError;