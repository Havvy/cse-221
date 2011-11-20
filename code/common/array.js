extend(Array.prototype, {
	
	// ACCESSORS
	
	first : function () {
		return this[0];
	},
	
	second : function () {
		return this[1];
	},
	
	last : function () {
		return this[this.length - 1];
	},
	
	penultimate : function () {
		return this[this.length - 2];
	},
	
	// BOOLEANS
	
	/**
	*
	* someArray.contains(value);
	*
	*/
	contains : function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;
	},
	
	equals : function (compared) {
		if (this.length !== compared.length) return false;
			 
			 for (let i = 0; i < this.length; i++) {
				 if (this[i] !== compared[i]) return false;
			 }
			 
			 return true;
	},
	
	isEmpty : function () {
		return (this.length === 0);
	},
	
	// MUTATORS
	
	append : function (value) {
		this[this.length] = value;
		return this;
	},
	
	push : function (value) {
		this.append(value);
	},

	
	insert : function (loc, val) {
		for (let i = this.length; i > loc; i--) {
			this[i] = this[i - 1];
		}
		this[loc] = val;
		return this;
	},
	
	pop : function (value) {
		let (ret = this.last()) {
			delete this[this.length-- - 1];
			return ret;
		}
	},
	
	removeElement : function (element) {
		for (let ix = 0; ix < this.length; ix++) {
			if (this[ix] === element) {
				this.splice(ix, 1);
			}
		}
		return this;
	},
	
	// CLONING
	
	copy : function () {
		var copy = [];
		
		for (let i = 0; i < this.length; i++) {
			copy[i] = this[i];
		}
		
		return copy;
	},
	
	removeDuplicates : function () {
		var set = [], o = {};
		
		for (let i = 0; i < this.length; i++) {
			o[this[i]] = 1;
		}
		
		for (key in o) {
			if (o.hasOwnProperty(key)) {
				set.append(key);
			}
		}
		
		return set;
	},
	
	rest : function () {
		return this.slice(1);
	},
	
	// STRING
	
	toString : function () {
		var str = "[";
		
		if (this.length !== 0) {
			for (let i = 0; i < this.length; i++) {
				if (this[i]) {
					str += this[i] + ", ";
				} else {
					str += "nil" + ", ";
				}
			}
			str = str.slice(0, -2);
			str += "]";
			return str;
		} else {
			return "[]";
		}
	}
});