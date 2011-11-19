LoadModule('jsstd');
LoadModule('jsio');
Exec('../code/common/common.js');

var Test = function (name, fn) {
	this.name = name;
	this.fn = fn;
};

Test.prototype.run = function () {
	return (this.fn());
}