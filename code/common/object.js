extend(Object.prototype, {
	
	// BOOLEANS
	
	isElementOf : function (array) {
		return array.contains(this);
	},
	
	// MUTATORS
	
	swap : function (ix, jx) {
		let (temp = this[ix]) {
			this[ix] = this[jx];
			this[jx] = temp;
		}
		return this;
	},
	
	toFullString : function () {
		var ret = ((this.prototype && this.prototype.constructor) || "") + "{";
		for (let key in this) {
			if ((this.hasOwnProperty(key)) && 
				(key !== "toString") && (key !== "valueOf")) {
				ret += ":" + key + " " + this[key] + " ";
				}
		}
		if (ret[ret.length - 1] === " ") {
			ret = ret.slice(0, -1) + "}";
		} else {
			//Empty object
			ret += "}";
		}
		
		return ret;
	}
	
});