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
    }
    
    poly.constructor = Polynomial;
    return poly;
};

// Polynomial Functions

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


var poly1 = Polynomial();
poly1.addTerm(4, 2);
poly1.addTerm(2, 1);
poly1.addTerm(4);
poly1.subtractTerm(5);
println("poly1 = " + poly1.toString());
var poly2 = Polynomial();
poly2.addTerm(5, 4);
poly2.addTerm(4, 4);
poly2.subtractTerm(7, 1);
poly2.subtractTerm(5, 5);
println("poly2 = " + poly2.toString());
var result = addPoly(poly1, poly2);
println("poly1 + poly2 = " + result.toString());
var result2 = subtractPoly(poly1, poly2);
println("poly1 - poly2 = " + result2.toString());
var multResult = multiplyPoly(poly1, poly2);
println("poly1 * poly2 = " + multResult.toString());