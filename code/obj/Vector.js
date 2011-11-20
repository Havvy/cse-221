LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Vector = function (arr) {
	this.data = []
	this.ref = {};
	this.top = undefined;
	this.bottom = undefined;
	
	if (arguments.length == 1) {
		// Array passed in.
		this.bottom = 0;
		this.top = arr.length - 1;
		this.data = arr;
		for (let ix = 0; ix < arr.length; ix++) {
			this.ref[ix] = ix;
		}
	}
};

extend(Vector.prototype, {
	addInitial : function (input) {
		this.data = []; //Cleans up the array.
		this.data[0] = input;
		this.ref[0] = this.top = this.bottom = 0;
	},
	
	isEmpty : function () {
		return (this.top === undefined ? true : false);
	},
	
	size : function () {
		if (this.isEmpty()) {
			return 0;
		} else {
			return (this.top - this.bottom + 1);
		}
	},
	
	append : function (input) {
		if (!this.isEmpty()) {
			this.ref[++this.top] = this.data.length;
			data[this.data.length] = input; // Increases length of data by one.
		} else {
			this.addInitial(input);
		}
		
		return this;
	},
	
	prepend : function (input) {
		if (!this.isEmpty()) {
			this.ref[--this.bottom] = this.data.length;
			this.data[this.data.length] = input; // Increases length of data by one.
		} else {
			this.addInitial(input);
		}
		
		return this;
	},
	
	peek : function (maybeBottom) {
		if (!this.isEmpty()) {
			if (maybeBottom) {
				return this.data[this.ref[this.bottom]];
			} else {
				// Default to peeking at the top.
				return this.data[this.ref[this.top]];
			}
		} else {
			throw new EmptyCollectionError;
		}
	},
	
	at : function (index) {
		if ((this.top === undefined) || (index > (this.top - this.bottom)) || (this.index < 0)) {
			throw new RangeError("Index out of bounds");
		} else {
			return this.data[this.ref[this.bottom + index]];
		}
	},
	
	pop : function (maybeBottom) {
		if (maybeBottom) {
			this.data[this.ref[this.bottom]] = undefined;
			delete this.ref[this.bottom++];
		} else {
			this.data[this.ref[this.top]] = undefined;
			delete this.ref[this.top--];
		}
		
		if (this.bottom > this.top) {
			//Shell is empty.
			this.bottom = this.top = undefined;
		}
	},
	
	insertAt : function (position, value) {
		if (!this.isEmpty()) {
			if ((position >= 0) && (position < this.size())) {
				// Position is within bounds of currently defined collection.
				
				this.data[this.data.length] = value;
				
				//Shove right.
				for (let i = this.top++; i >= position; i--) {
					this.ref[i + 1] = this.ref[i];
				}
				
				this.ref[position] = this.data.length - 1;  // -1 because we already added value to data.
				
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
				this.addInitial(value);
			} else {
				throw new RangeError("Index out of bounds");
			}
		}
		
		return this;
	},
	
	peekUnder : function () {
		return (this.peek(true));
	},
	
	peekOver : function () {
		return (this.peek(false));
	},
	
	toString : function () {
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
});