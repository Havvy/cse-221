var Polynomial = function () {
	// At each exponential index is the coefficient for this exponent. 
	// 0 or undefined imply the coefficient is 0.
	var poly = [0];
	poly.addTerm =  function(coefficient, exponent) {
		if (this[exponent]) {
			this[exponent] += coefficient + this[exponent];
		} else {
			this[exponent] = coefficient;
		}
	}
	poly.subtractTerm = function(coefficient, exponent) {
		if (this[exponent]) {
			this[exponent] += this[exponent] - coefficient;
		} else {
			this[exponent] = -coefficient;
		}
	}
	return poly;
};

/*
 S ample Construction* of the Polynomial 3x^2+4x
 */

var poly1 = Polynomial();
poly1.addTerm(3, 2);
poly1.addTerm(4, 1);