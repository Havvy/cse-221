LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Polynomial = function () {
	// At each exponential index is the coefficient for this exponent. 
	// 0 or undefined imply the coefficient is 0.
	var poly = [0];
	poly.lowExpo = Infinity;
	poly.addTerm =  function(coefficient, exponent) {
		if (exponent === undefined) {
			exponent = 0;   
		}
		if (this[exponent]) {
			this[exponent] += coefficient + this[exponent];
		} else {
			this[exponent] = coefficient;
		}
		if (exponent < this.lowExpo) {
			this.lowExpo = exponent; 
		}
	};
	
	
	poly.subtractTerm = function(coefficient, exponent) {
		if (exponent === undefined) {
			exponent = 0
		}
		if (this[exponent]) {
			this[exponent] += this[exponent] - coefficient;
		} else {
			this[exponent] = -coefficient;
		}
		if (exponent < this.lowExpo) 
		{this.lowExpo = exponent;}
	};
	
	poly.multiplyTerm = function(coefficient, exponent) {
	};
	
	poly.toString = function () {
		var string = "";
		for (let i = poly.length; i >= poly.lowExpo; i--) {
			if (!poly[i]) {
				continue;
			}
			
			if (poly[i] < 0) {
				string += " - " + -(poly[i]) + "x^" + i;
			} else if (poly[i] > 0){
				string += " + " + poly[i] + "x^" + i;       
			} 
		} 
		return string;  
	}
	
	poly.constructor = Polynomial;
	return poly;
};

// ------------------------ NEW STUFF - UNDER CONSTRUCTION -------------------------------

var addPoly = function (poly1, poly2) {
	var firstIndex = 0;
	if (poly1.lowExpo > poly2.lowExpo) {
		firstIndex = poly2.lowExpo;
	} else {
		firstIndex = poly1.lowExpo;
	}
	var lastIndex = 0;
	if (poly1.length > poly2.length) {
		lastIndex = poly1.length;
	} else {
		lastIndex = poly2.length;
	}
	var result = Polynomial();
	result.lowExpo = firstIndex;
	for (let i = firstIndex; i <= lastIndex; i++){
		if (poly1[i] && poly2[i]){
			result[i] = poly1[i] + poly2[i];
		} else if (!poly1[i] && !poly2[i]) {
		} else if (!poly1[i]) {
			result[i] = poly2[i];
		} else if (!poly2[i]) {
			result[i] = poly1[i];
		} else {}
	}
	return result;
}

var subtractPoly = function (poly1, poly2) {
	var firstIndex = 0;
	if (poly1.lowExpo > poly2.lowExpo) {
		firstIndex = poly2.lowExpo;
	} else {
		firstIndex = poly1.lowExpo;
	}
	var lastIndex = 0;
	if (poly1.length > poly2.length) {
		lastIndex = poly1.length;
	} else {
		lastIndex = poly2.length;
	}
	var result = Polynomial();
	result.lowExpo = firstIndex;
	for (let i = firstIndex; i <= lastIndex; i++){
		if (poly1[i] && poly2[i]){
			result[i] = poly1[i] - poly2[i];
		} else if (!poly1[i] && !poly2[i]){
		} else if (!poly1[i]) {
			result[i] = -(poly2[i]);
		} else if (!poly2[i]) {
			result[i] = poly1[i];
		}
	}
	return result;
}