extend(String.prototype, {
	
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
	
	// Booleans
	
	isEmpty : function () {
		return (this.length === 0);
	},

	// Removing chance of executing "parseInt("066")"
	toInt : function () {
		return parseInt(this, 10);
	},

	toFloat : function () {
		return parseFloat(this);
	},

	// Mutators
	/**
	* 
	* @author Shi Chuan
	* @source http://www.blog.highub.com/javascript/javascript-core/remove-the-last-character-of-a-string/
	* @argument String string
	* @return String with last character cut off.
	*
	* @example
	* 	var str = "12345"
	*   str = dropLastChar(str) // str === "1234"
	*
	*/
	dropLastChar : function () {
		return this.substring(0, this.length-1);
	},
	
	dropFirstChar : function () {
		return this.substring(1, this.length);
	},
	
	// Other...
	splitMultiple : function () {
		if (arguments.length !== 0) {
			let args = [];
			let temp = this;
			
			// Coerce arguments into an array.
			for (let ix = 0; ix < arguments.length; ix++) {
				args.push(arguments[ix]);
			}
			
			temp = temp.split(args.first());
			for (let ix = 0; ix < temp.length; ix++) {
				temp[ix] = String.prototype.splitMultiple.apply(temp[ix], args.rest());
			}
			return temp;
		} else {
			return this.toString(); //for some reason, toString() is required here.
		}
	}
});