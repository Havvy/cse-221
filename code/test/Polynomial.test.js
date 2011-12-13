LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');
Exec('../code/obj/Polynomial.js');

/*
 * Sample Construction of the Polynomial (3x^2 + 4x - 6x^4 - 4) + (5x^5 + 5 + 6x^4 - 2x)
 * Currently (correctly) displays:
 *
 * - 6x^4 + 3x^2 + 4x^1 - 4x^0
 * + 5x^5 + 6x^4 - 2x^1 + 5x^0
 * + 5x^5 + 3x^2 + 2x^0 + 1x^0  
 * - 5x^5 - 12x^4 + 3x^2 + 6x^1 - 9x^0
 */

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