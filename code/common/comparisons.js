var comparisons = {
	equals : function (value) {
		return function (val) {
			return val === value;
		}
	},
	
	greater : function (value) {
		return function (val) {
			return val > value;
		}
	},
	
	lesser : function (value) {
		return function (val) {
			return val < value;
		}
	},
	
	not : function (value) {
		return function (val) {
			return !val;
		}
	}
	
}

extend(comparisons, {
	notEquals : function (value) {
			return this.not(this.equals(value));
	}
});