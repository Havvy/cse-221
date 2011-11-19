String.prototype.isEmpty = function () {
	return (this.length === 0);
};

// Removing change of executing "parseInt("066")"
String.prototype.toInt = function () {
	return parseInt(this, 10);
};

String.prototype.toFloat = function () {
	return parseFloat(this);
};

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
String.prototype.dropLastChar = function () {
	return this.substring(0, this.length-1);
};