LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Sorted = function (vec, comparison) {
	// Private methods.
	
	function mergeSort (refl, refr, comparison, data) {
		var temp, i = 0, j = 0, list = [];
	
		// Get ready for merging.
		switch (refl.length) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				if (!comparison(data[refl[0]], data[refl[1]])) {
					temp = refl[0];
					refl[0] = refl[1];
					refl[1] = temp;
				}
				break;
			default:
				var nextRefl = refl.slice(0, Math.floor(refl.length / 2));
				var nextRefr = refl.slice(Math.floor(refl.length / 2));
				refl = mergeSort(refl.slice(0, (refl.length / 2)), refl.slice(refl.length / 2), comparison, data); 
				break;
		}
		
		switch (refr.length) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				if (!comparison(data[refr[0]], data[refr[1]])) {
					temp = refr[0];
					refr[0] = refr[1];
					refr[1] = temp;
				}
				break;
			default:
				refr = mergeSort(refr.slice(0, refr.length / 2), refr.slice(refr.length / 2), comparison, data); 
				break;
		}
		
		// Merge.
		
		while (refl.length > 0 && refr.length > 0) {
			
			if (comparison(data[refl[0]], data[refr[0]])) {
				list[list.length] = refl[0]
				refl = refl.rest();
			} else {
				list[list.length] = refr[0];
				refr = refr.rest();
			}
		}
		
		while (refl.length > 0 || refr.length > 0) {
			if (refl.length > 0) {
				list[list.length] = refl[0];
				refl = refl.rest();
			} else {
				list[list.length] = refr[0];
				refr = refr.rest();
			}
		}
		return list;
	}

	// Precondition testing
	
	if (! vec instanceof Vector) {
		throw new TypeError("Only vectors can be sorted.");
	}
	
	if (typeof comparison !== "function") {
		throw new TypeError("Comparison must be a function.");
	}
	
	// Copy data from the vector.
	
	var data = new Array(vec.size());
	var ref = new Array(vec.size());
	
	for (let i = 0; i < data.length; i++) {
		data[i] = vec.at(i);
	}
	
	for (let i = 0; i < data.length; i++) {
		ref[i] = i;
	};
	
	ref = mergeSort(ref, [], comparison, data);
	
	this.isEmpty = function () {
		return (data.length === 0);
	}
	
	this.at = function (index) {
		if ((index < 0) || (index > data.length)) {
			throw new RangeError("Index out of bounds");
		} else {
			return data[ref[index]];
		}
	}
	
	this.size = function () {
		return data.length;
	}
	
	this.toString = function () {
		var ret = "[";
		
		if (!this.isEmpty()) {
			for (let i = 0; i < data.length; i++) {
				ret += this.at(i) + ", ";
			}
			ret = ret.slice(0, -2) + "]";
		} else {
			ret += "]";
		}
		return ret;
	}
};