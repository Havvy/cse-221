LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Vector = function (arr) {
	
	// INITIALIZER
	var that = this;
	var top, bottom, data = [], ref = {};
	
	if (arguments.length == 1) {
		// Array passed in.
		bottom = 0;
		top = arr.length - 1;
		data = arr;
		for (let ix = 0; ix < arr.length; ix++) {
			ref[ix] = ix;
		}
	}
	// END INITIALIZER
	
	function addInitial (input) {
		data = new Array(); //Cleans up the array.
		data[0] = input;
		ref[0] = top = bottom = 0;
	}
	
	this.debug = function (param) {
		switch (param) {
			case "top":
				return top;
			case "bottom":
				return bottom;
			case "data":
				return data;
			case "ref":
				return ref.toFullString();
			default:
				return noEscape;
		}
	}
	
	this.isEmpty = function () {
		return (top === undefined ? true : false);
	}
	
	this.size = function () {
		if (this.isEmpty()) {
			return 0;
		} else {
			return (top - bottom + 1);
		}
	}
	
	this.append = function (input) {
		if (!this.isEmpty()) {
			ref[++top] = data.length;
			data[data.length] = input; // Increases length of data by one.
		} else {
			addInitial(input);
		}
		
		return this;
	}
	
	this.prepend = function (input) {
		if (!this.isEmpty()) {
			ref[--bottom] = data.length;
			data[data.length] = input; // Increases length of data by one.
		} else {
			addInitial(input);
		}
		
		return this;
	}
	
	this.peek = function (maybeBottom) {
		if (!this.isEmpty()) {
			if (maybeBottom) {
				return data[ref[bottom]];
			} else {
				// Default to peeking at the top.
				return data[ref[top]];
			}
		} else {
			throw new EmptyCollectionError;
		}
	}
	
	this.at = function (index) {
		if ((top === undefined) || (index > (top - bottom)) || (index < 0)) {
			throw new RangeError("Index out of bounds");
		} else {
			return data[ref[bottom + index]];
		}
	}
	
	this.pop = function (maybeBottom) {
		if (maybeBottom) {
			data[ref[bottom]] = undefined;
			delete ref[bottom++];
		} else {
			data[ref[top]] = undefined;
			delete ref[top--];
		}
		
		if (bottom > top) {
			//Shell is empty.
			bottom = top = undefined;
		}
	}
	
	this.insertAt = function (position, value) {
		if (!this.isEmpty()) {
			if ((position >= 0) && (position < this.size())) {
				// Position is within bounds of currently defined collection.
				
				data[data.length] = value;
				
				//Shove right.
				for (let i = top++; i >= position; i--) {
					ref[i + 1] = ref[i];
				}
				
				ref[position] = data.length - 1;  // -1 because we already added value to data.
				
			} else if (position === this.size()) {
				//Position is the end of the collection. Just append.
				this.append(value);
			} else {
				//Position is not in the bounds of the object.
				throw new RangeError("Index out of bounds");
			}
		} else {
			//Collection is current empty.
			if (position === 0) {
				//Only allowed position is 0, which is the initial value.
				addInitial(value);
			} else {
				throw new RangeError("Index out of bounds");
			}
		}
		
		return this;
	}
};

Vector.prototype.peekUnder = function () {
	return (this.peek(true));
};

Vector.prototype.peekOver = function () {
	return (this.peek(false));
};

Vector.prototype.toString = function () {
	var ret = "[";
	
	if (!this.isEmpty()) {
		for (let i = 0; i < this.size(); i++) {
			ret += this.at(i) + ", ";
		}
		ret = ret.slice(0, -2) + "]";
	} else {
		ret += "]";
	}
	return ret;
}