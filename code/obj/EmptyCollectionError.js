function EmptyCollectionError (message) {
	this.name = "EmptyCollectionError";
	this.message = message || "Operation not defined on empty collection."
}

EmptyCollectionError.prototype = new Error();
EmptyCollectionError.prototype.constructor = EmptyCollectionError;