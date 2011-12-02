function EmptyCollectionError (message) {
	this.name = "EmptyCollectionError";
	this.message = message || "Operation cannot be performed on empty collection."
}

EmptyCollectionError.prototype = new Error();
EmptyCollectionError.prototype.constructor = EmptyCollectionError;