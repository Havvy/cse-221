LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Vector.js');

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
			this[exponent] += coefficient;
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
	};
	
	poly.addPoly = function (poly2) {
		var firstIndex = 0;
		if (this.lowExpo > poly2.lowExpo) {
			firstIndex = poly2.lowExpo;
		} else {
			firstIndex = this.lowExpo;
		}
		var lastIndex = 0;
		if (this.length > poly2.length) {
			lastIndex = this.length;
		} else {
			lastIndex = poly2.length;
		}
		var result = Polynomial();
		result.lowExpo = firstIndex;
		for (let i = firstIndex; i <= lastIndex; i++){
			if (this[i] && poly2[i]){
				result[i] = this[i] + poly2[i];
			} else if (!this[i] && !poly2[i]) {
			} else if (!this[i]) {
				result[i] = poly2[i];
			} else if (!poly2[i]) {
				result[i] = this[i];
			} else {}
		}
		return result;
	}
	
	poly.constructor = Polynomial;
	return poly;
};

// Polynomial Functions

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

var multiplyPoly = function (poly1, poly2){
	var firstIndex = (poly1.lowExpo * poly2.lowExpo);
	var lastIndex = (poly1.length * poly2.length);
	var result = Polynomial();
	result.lowExpo = firstIndex;
	for (let i = poly1.length-1; i >= poly1.lowExpo; i--){
		for (let j = poly2.length-1; j >= poly2.lowExpo; j--){
			if (!poly1[i] || !poly2[j]){}
			else if (result[i + j]){
				//println (poly1[i] + "x^" + i + " * " + poly2[j] + "x^" + j + " = " + poly1[i] * poly2[j] + "x^" + (i + j));
				result[i + j] += poly1[i] * poly2[j];
			} else {
				//println (poly1[i] + "x^" + i + " * " + poly2[j] + "x^" + j + " = " + poly1[i] * poly2[j] + "x^" + (i + j));
				result[i + j] = poly1[i] * poly2[j];
			}
		}	
	}
	return result;
};