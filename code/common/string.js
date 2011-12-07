extend(String.prototype, {

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
		//printline();
		Exec('../code/common/console.js');
		//printval("arglen", arguments.length);
		if (arguments.length !== 0) {
			let args = [];
			let temp = this;
			
			//printval("args", args);
			//printval("temp", temp);
			//printval("type of temp", typeof temp);
			//printval("temp", temp, true);
			//printval("arguements", arguments, true);
			
			// Coerce arguments into an array.
			for (let ix = 0; ix < arguments.length; ix++) {
				args.push(arguments[ix]);
			}
			
			//printval('args', args);
			//printval('this', temp);
			
			temp = temp.split(args.first());
			for (let ix = 0; ix < temp.length; ix++) {
				temp[ix] = String.prototype.splitMultiple.apply(temp[ix], args.rest());
			}
			
			//printval("temp", temp);
			return temp;
		} else {
			return this.toString(); //for some reason, toString() is required here.
		}
	}
});